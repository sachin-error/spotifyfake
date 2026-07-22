import StatusBadge from "./StatusBadge";

/**
 * Small "SYSTEM ONLINE" indicator, meant to sit inline in the navbar
 * (the app's top corner) rather than as a floating overlay.
 */
function SystemStatus({ className = "" }) {
  return <StatusBadge label="SYSTEM ONLINE" className={className} />;
}

export default SystemStatus;
