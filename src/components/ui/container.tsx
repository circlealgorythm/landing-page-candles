import { cn } from "@/lib/cn";

type ContainerProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("container w-full max-w-full", className)}>{children}</div>;
}
