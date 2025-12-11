import type { Route } from "./+types/product.$slug";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Check,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";
import { products } from "../data/products";

/*
// Old products array - now imported from ../data/products
const productsOld = [
  {
    id: 1,
    name: "Samsung Galaxy S24 128GB",
    price: 899.0,
    description: "Flagship 5G smartphone with Dynamic AMOLED display.",
    image: "https://placehold.co/400x400/0066cc/white?text=Samsung+S24",
    category: "smartphone",
    stock: 30,
    currency: "EUR",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 256GB",
    price: 999.0,
    description: "Flagship 5G smartphone with increased storage.",
    image: "https://placehold.co/400x400/0066cc/white?text=Samsung+S24",
    category: "smartphone",
    stock: 20,
    currency: "EUR",
  },
  {
    id: 3,
    name: "Apple iPhone 15 128GB",
    price: 949.0,
    description: "5G smartphone with advanced camera system.",
    image: "https://placehold.co/400x400/000000/white?text=iPhone+15",
    category: "smartphone",
    stock: 15,
    currency: "EUR",
  },
  {
    id: 4,
    name: "Apple iPhone 15 256GB",
    price: 1099.0,
    description: "Premium 5G smartphone for performance users.",
    image: "https://placehold.co/400x400/000000/white?text=iPhone+15",
    category: "smartphone",
    stock: 10,
    currency: "EUR",
  },
  {
    id: 5,
    name: "Google Pixel 8 128GB",
    price: 799.0,
    description: "AI-powered 5G smartphone with high-end camera.",
    image: "https://placehold.co/400x400/34A853/white?text=Pixel+8",
    category: "smartphone",
    stock: 18,
    currency: "EUR",
  },
  {
    id: 6,
    name: "Google Pixel 8 Pro 256GB",
    price: 1099.0,
    description: "Premium 5G smartphone with top-tier photography.",
    image: "https://placehold.co/400x400/34A853/white?text=Pixel+8+Pro",
    category: "smartphone",
    stock: 12,
    currency: "EUR",
  },
  {
    id: 7,
    name: "OnePlus 12 256GB",
    price: 899.0,
    description: "High-performance 5G smartphone with fast charging.",
    image: "https://placehold.co/400x400/FF0000/white?text=OnePlus+12",
    category: "smartphone",
    stock: 25,
    currency: "EUR",
  },
  {
    id: 8,
    name: "OnePlus 12 512GB",
    price: 999.0,
    description: "Maximum storage edition of the flagship device.",
    image: "https://placehold.co/400x400/FF0000/white?text=OnePlus+12",
    category: "smartphone",
    stock: 15,
    currency: "EUR",
  },
  {
    id: 9,
    name: "SIM-Only Unlimited Plan",
    price: 29.0,
    description: "Unlimited data, calls, and SMS with monthly flexibility.",
    image: "https://placehold.co/400x400/E60000/white?text=Vodafone",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 10,
    name: "SIM-Only 10GB Plan",
    price: 12.5,
    description: "Affordable monthly plan with 10GB data.",
    image: "https://placehold.co/400x400/00A9CE/white?text=KPN",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 11,
    name: "SIM-Only 20GB Plan",
    price: 17.0,
    description: "Balanced plan with 20GB data.",
    image: "https://placehold.co/400x400/E20074/white?text=T-Mobile",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 12,
    name: "SIM-Only 5GB Budget Plan",
    price: 8.0,
    description: "Entry-level plan with basic data needs.",
    image: "https://placehold.co/400x400/00AA4F/white?text=Lebara",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 13,
    name: "Prepaid SIM Starter Pack",
    price: 10.0,
    description: "Triple SIM with €10 credit included.",
    image: "https://placehold.co/400x400/666666/white?text=Prepaid+SIM",
    category: "prepaid",
    stock: 300,
    currency: "EUR",
  },
  {
    id: 14,
    name: "Prepaid Data Pack 5GB",
    price: 12.0,
    description: "5GB prepaid top-up package.",
    image: "https://placehold.co/400x400/666666/white?text=5GB+Data",
    category: "prepaid",
    stock: 200,
    currency: "EUR",
  },
  {
    id: 15,
    name: "Prepaid Data Pack 20GB",
    price: 25.0,
    description: "20GB prepaid package for heavy users.",
    image: "https://placehold.co/400x400/666666/white?text=20GB+Data",
    category: "prepaid",
    stock: 180,
    currency: "EUR",
  },
  {
    id: 16,
    name: "Samsung Galaxy Buds 3",
    price: 149.0,
    description: "Wireless earbuds with noise cancellation.",
    image: "https://placehold.co/400x400/0066cc/white?text=Galaxy+Buds",
    category: "accessory",
    stock: 50,
    currency: "EUR",
  },
  {
    id: 17,
    name: "Apple AirPods 3",
    price: 179.0,
    description: "Premium wireless earbuds with spatial audio.",
    image: "https://placehold.co/400x400/000000/white?text=AirPods+3",
    category: "accessory",
    stock: 40,
    currency: "EUR",
  },
  {
    id: 18,
    name: "Sony WH-1000XM5",
    price: 329.0,
    description: "Top-tier noise-cancelling wireless headphones.",
    image: "https://placehold.co/400x400/0033AA/white?text=Sony+XM5",
    category: "accessory",
    stock: 25,
    currency: "EUR",
  },
  {
    id: 19,
    name: "USB-C 30W Fast Charger",
    price: 24.9,
    description: "Universal fast charger compatible with major smartphones.",
    image: "https://placehold.co/400x400/888888/white?text=Charger",
    category: "accessory",
    stock: 180,
    currency: "EUR",
  },
  {
    id: 20,
    name: "USB-C to USB-C Cable (1m)",
    price: 9.99,
    description: "Durable charging cable for modern Android phones.",
    image: "https://placehold.co/400x400/888888/white?text=USB-C+Cable",
    category: "accessory",
    stock: 300,
    currency: "EUR",
  },
  {
    id: 21,
    name: "iPhone 15 Silicone Case - Black",
    price: 39.0,
    description: "Protective silicone case for iPhone 15.",
    image: "https://placehold.co/400x400/000000/white?text=iPhone+Case",
    category: "accessory",
    stock: 150,
    currency: "EUR",
  },
  {
    id: 22,
    name: "Samsung S24 Protective Case",
    price: 29.0,
    description: "Shock-absorbing protective case.",
    image: "https://placehold.co/400x400/0066cc/white?text=S24+Case",
    category: "accessory",
    stock: 120,
    currency: "EUR",
  },
  {
    id: 23,
    name: "OnePlus 12 Protective Case",
    price: 25.0,
    description: "Durable case for OnePlus 12.",
    image: "https://placehold.co/400x400/FF0000/white?text=OnePlus+Case",
    category: "accessory",
    stock: 100,
    currency: "EUR",
  },
  {
    id: 24,
    name: "Samsung Galaxy Tab S9 128GB",
    price: 799.0,
    description: "High-end 5G tablet for productivity and entertainment.",
    image: "https://placehold.co/400x400/0066cc/white?text=Tab+S9",
    category: "tablet",
    stock: 18,
    currency: "EUR",
  },
  {
    id: 25,
    name: 'iPad Air 11" 64GB (2024)',
    price: 749.0,
    description: "Lightweight 5G-capable tablet.",
    image: "https://placehold.co/400x400/000000/white?text=iPad+Air",
    category: "tablet",
    stock: 20,
    currency: "EUR",
  },
  {
    id: 26,
    name: "Samsung Galaxy Watch 6",
    price: 299.0,
    description: "Smartwatch with LTE connectivity.",
    image: "https://placehold.co/400x400/0066cc/white?text=Watch+6",
    category: "wearable",
    stock: 40,
    currency: "EUR",
  },
  {
    id: 27,
    name: "Apple Watch Series 9 GPS + Cellular",
    price: 499.0,
    description: "Premium cellular-connected smartwatch.",
    image: "https://placehold.co/400x400/000000/white?text=Watch+S9",
    category: "wearable",
    stock: 25,
    currency: "EUR",
  },
  {
    id: 28,
    name: "Xiaomi Redmi Note 13 Pro",
    price: 349.0,
    description: "Midrange 5G smartphone with strong battery life.",
    image: "https://placehold.co/400x400/FF6900/white?text=Redmi+Note",
    category: "smartphone",
    stock: 60,
    currency: "EUR",
  },
  {
    id: 29,
    name: "Motorola Edge 50",
    price: 499.0,
    description: "Stylish 5G smartphone with OLED screen.",
    image: "https://placehold.co/400x400/0033AA/white?text=Moto+Edge",
    category: "smartphone",
    stock: 35,
    currency: "EUR",
  },
  {
    id: 30,
    name: "SIM-Only Unlimited EU Plan",
    price: 39.0,
    description: "Unlimited EU data roaming included.",
    image: "https://placehold.co/400x400/E60000/white?text=Vodafone+EU",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 31,
    name: "MagSafe Charger",
    price: 49.0,
    description: "Magnetic wireless charger for iPhone.",
    image: "https://placehold.co/400x400/000000/white?text=MagSafe",
    category: "accessory",
    stock: 120,
    currency: "EUR",
  },
  {
    id: 32,
    name: "Galaxy S24 Screen Protector",
    price: 14.99,
    description: "High-durability tempered glass.",
    image: "https://placehold.co/400x400/888888/white?text=Screen+Guard",
    category: "accessory",
    stock: 200,
    currency: "EUR",
  },
  {
    id: 33,
    name: "OnePlus Buds Pro 2",
    price: 149.0,
    description: "Premium ANC earbuds.",
    image: "https://placehold.co/400x400/FF0000/white?text=Buds+Pro+2",
    category: "accessory",
    stock: 50,
    currency: "EUR",
  },
  {
    id: 34,
    name: "Google Pixel Buds Pro",
    price: 199.0,
    description: "Noise-cancelling wireless earbuds.",
    image: "https://placehold.co/400x400/34A853/white?text=Pixel+Buds",
    category: "accessory",
    stock: 40,
    currency: "EUR",
  },
  {
    id: 35,
    name: "Samsung Galaxy A35 128GB",
    price: 299.0,
    description: "Affordable 5G smartphone.",
    image: "https://placehold.co/400x400/0066cc/white?text=Galaxy+A35",
    category: "smartphone",
    stock: 70,
    currency: "EUR",
  },
  {
    id: 36,
    name: "iPhone SE (2024)",
    price: 529.0,
    description: "Compact iPhone with 5G support.",
    image: "https://placehold.co/400x400/000000/white?text=iPhone+SE",
    category: "smartphone",
    stock: 30,
    currency: "EUR",
  },
  {
    id: 37,
    name: "SIM-Only Student 15GB Plan",
    price: 9.99,
    description: "Discounted subscription for students.",
    image: "https://placehold.co/400x400/FF6600/white?text=Ben+Student",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 38,
    name: "Huawei FreeBuds 6i",
    price: 99.0,
    description: "Wireless earbuds with ANC.",
    image: "https://placehold.co/400x400/CC0000/white?text=FreeBuds",
    category: "accessory",
    stock: 80,
    currency: "EUR",
  },
  {
    id: 39,
    name: "Xiaomi Mi In-Ear Wired Earphones",
    price: 14.99,
    description: "Affordable wired earphones with mic.",
    image: "https://placehold.co/400x400/FF6900/white?text=Mi+Earphones",
    category: "accessory",
    stock: 300,
    currency: "EUR",
  },
  {
    id: 40,
    name: "Belkin 3-in-1 Charging Dock",
    price: 129.0,
    description: "Charge phone, watch, and earbuds simultaneously.",
    image: "https://placehold.co/400x400/000000/white?text=Belkin+Dock",
    category: "accessory",
    stock: 35,
    currency: "EUR",
  },
  {
    id: 41,
    name: "Motorola Moto G24",
    price: 179.0,
    description: "Budget smartphone with large battery.",
    image: "https://placehold.co/400x400/0033AA/white?text=Moto+G24",
    category: "smartphone",
    stock: 90,
    currency: "EUR",
  },
  {
    id: 42,
    name: "Nokia G42 5G",
    price: 249.0,
    description: "Affordable 5G smartphone.",
    image: "https://placehold.co/400x400/124191/white?text=Nokia+G42",
    category: "smartphone",
    stock: 65,
    currency: "EUR",
  },
  {
    id: 43,
    name: "iPhone 15 Clear Case",
    price: 45.0,
    description: "Transparent protective case.",
    image: "https://placehold.co/400x400/000000/white?text=Clear+Case",
    category: "accessory",
    stock: 140,
    currency: "EUR",
  },
  {
    id: 44,
    name: "Samsung Galaxy A35 Silicone Case",
    price: 19.99,
    description: "Soft-touch protective case.",
    image: "https://placehold.co/400x400/0066cc/white?text=A35+Case",
    category: "accessory",
    stock: 130,
    currency: "EUR",
  },
  {
    id: 45,
    name: "USB-C Car Charger 45W",
    price: 29.99,
    description: "Fast charging for smartphones while driving.",
    image: "https://placehold.co/400x400/888888/white?text=Car+Charger",
    category: "accessory",
    stock: 100,
    currency: "EUR",
  },
  {
    id: 46,
    name: "Xiaomi Redmi Buds 5",
    price: 49.99,
    description: "Affordable wireless earbuds.",
    image: "https://placehold.co/400x400/FF6900/white?text=Redmi+Buds",
    category: "accessory",
    stock: 90,
    currency: "EUR",
  },
  {
    id: 47,
    name: "SIM-Only Unlimited Calling Plan",
    price: 14.99,
    description: "Unlimited calls + 5GB data.",
    image: "https://placehold.co/400x400/0099CC/white?text=Tele2",
    category: "subscription",
    stock: null,
    currency: "EUR",
  },
  {
    id: 48,
    name: "Apple AirPods Pro 2",
    price: 279.0,
    description: "Premium ANC earbuds with transparency mode.",
    image: "https://placehold.co/400x400/000000/white?text=AirPods+Pro",
    category: "accessory",
    stock: 30,
    currency: "EUR",
  },
  {
    id: 49,
    name: "Samsung Galaxy Fit 3",
    price: 79.0,
    description: "Fitness tracker with AMOLED display.",
    image: "https://placehold.co/400x400/0066cc/white?text=Fit+3",
    category: "wearable",
    stock: 100,
    currency: "EUR",
  },
  {
    id: 50,
    name: "Motorola Moto E14",
    price: 129.0,
    description: "Entry-level smartphone with solid performance.",
    image: "https://placehold.co/400x400/0033AA/white?text=Moto+E14",
    category: "smartphone",
    stock: 80,
    currency: "EUR",
  },
];
*/

