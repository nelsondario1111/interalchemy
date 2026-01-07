// app/rewilding/layout.tsx
export default function RewildingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh text-white text-[17px] md:text-[18px] bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(52,211,153,0.22),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(34,197,94,0.14),transparent_55%),radial-gradient(900px_700px_at_50%_90%,rgba(16,185,129,0.10),transparent_60%),linear-gradient(to_bottom,#0A1B15,#050B0A)]">
      {children}
    </div>
  );
}
