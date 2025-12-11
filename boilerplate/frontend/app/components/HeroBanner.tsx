import { Button } from "./ui/button";
import { Smartphone, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="px-8 py-10 bg-linear-to-r from-blue-700 via-indigo-600 to-purple-600 text-white  shadow-lg">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">
          Start Your Journey with Godimo
        </h2>
        <p className="text-lg text-blue-100 mb-4">
          Discover flexible plans, exclusive deals, and the latest smartphones.
          Join Godimo and unlock a smarter way to connect.
        </p>
        <Button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition flex items-center gap-2">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
