"use client";

import { useCartStore } from "@/stores/useCartStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { PaymentMethods } from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { items} = useCartStore();

  if (!user) {
    router.push("/auth");
    return null;
  }

  if (items.length === 0) {
    router.push("/catalogo");
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-10 bg-slate-50">
      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>
      <PaymentMethods />
    </main>
  );
}
