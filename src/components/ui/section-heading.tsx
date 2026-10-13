import { cn } from "@/lib/cn";

type SectionHeadingProps = Readonly<{
  id?: string;
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
}>;

export function SectionHeading({
  id,
  title,
  description,
  eyebrow,
  align = "left"
}: SectionHeadingProps) {
  return (
    <header className={cn("space-y-5", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? (
        <p className="mystic-badge">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3 sm:space-y-4">
        <h2 id={id} className="font-display text-3xl font-semibold tracking-[-0.03em] text-[rgba(255,238,220,0.98)] sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "max-w-3xl text-sm leading-7 text-[rgba(201,206,226,0.84)] sm:text-base sm:leading-8 lg:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
