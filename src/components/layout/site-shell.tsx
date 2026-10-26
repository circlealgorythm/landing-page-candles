import { CookieBanner } from "./cookie-banner";

type SiteShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden w-full max-w-full bg-background overscroll-x-none">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="section-dust opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(circle_at_top,rgba(255,190,120,0.22),transparent_44%)]" />
        <div className="absolute left-[-9rem] top-[26rem] h-80 w-80 rounded-full bg-[rgba(255,141,49,0.16)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[8rem] h-[22rem] w-[22rem] rounded-full bg-[rgba(106,162,227,0.13)] blur-3xl" />
        <div className="absolute left-1/2 top-[7rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(255,223,183,0.08),transparent_66%)] blur-2xl" />
        <div className="section-orbit left-1/2 top-14 h-[32rem] w-[32rem] -translate-x-1/2 opacity-30" />
        <div className="ritual-ring left-1/2 top-24 h-[26rem] w-[26rem] -translate-x-1/2 opacity-35" />
        <div className="absolute inset-x-0 bottom-0 h-[30rem] bg-[linear-gradient(180deg,transparent,rgba(6,8,16,0.92))]" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col w-full max-w-full overflow-x-hidden">{children}</div>
      <CookieBanner />
    </div>
  );
}
