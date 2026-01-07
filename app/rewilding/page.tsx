// app/rewilding/page.tsx
import Link from "next/link";

const REGISTRATION_URL = "/rewilding/register"; // our custom form route (we’ll build next)
const LINKTREE_URL =
  "https://linktr.ee/interalchemyrewilding?utm_source=ig&utm_medium=social&utm_content=link_in_bio";
const INSTAGRAM_URL = "https://www.instagram.com/interalchemy_rewilding/";
const EMAIL = "interalchemyrewilding@gmail.com";

const pricing = [
  {
    name: "Single • Private",
    price: "USD $1,070",
    note: "One person, private occupancy",
    highlight: false,
  },
  {
    name: "Couples • Private",
    price: "USD $2,080",
    note: "Double private occupancy",
    highlight: true,
  },
  {
    name: "Shared Room",
    price: "USD $1,040",
    note: "2–3 people, separate beds",
    highlight: false,
  },
  {
    name: "Group Rate (4–6)",
    price: "USD $980 / person",
    note: "Shared room group rate",
    highlight: false,
  },
];

const included = [
  "Transportation to/from Tarapoto airport (TPP) + local transfers during the retreat",
  "5 nights eco-lodge accommodation at Chirapa Manta (private/shared options)",
  "All meals + snacks + superfood juices/extracts",
  "Daily wellness sessions: yoga, tai chi, meditation, breathwork, ecstatic dance",
  "Guided jungle + river excursions (waterfalls, river swims, wildlife spotting)",
  "Cacao tour + bean-to-bar experience + cacao ceremony + cacao exfoliation",
  "Fire ritual + ceramics firing + storytelling circle + sound healing",
  "Plant workshops + Amazon remedies mini-courses + integration circles/journaling",
];

const faqs = [
  {
    q: "Where do we fly into?",
    a: "Fly into Tarapoto (TPP). Transfers to/from the airport are included, and we’ll share the exact pickup details after you register.",
  },
  {
    q: "Do I need to be super fit?",
    a: "No. Most activities are gentle-to-moderate (walks, hikes, movement practices). If you have mobility or health considerations, tell us in the registration notes so we can support you.",
  },
  {
    q: "What’s included / not included?",
    a: "Included: accommodation, meals, airport transfers, excursions, workshops, and all retreat activities. Not included: flights, travel insurance, and personal items.",
  },
  {
    q: "Can I come solo?",
    a: "Yes. Many guests come solo — the group container is welcoming and supportive.",
  },
  {
    q: "Is Wi-Fi available?",
    a: "Limited. This retreat is designed to support a digital detox and deeper presence in nature.",
  },
  {
    q: "How do payments work?",
    a: "All prices are in USD. After you register, you’ll receive payment instructions (the form includes options like CAD/US transfer methods and international deposit).",
  },
];

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-sm tracking-widest uppercase text-emerald-200/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-white/80 leading-relaxed text-lg md:text-xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className="inline-flex items-center justify-center rounded-xl bg-emerald-300 px-5 py-3 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-200 transition"
    >
      {children}
    </Link>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/8 px-5 py-3 font-semibold text-white hover:bg-white/12 transition"
    >
      {children}
    </Link>
  );
}

