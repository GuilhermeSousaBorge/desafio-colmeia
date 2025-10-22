import { create } from "zustand";
import productsData from "@/mocks/products.json";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductState {
  products: Product[];
  getProductById: (id: number) => Product | undefined;
  search: (query: string) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: productsData,

  getProductById: (id) => get().products.find((p) => p.id === id),

  search: (query) => {
    const q = query.toLowerCase();
    return get().products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  },
}));
