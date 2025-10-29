export default function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full h-2 bg-gray-700/60 rounded-full overflow-hidden">
      <div
        className="h-2 bg-[#00BFA5] transition-all duration-300"
        style={{ width: `${pct}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        role="progressbar"
      />
    </div>
  );
}