export default function RewildingPage() {
  return (
    <main
      className="min-h-screen text-white text-[17px] md:text-[18px] bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(52,211,153,0.22),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(34,197,94,0.14),transparent_55%),radial-gradient(900px_700px_at_50%_90%,rgba(16,185,129,0.10),transparent_60%),linear-gradient(to_bottom,#0A1B15,#050B0A)]"
    >
      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-300/20 border border-emerald-200/25" />
            <div className="leading-tight">
              <p className="text-base font-semibold">Interalchemy</p>
              <p className="text-sm text-white/70">Rewilding Specialists</p>
            </div>
          </div>
          <PrimaryButton href={REGISTRATION_URL}>Register</PrimaryButton>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background image: put a file at /public/images/amazon-hero.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/amazon-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050B0A]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Jan 26–31, 2026 • 6 Days / 5 Nights • Peruvian High Amazon
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight">
              Rewilding in the Amazon
            </h1>

            <p className="mt-4 text-lg md:text-2xl text-white/85">
              Escape the ordinary. This isn’t just a vacation — it’s a journey
              back to your primal core.
            </p>

            <p className="mt-3 text-base text-white/70">
              All listed prices are in USD.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href={REGISTRATION_URL}>
                Register / Apply Now
              </PrimaryButton>
              <GhostButton href={LINKTREE_URL}>View Linktree</GhostButton>
              <GhostButton href={`mailto:${EMAIL}`}>Email Us</GhostButton>
            </div>

            <p className="mt-5 text-sm md:text-base text-white/70">
              Limited spaces • small groups only • airport pickup from Tarapoto
              (TPP)
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IS REWILDING */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle
          eyebrow="The Reset"
          title="What is Rewilding?"
          subtitle="An immersive experience designed to strip away modern stress and reconnect you with your innate, wild self — guided by local experts and wellness practitioners."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Nervous System Reset",
              body: "Nature immersion, breath, movement, sound, and space to unwind.",
            },
            {
              title: "Embodied Practices",
              body: "Yoga, Tai Chi, voice activation, ecstatic dance, meditation.",
            },
            {
              title: "Integration & Community",
              body: "Circles, journaling, and intentional connection — without pressure.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/15 bg-white/8 p-7 shadow-lg shadow-black/20"
            >
              <h3 className="text-xl md:text-2xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-white/85 leading-relaxed text-base md:text-lg">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDED */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-white/15 bg-white/8 p-8 md:p-10">
          <SectionTitle
            eyebrow="All-Inclusive"
            title="What’s Included"
            subtitle="Everything you need to arrive, drop in, and let the jungle do its work."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-white/12 bg-white/6 p-5"
              >
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-200" />
                <p className="text-white/85 text-base md:text-lg">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/20 p-5">
            <p className="text-white/80">Registration takes ~2–4 minutes.</p>
            <PrimaryButton href={REGISTRATION_URL}>
              Open Registration
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* THE SPACE */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle
          eyebrow="The Space"
          title="Chirapa Manta Eco-Lodge"
          subtitle="Eco-lodge living in the jungle — designed for rest, connection, and deep sleep to the rainforest symphony."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <div className="md:col-span-7 rounded-2xl overflow-hidden border border-white/15 bg-white/8">
            <div
              className="aspect-[16/10] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/space-1.jpg')" }}
            />
          </div>
          <div className="md:col-span-5 grid gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/8">
              <div
                className="aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/space-2.jpg')" }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/8">
              <div
                className="aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/space-3.jpg')" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <PrimaryButton href={REGISTRATION_URL}>Register Now</PrimaryButton>
          <p className="text-sm md:text-base text-white/70">
            After you submit, we’ll follow up with confirmation + payment details.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <SectionTitle
          eyebrow="Pricing"
          title="Choose Your Room Option"
          subtitle="All prices are in USD. Select your option inside the registration form."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={[
                "rounded-2xl border p-7 shadow-lg",
                p.highlight
                  ? "border-emerald-200/40 bg-emerald-200/12 shadow-emerald-500/10"
                  : "border-white/15 bg-white/8 shadow-black/20",
              ].join(" ")}
            >
              {p.highlight ? (
                <p className="mb-3 inline-flex rounded-full bg-emerald-200/20 px-3 py-1 text-xs text-emerald-100">
                  Most Popular
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-semibold">{p.name}</h3>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/85">
                  USD
                </span>
              </div>

              <p className="mt-4 text-3xl md:text-4xl font-semibold">{p.price}</p>
              <p className="mt-2 text-base text-white/75">{p.note}</p>

              <div className="mt-6">
                <PrimaryButton href={REGISTRATION_URL}>Select in Form</PrimaryButton>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm md:text-base text-white/70">
          Payment methods are shown inside the registration form.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle
          eyebrow="Questions"
          title="FAQ"
          subtitle="If you still have questions after this, just email or DM — we’re happy to help."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/15 bg-white/8 p-7"
            >
              <summary className="cursor-pointer list-none font-semibold text-lg">
                <div className="flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-white/70 group-open:rotate-45 transition">
                    +
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-white/85 leading-relaxed text-base md:text-lg">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <PrimaryButton href={REGISTRATION_URL}>Register Now</PrimaryButton>
          <div className="flex flex-wrap gap-3">
            <GhostButton href={INSTAGRAM_URL}>Instagram</GhostButton>
            <GhostButton href={LINKTREE_URL}>Linktree</GhostButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/70 text-sm md:text-base">
            © {new Date().getFullYear()} Interalchemy Rewilding • All prices in USD
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-xl border border-white/25 bg-white/8 px-4 py-2 text-sm hover:bg-white/12"
              href={INSTAGRAM_URL}
              target="_blank"
            >
              Instagram
            </Link>
            <Link
              className="rounded-xl border border-white/25 bg-white/8 px-4 py-2 text-sm hover:bg-white/12"
              href={LINKTREE_URL}
              target="_blank"
            >
              Linktree
            </Link>
            <Link
              className="rounded-xl border border-white/25 bg-white/8 px-4 py-2 text-sm hover:bg-white/12"
              href={`mailto:${EMAIL}`}
            >
              Email
            </Link>
            <Link
              className="rounded-xl border border-white/25 bg-white/8 px-4 py-2 text-sm hover:bg-white/12"
              href={REGISTRATION_URL}
            >
              Register
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/40 backdrop-blur md:hidden">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm text-white/90">Jan 26–31, 2026 • USD</p>
          <Link
            href={REGISTRATION_URL}
            className="rounded-xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-950"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
