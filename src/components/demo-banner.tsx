import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <Info size={16} />
      <span>
        Preview mode: data is saved only in this browser. Secure shared storage
        will be activated before entries open.
      </span>
    </div>
  );
}
