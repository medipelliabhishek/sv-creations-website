export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-terra">
      <span className="font-display text-sm italic">{index}</span>
      <span className="h-px w-10 bg-terra" aria-hidden />
      {children}
    </p>
  );
}
