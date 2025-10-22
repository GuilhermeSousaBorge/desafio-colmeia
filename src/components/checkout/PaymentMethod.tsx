"use client";

import { useState } from "react";
import { CardPayment } from "./CardPayment";
import { PixPayment } from "./PixPayment";
import { BoletoPayment } from "./BoletoPayment";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PaymentMethods = () => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-center">Método de pagamento</h2>

      <div className="flex justify-around">
        <Button
          variant={selected === "card" ? "default" : "outline"}
          onClick={() => setSelected("card")}
        >
          Cartão
        </Button>
        <Button
          variant={selected === "pix" ? "default" : "outline"}
          onClick={() => setSelected("pix")}
        >
          PIX
        </Button>
        <Button
          variant={selected === "boleto" ? "default" : "outline"}
          onClick={() => setSelected("boleto")}
        >
          Boleto
        </Button>
      </div>

      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          selected ? "opacity-100 max-h-[1200px]" : "opacity-0 max-h-0"
        )}
      >
        {selected === "card" && <CardPayment />}
        {selected === "pix" && <PixPayment />}
        {selected === "boleto" && <BoletoPayment />}
      </div>
    </div>
  );
};
