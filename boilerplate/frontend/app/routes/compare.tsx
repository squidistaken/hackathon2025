import { useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import type { Product } from "../data/products";
import { products } from "../data/products";

export default function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get compared product IDs from query string
  const params = new URLSearchParams(location.search);
  const ids = params.get("ids")?.split(",").map(Number) || [];
  const compared = products.filter((p) => ids.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200">
        Product Comparison
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800">
          <thead>
            <tr>
              <th className="p-4 text-left font-bold text-zinc-700 dark:text-zinc-200">
                Feature
              </th>
              {compared.map((product) => (
                <th
                  key={product.id}
                  className="p-4 text-center font-bold text-blue-700 dark:text-blue-200"
                >
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-200">
                Image
              </td>
              {compared.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-200">
                Price
              </td>
              {compared.map((product) => (
                <td
                  key={product.id}
                  className="p-4 text-center font-bold text-green-600 dark:text-green-400"
                >
                  €{product.price.toFixed(2)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-zinc-700 dark:text-zinc-200">
                Description
              </td>
              {compared.map((product) => (
                <td
                  key={product.id}
                  className="p-4 text-xs text-zinc-700 dark:text-zinc-300"
                >
                  {product.description}
                </td>
              ))}
            </tr>
            {/* Add more rows for other specs if available */}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
