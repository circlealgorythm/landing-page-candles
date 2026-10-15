import { cn } from "@/lib/cn";

type RevealProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>;

export function Reveal({ children, className }: RevealProps) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
}