const categoryLabels: Record<string, string> = {
  smartphone: "Smartphone",
  accessory: "Accessory",
  subscription: "Subscription Plan",
  prepaid: "Prepaid",
  tablet: "Tablet",
  wearable: "Wearable",
};

export function meta({ params }: Route.MetaArgs) {
  const slug = params.slug;
  const productName = slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return [
    { title: `${productName} - Godimo` },
    { name: "description", content: `Shop ${productName} at the best price!` },
  ];
}

export default function ProductDetail({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { slug } = params;

  // Convert slug back to product name for matching
  const productNameFromSlug = slug.split("-").join(" ").toLowerCase();

  // Find the product
  const product = products.find(
    (p) => p.name.toLowerCase() === productNameFromSlug
  );

  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Product Not Found
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 truncate">
              {product.name}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-32">
        {/* Product Image */}
        <div className="bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md mx-auto h-80 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="px-4 py-6 space-y-6">
          {/* Title and Category */}
          <div>
            <Badge variant="secondary" className="mb-2">
              {categoryLabels[product.category]}
            </Badge>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                4.8 (127 reviews)
              </span>
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              €{product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Description
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>

          {/* Stock Status */}
          {product.stock !== null && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Availability
                  </span>
                  {product.stock > 20 ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                    >
                      In Stock ({product.stock} available)
                    </Badge>
                  ) : product.stock > 0 ? (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                    >
                      Only {product.stock} left!
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                      Free Shipping
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Delivered to your door at no extra cost
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                      1 Year Warranty
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Full manufacturer warranty included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
                      Easy Returns
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      14-day return policy, no questions asked
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Fixed Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-base font-semibold px-3 min-w-8 text-center">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10"
              onClick={() => setQuantity(quantity + 1)}
              disabled={product.stock !== null && quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="flex-1 h-12 text-base"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart • €{(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down">
          <Check className="h-5 w-5 text-green-400 dark:text-green-600" />
          <span className="text-sm font-medium">
            {quantity} × {product.name} added to cart!
          </span>
        </div>
      )}
    </div>
  );
}
