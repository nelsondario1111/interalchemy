import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050B0A] text-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Interalchemy</h1>
        <p className="mt-3 text-white/70">Rewilding Specialists</p>
        <div className="mt-8">
          <Link
            href="/rewilding"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 font-medium text-emerald-950 hover:bg-emerald-300 transition"
          >
            View Rewilding Landing Page
          </Link>
        </div>
      </div>
    </main>
  );
}
