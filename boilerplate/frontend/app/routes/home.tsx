import type { Route } from "./+types/home";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ShoppingCart,
  Star,
  Home as HomeIcon,
  Search,
  User,
  Menu,
  Plus,
  Minus,
  Check,
  Smartphone,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Godimo - Buy Latest Smartphones" },
    {
      name: "description",
      content:
        "Shop the latest smartphones and mobile devices at the best prices!",
    },
  ];
}

const products = [
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to convert product name to URL slug
  const createProductSlug = (productName: string) => {
    return productName.toLowerCase().replace(/\s+/g, "-");
  };

  // Navigate to product detail page
  const goToProduct = (product: (typeof products)[0]) => {
    const slug = createProductSlug(product.name);
    navigate(`/product/${slug}`);
  };

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Increase quantity if item already in cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ];
      }
    });

    // Show toast notification
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove item from cart
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  const getCartItemQuantity = (productId: number) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getFilteredProducts = () => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "smartphone", label: "Smartphones" },
    { id: "accessory", label: "Accessories" },
    { id: "subscription", label: "Plans" },
    { id: "prepaid", label: "Prepaid" },
    { id: "tablet", label: "Tablets" },
    { id: "wearable", label: "Wearables" },
  ];

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Godimo
            </h1>
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - with padding for fixed header */}
      <main className="pt-16">
        {/* Hero Banner - Mobile Optimized */}
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

        {/* Category Chips */}
        <section className="px-4 py-4 overflow-x-hidden">
          <div className="flex gap-2 whitespace-nowrap">
            {categories.map((category) => (
              <Badge
                key={category.id}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  selectedCategory === category.id
                    ? ""
                    : "bg-transparent text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </section>

        {/* Flash Sale Banner */}
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

        {/* Products Section - Mobile Grid */}
        <section className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.id === selectedCategory)?.label}
              <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-2">
                ({filteredProducts.length})
              </span>
            </h2>
          </div>

          {/* Mobile 2-column grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Menu className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                No products found
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Try selecting a different category
              </p>
              <Button onClick={() => setSelectedCategory("all")}>
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden active:scale-[0.98] transition-all duration-200 hover:shadow-md cursor-pointer border-zinc-200 dark:border-zinc-800"
                  onClick={() => goToProduct(product)}
                >
                  <div className="relative bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-44 object-contain p-4"
                    />
                    {product.stock && product.stock < 20 && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                        Only {product.stock} left
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-tight min-h-10">
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-end justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">
                          Price
                        </p>
                        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                          €{product.price.toFixed(2)}
                        </span>
                      </div>
                      {getCartItemQuantity(product.id) > 0 ? (
                        <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(product.id);
                            }}
                          >
                            <Minus className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </Button>
                          <span className="text-sm font-bold px-2 text-blue-600 dark:text-blue-400 min-w-6 text-center">
                            {getCartItemQuantity(product.id)}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <Plus className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="icon"
                          className="h-9 w-9 rounded-lg shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-down">
          <Check className="h-5 w-5 text-green-400 dark:text-green-600" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Cart Summary Floating Button (Optional) */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-4 z-40">
          <Button
            className="h-12 px-4 shadow-lg"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />€
            {getTotalPrice().toFixed(2)}
          </Button>
        </div>
      )}

      {/* Cart Side Panel */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 z-50 shadow-2xl animate-slide-in-right flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  Shopping Cart
                </h2>
                {getTotalItems() > 0 && (
                  <Badge variant="secondary">{getTotalItems()} items</Badge>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsCartOpen(false)}
              >
                <Plus className="h-5 w-5 rotate-45" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mb-4" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                    Add some phones to get started!
                  </p>
                  <Button onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 rounded-lg w-fit">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-semibold px-2">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => {
                              const product = products.find(
                                (p) => p.id === item.id
                              );
                              if (product) addToCart(product);
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Subtotal
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Shipping
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold border-t border-zinc-200 dark:border-zinc-800 pt-2">
                    <span className="text-zinc-900 dark:text-zinc-50">
                      Total
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-50">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full h-12 text-base" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <>
          {/* Overlay Background */}
          <div
            className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          />

          {/* Search Modal */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 animate-fade-in">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800">
                <Search className="h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search for phones, accessories, plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent outline-none text-base text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400"
                />
                {searchQuery && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <Plus className="h-4 w-4 rotate-45" />
                  </Button>
                )}
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {searchQuery.trim() ? (
                  filteredProducts.length > 0 ? (
                    <div className="p-2">
                      {filteredProducts.slice(0, 6).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            goToProduct(product);
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-contain bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                              {product.name}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {categories.find((c) => c.id === product.category)?.label}
                              </Badge>
                              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                                €{product.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {filteredProducts.length > 6 && (
                        <div className="text-center py-3 text-sm text-zinc-500 dark:text-zinc-400">
                          +{filteredProducts.length - 6} more results
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                      <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                        No results found
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Try searching with different keywords
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                    <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                      Start searching
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Type to find phones, accessories, and more
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              {!searchQuery.trim() && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    POPULAR SEARCHES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["iPhone", "Samsung", "AirPods", "Unlimited Plan", "5G"].map(
                      (term) => (
                        <Badge
                          key={term}
                          variant="outline"
                          className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
