"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { paymentSimulator } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethods } from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { items, total, clearCart } = useCartStore();
  const [method, setMethod] = useState("pix");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed" | "expired">("idle");

  if (!user) {
    router.push("/auth");
    return null;
  }

  if (items.length === 0) {
    router.push("/catalogo");
    return null;
  }

  async function handlePayment() {
    setStatus("processing");
    const result = await paymentSimulator(method);
    setStatus(result);

    if (result === "success") {
      clearCart();
      setTimeout(() => router.push("/checkout/success"), 1500);
    } else if (result === "failed") {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-10 bg-slate-50">
      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>
      <PaymentMethods />
    </main>
    // <main className="max-w-3xl mx-auto mt-10 p-4">
    //   <h1 className="text-2xl font-bold mb-6">Checkout</h1>

    //   <div className="space-y-6">
    //     {/* DADOS DO USUÁRIO */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Seus dados</CardTitle>
    //       </CardHeader>
    //       <CardContent className="grid gap-2">
    //         <p><strong>Nome:</strong> {user.name}</p>
    //         <p><strong>Email:</strong> {user.email}</p>
    //         <p><strong>Telefone:</strong> {user.phone}</p>
    //         <p><strong>Endereço:</strong> {user.address}</p>
    //       </CardContent>
    //     </Card>

    //     {/* MÉTODO DE PAGAMENTO */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Forma de pagamento</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <RadioGroup value={method} onValueChange={setMethod} className="space-y-3">
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="pix" id="pix" />
    //             <Label htmlFor="pix">Pix</Label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="credit" id="credit" />
    //             <Label htmlFor="credit">Cartão de Crédito</Label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="boleto" id="boleto" />
    //             <Label htmlFor="boleto">Boleto</Label>
    //           </div>
    //         </RadioGroup>
    //       </CardContent>
    //     </Card>

    //     {/* RESUMO DO PEDIDO */}
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Resumo do pedido</CardTitle>
    //       </CardHeader>
    //       <CardContent className="space-y-2">
    //         {items.map((item) => (
    //           <div key={item.id} className="flex justify-between">
    //             <span>{item.name} x{item.quantity}</span>
    //             <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
    //           </div>
    //         ))}
    //         <div className="flex justify-between font-semibold border-t pt-2 mt-2">
    //           <span>Total:</span>
    //           <span>R$ {total().toFixed(2)}</span>
    //         </div>
    //       </CardContent>
    //       <CardFooter>
    //         <Button
    //           className="w-full"
    //           disabled={status === "processing"}
    //           onClick={handlePayment}
    //         >
    //           {status === "processing" ? "Processando..." : "Confirmar pagamento"}
    //         </Button>
    //       </CardFooter>
    //     </Card>

    //     {/* FEEDBACK */}
    //     {status !== "idle" && (
    //       <p className="text-center text-sm text-muted-foreground">
    //         {status === "processing" && "Estamos processando seu pagamento..."}
    //         {status === "success" && "Pagamento aprovado ✅"}
    //         {status === "failed" && "Pagamento falhou ❌, tente novamente."}
    //         {status === "expired" && "Pagamento expirado ⏰"}
    //       </p>
    //     )}
    //   </div>
    // </main>
  );
}
