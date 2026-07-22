function SidebarItem({
  icon: Icon,
  label,
  active = false,
  disabled = false,
  soon = false,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      title={soon ? `${label} (coming soon)` : label}
      disabled={disabled}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
      border-l-2 transition-colors duration-150 text-left
      ${
        active
          ? "border-hkf-green bg-hkf-green/10 text-hkf-green shadow-glow-sm"
          : disabled
          ? "border-transparent text-hkf-mute cursor-not-allowed"
          : "border-transparent text-hkf-sub hover:text-hkf-green hover:bg-hkf-green/5"
      } ${className}`}
    >
      {Icon && <Icon size={17} strokeWidth={1.8} className="shrink-0" />}
      <span className="truncate">{label}</span>
      {soon && (
        <span className="ml-auto text-[9px] tracking-wide uppercase text-hkf-mute border border-[rgba(0,255,100,.12)] rounded px-1.5 py-0.5 shrink-0">
          soon
        </span>
      )}
    </button>
  );
}

export default SidebarItem;
