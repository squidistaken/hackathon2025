import { Button } from "./ui/button";
import { Smartphone, Truck, ShieldCheck } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="px-4 py-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Smartphone className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Latest Smartphones</h2>
      </div>
      <p className="text-sm mb-4 text-blue-50">
        Get the best deals on flagship phones
      </p>
      <div className="flex gap-2 text-xs">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Truck className="h-3 w-3" />
          Free Shipping
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />1 Year Warranty
        </div>
      </div>
    </section>
  );
}
