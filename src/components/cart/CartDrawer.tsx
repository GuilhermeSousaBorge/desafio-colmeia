"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, total } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
              {items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Seu carrinho</DrawerTitle>
        </DrawerHeader>

        <ScrollArea className="h-[50vh] px-2">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Carrinho vazio 😢</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</Button>
                    <span>{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>🗑️</Button>
              </div>
            ))
          )}
        </ScrollArea>

        {items.length > 0 && (
          <DrawerFooter>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {total().toFixed(2)}</span>
            </div>
            <Button asChild>
              <a href="/cart">Ir para o carrinho</a>
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
