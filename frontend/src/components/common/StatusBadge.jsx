function StatusBadge({ label = "ONLINE", color = "green", pulse = true, className = "" }) {
  const dotColor =
    color === "green"
      ? "bg-hkf-green"
      : color === "amber"
      ? "bg-amber-400"
      : color === "red"
      ? "bg-red-400"
      : "bg-hkf-mute";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      border border-[rgba(0,255,100,.12)] bg-black/40 text-[10px] tracking-widest
      uppercase text-hkf-sub ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotColor} opacity-60`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColor}`} />
      </span>
      {label}
    </span>
  );
}

export default StatusBadge;
