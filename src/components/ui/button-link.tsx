"use client";

import Link from "next/link";

import { cn } from "@/lib/cn";

type ButtonLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}>;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick
}: ButtonLinkProps) {
  const isAnchor = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (isAnchor && !e.defaultPrevented) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const commonClasses = cn(
    "button-glow inline-flex min-h-[3.5rem] items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold tracking-[0.08em] uppercase transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out active:scale-[0.97] select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variant === "primary" &&
      "border-orange-200/35 bg-[linear-gradient(135deg,rgba(255,230,188,0.98),rgba(255,180,92,0.98)_45%,rgba(246,106,36,0.98))] text-slate-950 shadow-[0_20px_50px_rgba(255,124,28,0.2)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(255,124,28,0.28)]",
    variant === "secondary" &&
      "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] text-foreground backdrop-blur-xl hover:-translate-y-0.5 hover:border-sky-200/20 hover:bg-[linear-gradient(180deg,rgba(122,177,241,0.12),rgba(255,255,255,0.05))]",
    className
  );

  if (isAnchor) {
    return (
      <a href={href} onClick={handleClick} className={commonClasses}>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={commonClasses}>
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
