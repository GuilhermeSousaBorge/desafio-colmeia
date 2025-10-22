"use client";
import { formatMoney } from "@/lib/utils";
import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCartStore";

type Props = {
  item: Product;
};

export const ProductItem = ({ item }: Props) => {
  const { addToCart } = useCartStore();

  return (
    <div className="text-sm bg-secondary rounded-md p-4">
      {/* <Image
        src={item.image}
        alt={item.name}
        width={200}
        height={200}
        className="w-full mb-3"
      /> */}
      <div className="text-lg font-bold">{item.name}</div>
      <div className="truncate mb-4">{item.description}</div>
      <div className="text-sm justify-between">
        Itens em estoque: {item.stock}
      </div>
      <div>{formatMoney(item.price)}</div>
      <div className="text-center">
        <Button onClick={() => addToCart(item)}>Adicionar ao carrinho</Button>
      </div>
    </div>
  );
};
