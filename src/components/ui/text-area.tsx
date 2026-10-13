type TextAreaProps = Readonly<{
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}>;

export function TextArea({ id, name, label, placeholder, rows = 5 }: TextAreaProps) {
  return (
    <div className="space-y-2.5">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-4 py-3.5 text-base text-foreground outline-none backdrop-blur-xl transition duration-300 placeholder:text-muted-foreground/70 focus:border-orange-200/30 focus:bg-[linear-gradient(180deg,rgba(255,186,125,0.08),rgba(124,176,238,0.05))] focus:ring-4 focus:ring-orange-200/10 sm:text-sm"
      />
    </div>
  );
}
