import GlowCard from "./GlowCard";

/**
 * Small system-readout style widget, e.g. NETWORK / SYSTEM panels.
 * rows: [{ label, value, color }]
 */
function TerminalWidget({ title, rows = [], className = "" }) {
  return (
    <GlowCard hover={false} className={`p-4 ${className}`}>
      <p className="text-[10px] font-heading font-semibold tracking-widest uppercase text-hkf-mute mb-3">
        {title}
      </p>
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-hkf-sub">{row.label}</span>
            <span
              className={`font-semibold ${
                row.color === "amber"
                  ? "text-amber-400"
                  : row.color === "red"
                  ? "text-red-400"
                  : "text-hkf-green"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}

export default TerminalWidget;
