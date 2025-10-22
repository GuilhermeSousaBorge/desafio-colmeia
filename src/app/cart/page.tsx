"use client";

import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-lg">Seu carrinho está vazio 😢</p>
        <Button asChild>
          <Link href="/catalogo">Voltar ao catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 px-4">
      <Button asChild>
        <Link href="/catalogo">Voltar ao catálogo</Link>
      </Button>
      <h1 className="text-2xl font-bold mb-6">Seu carrinho</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  R$ {item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <span className="font-semibold text-xl">
          Total: R$ {total().toFixed(2)}
        </span>
        <div className="flex gap-3">
          <Button variant="outline" onClick={clearCart}>
            Limpar carrinho
          </Button>
          <Button asChild>
            <Link href="/checkout">Finalizar compra</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
