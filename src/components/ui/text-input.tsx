type TextInputProps = Readonly<{
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
}>;

export function TextInput({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete
}: TextInputProps) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-3.5 text-base text-foreground outline-none backdrop-blur-xl transition-[border-color,background-color] duration-150 placeholder:text-muted-foreground/70 focus:border-orange-300/50 focus:bg-[linear-gradient(180deg,rgba(255,186,125,0.08),rgba(124,176,238,0.05))] focus:ring-2 focus:ring-orange-400/30 sm:text-sm"
      />
    </div>
  );
}
