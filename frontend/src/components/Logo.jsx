import { Droplet } from "lucide-react";

export default function Logo({ large=false }) {
  return (
    <div className={`logo ${large ? "logo-large" : ""}`}>
      <Droplet fill="currentColor" />
      <span>DonorGO</span>
    </div>
  );
}
