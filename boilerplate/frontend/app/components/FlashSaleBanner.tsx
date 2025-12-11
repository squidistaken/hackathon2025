import { Button } from "./ui/button";
import { Zap } from "lucide-react";

export function FlashSaleBanner() {
  return (
    <section className="px-4 pb-4">
      <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 fill-white" />
              <h3 className="font-bold text-lg">Flash Sale</h3>
            </div>
            <p className="text-sm text-orange-50">
              Up to 30% OFF on selected phones!
            </p>
          </div>
          <Button size="sm" variant="secondary" className="font-semibold">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
