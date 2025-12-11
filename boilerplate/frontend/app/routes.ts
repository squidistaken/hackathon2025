import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product/:slug", "routes/product.$slug.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("compare", "routes/compare.tsx"),
] satisfies RouteConfig;
