"use client";

import { Product } from "@/types/product";
import { ProductItem } from "./ProductItem";

type Props = {
  items: Product[];
};

export const ProductList = ({ items }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </div>
  );
};
