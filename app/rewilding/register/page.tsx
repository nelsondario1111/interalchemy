"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const INSTAGRAM_URL = "https://www.instagram.com/interalchemy_rewilding/";
const LINKTREE_URL = "https://linktr.ee/interalchemyrewilding";
const EMAIL = "interalchemyrewilding@gmail.com";

type RoomOption =
  | "SINGLE_PRIVATE_1070"
  | "DOUBLE_PRIVATE_COUPLES_2080"
  | "DOUBLE_SHARED_1040"
  | "GROUP_4_6_SHARED_980"
  | "GROUP_OTHER";

type PaymentMethod =
  | "ETRANSFER_CAD"
  | "DIRECT_DEPOSIT_CAD"
  | "ETRANSFER_USD"
  | "INTERNATIONAL_ACCOUNT";

export default function RewildingRegisterPage() {
  const roomOptions: { value: RoomOption; label: string }[] = useMemo(
    () => [
      { value: "SINGLE_PRIVATE_1070", label: "Single Person — Private Occupancy — $1070 USD" },
      { value: "DOUBLE_PRIVATE_COUPLES_2080", label: 'Double ("couples") — Private Occupancy — $2080 USD' },
      { value: "DOUBLE_SHARED_1040", label: 'Double (or "shared room") — $1040 USD (2–3 people, separate beds)' },
      { value: "GROUP_4_6_SHARED_980", label: 'Group Rate 4–6 people ("shared room") — $980 USD per person' },
      { value: "GROUP_OTHER", label: "Group Rate (other) — specify in reply email" },
    ],
    []
  );

  const paymentMethods: { value: PaymentMethod; label: string }[] = useMemo(
    () => [
      { value: "ETRANSFER_CAD", label: "e-Transfer (CAD) — Canadian bank to Canadian bank" },
      { value: "DIRECT_DEPOSIT_CAD", label: "Direct deposit — Canadian bank" },
      { value: "ETRANSFER_USD", label: "e-Transfer in USD" },
      { value: "INTERNATIONAL_ACCOUNT", label: "Deposit with international account" },
    ],
    []
  );

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    setErrorMsg("");

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      altFirstName: String(formData.get("altFirstName") || "").trim(),
      altLastName: String(formData.get("altLastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      roomOption: String(formData.get("roomOption") || ""),
      paymentMethod: String(formData.get("paymentMethod") || ""),
      couponCode: String(formData.get("couponCode") || "").trim(),
      newsletterOptIn: String(formData.get("newsletterOptIn") || "no") === "yes",
      whatsappGroupOptIn: String(formData.get("whatsappGroupOptIn") || "no") === "yes",
      whatsappNumber: String(formData.get("whatsappNumber") || "").trim(),
      referral: String(formData.get("referral") || "").trim(),
      website: String(formData.get("website") || "").trim(), // honeypot
    };

    try {
      const res = await fetch("/api/rewilding/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#07110e] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(54,255,175,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-12">
        <header className="mb-8">
          <p className="text-white/70">Rewilding in the Amazon • Jan 26–31, 2026</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Registration Form</h1>
          <p className="mt-3 text-white/70">
            Fill this out to reserve your place. Prices are in <span className="text-white">USD</span>.
          </p>
        </header>

        {status === "success" ? (
          <div className="rounded-3xl border border-white/15 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">You’re in 🌿</h2>
            <p className="mt-2 text-white/70">
              We received your registration. We’ll follow up soon with confirmation + invoice/payment details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                href="/rewilding"
              >
                Back to retreat page
              </Link>
              <Link
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                href={INSTAGRAM_URL}
                target="_blank"
              >
                Instagram
              </Link>
              <Link
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                href={`mailto:${EMAIL}`}
              >
                Email us
              </Link>
            </div>
          </div>
        ) : (
          <form
            className="space-y-8 rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8"
            action={onSubmit}
          >
            {/* Honeypot */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Section title="1) Your name">
              <TwoCol>
                <Field label="First name" name="firstName" placeholder="First name" required />
                <Field label="Last name" name="lastName" placeholder="Last name" required />
              </TwoCol>

              <TwoCol>
                <Field label="Alternative first name (optional)" name="altFirstName" placeholder="Alt first name" />
                <Field label="Alternative last name (optional)" name="altLastName" placeholder="Alt last name" />
              </TwoCol>
            </Section>

            <Section title="2) Contact">
              <TwoCol>
                <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                <Field label="Phone" name="phone" placeholder="+1 ..." required />
              </TwoCol>
            </Section>

            <Section title="3) Notes / requirements">
              <TextArea
                label="Dietary, accessibility, injuries, anything we should know (optional)"
                name="notes"
                placeholder="Write any notes here…"
              />
            </Section>

            <Section title="4) Room option (USD)">
              <Select label="Select your room option" name="roomOption" required>
                <option value="">Please select</option>
                {roomOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Section>

            <Section title="5) Payment method">
              <Select label="Select your most convenient payment method" name="paymentMethod" required>
                <option value="">Please select</option>
                {paymentMethods.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>

              <Field label="Coupon code (optional)" name="couponCode" placeholder="Enter code (if any)" />
            </Section>

            <Section title="6) Updates & WhatsApp">
              <RadioRow
                label="Would you like us to include your email on our newsletter?"
                name="newsletterOptIn"
                options={[
                  { value: "yes", label: "Yes, I would love updates" },
                  { value: "no", label: "No, thank you" },
                ]}
                defaultValue="yes"
              />

              <RadioRow
                label="Would you like to join the pre-retreat WhatsApp group?"
                name="whatsappGroupOptIn"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                defaultValue="yes"
              />

              <Field
                label="WhatsApp phone number (if different from main number)"
                name="whatsappNumber"
                placeholder="+1 ..."
              />
            </Section>

            <Section title="7) How did you hear about this retreat?">
              <TextArea label="Referral (optional)" name="referral" placeholder="Instagram, friend, etc." />
            </Section>

            {status === "error" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
                {errorMsg || "Something went wrong. Please try again."}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/60">
                By submitting, you agree to be contacted about your booking and logistics.
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-2xl bg-emerald-400 px-6 py-3 font-medium text-black hover:bg-emerald-300 disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit Registration"}
              </button>
            </div>
          </form>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Interalchemy Rewilding</p>
          <div className="flex flex-wrap gap-3">
            <Link className="hover:text-white" href={INSTAGRAM_URL} target="_blank">
              Instagram
            </Link>
            <Link className="hover:text-white" href={LINKTREE_URL} target="_blank">
              Linktree
            </Link>
            <Link className="hover:text-white" href={`mailto:${EMAIL}`}>
              Email
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ---------- tiny UI helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field(props: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const { label, name, placeholder, type = "text", required } = props;
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/70">{label}{required ? " *" : ""}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none ring-0 focus:border-white/30"
      />
    </label>
  );
}

function TextArea(props: { label: string; name: string; placeholder?: string }) {
  const { label, name, placeholder } = props;
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/70">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-white/30"
      />
    </label>
  );
}

function Select(props: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const { label, name, required, children } = props;
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/70">{label}{required ? " *" : ""}</span>
      <select
        name={name}
        required={required}
        className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:border-white/30"
      >
        {children}
      </select>
    </label>
  );
}

function RadioRow(props: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  const { label, name, options, defaultValue } = props;
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm text-white/70">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm hover:border-white/25"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={defaultValue ? o.value === defaultValue : false}
            />
            <span className="text-white/85">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
