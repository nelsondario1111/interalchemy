import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const RegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  altFirstName: z.string().optional().or(z.literal("")),
  altLastName: z.string().optional().or(z.literal("")),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(6, "Phone number is required"),

  notes: z.string().optional().or(z.literal("")),

  roomOption: z.enum([
    "SINGLE_PRIVATE_1070",
    "DOUBLE_PRIVATE_COUPLES_2080",
    "DOUBLE_SHARED_1040",
    "GROUP_4_6_SHARED_980",
    "GROUP_OTHER",
  ]),

  paymentMethod: z.enum([
    "ETRANSFER_CAD",
    "DIRECT_DEPOSIT_CAD",
    "ETRANSFER_USD",
    "INTERNATIONAL_ACCOUNT",
  ]),

  couponCode: z.string().optional().or(z.literal("")),
  newsletterOptIn: z.boolean(),
  whatsappGroupOptIn: z.boolean(),
  whatsappNumber: z.string().optional().or(z.literal("")),
  referral: z.string().optional().or(z.literal("")),

  // simple bot protection
  website: z.string().max(0).optional().or(z.literal("")), // honeypot must stay empty
});

function formatRoomOption(v: z.infer<typeof RegistrationSchema>["roomOption"]) {
  switch (v) {
    case "SINGLE_PRIVATE_1070":
      return "Single Person — Private Occupancy — $1070 USD";
    case "DOUBLE_PRIVATE_COUPLES_2080":
      return 'Double ("couples") — Private Occupancy — $2080 USD';
    case "DOUBLE_SHARED_1040":
      return 'Double (or "shared room") — $1040 USD (2–3 people, separate beds)';
    case "GROUP_4_6_SHARED_980":
      return 'Group Rate 4–6 people ("shared room") — $980 USD per person';
    case "GROUP_OTHER":
      return "Group Rate (other) — specify in reply email";
  }
}

function formatPaymentMethod(v: z.infer<typeof RegistrationSchema>["paymentMethod"]) {
  switch (v) {
    case "ETRANSFER_CAD":
      return "e-Transfer (CAD) — Canadian bank to Canadian bank";
    case "DIRECT_DEPOSIT_CAD":
      return "Direct deposit — Canadian bank";
    case "ETRANSFER_USD":
      return "e-Transfer in USD";
    case "INTERNATIONAL_ACCOUNT":
      return "Deposit with international account";
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();

    const parsed = RegistrationSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid submission", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot: if filled, silently accept but do nothing
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const TO = process.env.REWILDING_TO_EMAIL;
    const FROM = process.env.REWILDING_FROM_EMAIL;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!TO || !FROM || !RESEND_API_KEY) {
      // Don’t break UX in production if env missing — just log
      console.error("Missing env vars: RESEND_API_KEY, REWILDING_TO_EMAIL, REWILDING_FROM_EMAIL");
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `New Rewilding Registration — ${data.firstName} ${data.lastName}`;

    const hostEmailText = [
      "New registration received:",
      "",
      `Name: ${data.firstName} ${data.lastName}`,
      `Alt name: ${(data.altFirstName || "").trim()} ${(data.altLastName || "").trim()}`.trim(),
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      "",
      `Room option: ${formatRoomOption(data.roomOption)}`,
      `Payment method: ${formatPaymentMethod(data.paymentMethod)}`,
      `Coupon code: ${data.couponCode || "(none)"}`,
      "",
      `Newsletter opt-in: ${data.newsletterOptIn ? "Yes" : "No"}`,
      `WhatsApp group opt-in: ${data.whatsappGroupOptIn ? "Yes" : "No"}`,
      `WhatsApp number: ${data.whatsappNumber || "(same as phone or not provided)"}`,
      "",
      `How they heard: ${data.referral || "(not provided)"}`,
      "",
      `Notes: ${data.notes || "(none)"}`,
    ].join("\n");

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject,
      text: hostEmailText,
    });

    // Confirmation to guest (optional but recommended)
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "We received your registration — Interalchemy Rewilding",
      text: [
        `Hi ${data.firstName},`,
        "",
        "Thank you — we received your registration for Rewilding in the Amazon (Jan 26–31, 2026).",
        "We’ll reply soon with next steps and your invoice/payment details.",
        "",
        "Your selection:",
        `• ${formatRoomOption(data.roomOption)}`,
        `• Payment: ${formatPaymentMethod(data.paymentMethod)}`,
        "",
        "If you need to update anything, reply to this email.",
        "",
        "— Interalchemy Rewilding",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
