import Link from "next/link";

type SocialIconLinkProps = Readonly<{
  href: string;
  name: "Telegram" | "VK" | "YouTube" | "VK Видео";
}>;

export function SocialIconLink({ href, name }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-2.5 text-sm text-foreground backdrop-blur-xl transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-sky-200/20 hover:bg-[linear-gradient(180deg,rgba(122,177,241,0.12),rgba(255,255,255,0.04))]"
    >
      <SocialIcon name={name} />
      <span>{name}</span>
    </Link>
  );
}

type SocialIconProps = Readonly<{
  name: "Telegram" | "VK" | "YouTube" | "VK Видео";
}>;

function SocialIcon({ name }: SocialIconProps) {
  const commonProps = {
    "aria-hidden": true,
    width: 16,
    height: 16,
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.75,
    viewBox: "0 0 24 24"
  };

  if (name === "Telegram") {
    return (
      <svg {...commonProps}>
        <path d="M21 3 3.8 9.6c-.8.3-.8 1.4 0 1.7l4.4 1.5 1.7 5.1c.2.7 1.1.8 1.5.3l2.4-3 4.6 3.4c.6.4 1.5.1 1.7-.6L22 4.3C22.2 3.5 21.6 2.8 21 3Z" />
        <path d="m8.2 12.8 9.4-6.6" />
      </svg>
    );
  }

  if (name === "VK") {
    return (
      <svg {...commonProps}>
        <path d="M4 7.5c.2 5.5 3.1 8.8 8.1 8.8h.3v-2.8c1.6.1 2.7 1.1 3.2 2.8H18c-.7-2.5-2.4-3.9-3.5-4.4 1.1-.6 2.5-2.1 2.9-4.4h-2.1c-.5 1.8-1.8 3.2-2.9 3.4V7.5h-2.1v5.9c-1.1-.3-2.6-1.7-2.6-5.9H4Z" />
      </svg>
    );
  }

  if (name === "VK Видео") {
    return (
      <svg {...commonProps}>
        <path d="M7 4.5H5.5A3.5 3.5 0 0 0 2 8v8a3.5 3.5 0 0 0 3.5 3.5H7" />
        <rect x="7" y="4.5" width="15" height="15" rx="3.5" />
        <path d="m12.5 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
