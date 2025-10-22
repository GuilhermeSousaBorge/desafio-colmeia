"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCartStore } from "@/stores/useCartStore";

export const CardPayment = () => {
  const { startPayment, payment } = useCheckoutStore();
  const {total} = useCartStore()
  const [form, setForm] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startPayment("card", form);
  };

  if (payment.status !== "idle" && payment.method === "card") {
    return (
      <div className="mt-4 text-center space-y-4">
        {payment.status === "processing" && (
          <p className="text-blue-600 font-medium">Processando pagamento...</p>
        )}
        {payment.status === "paid" && (
          <p className="text-green-600 font-semibold">✅ Pagamento aprovado!</p>
        )}
        {payment.status === "failed" && (
          <p className="text-red-600 font-semibold">
            ❌ Pagamento recusado. Tente novamente.
          </p>
        )}
        {payment.status === "expired" && (
          <p className="text-yellow-600 font-semibold">
            ⏰ Pagamento expirado.
          </p>
        )}
        {payment.status !== "processing" && (
          <Button onClick={() => (window.location.href = "/catalogo")}>
            Voltar ao Catálogo
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Cartão de crédito</FieldLegend>

          <Field>
            <FieldLabel>Nome no cartão</FieldLabel>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Field>
          <Field>
            <FieldLabel>Número do cartão</FieldLabel>
            <Input
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              required
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field>
              <FieldLabel>Mês</FieldLabel>
              <Input
                placeholder="MM"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Ano</FieldLabel>
              <Input
                placeholder="YYYY"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                required
              />
            </Field>
            <Field>
              <FieldLabel>CVV</FieldLabel>
              <Input
                placeholder="123"
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                required
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>Selecione as parcelas</FieldLabel>
            <Select defaultValue="">
              <SelectTrigger id="checkout-7j9-exp-parc-f59">
                <SelectValue placeholder="parcelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1x {(total()).toFixed(2)}</SelectItem>
                <SelectItem value="2">2x {(total()/2).toFixed(2)}</SelectItem>
                <SelectItem value="3">3x {(total()/3).toFixed(2)}</SelectItem>
                <SelectItem value="4">4x {(total()/4).toFixed(2)}</SelectItem>
                <SelectItem value="5">5x {(total()/5).toFixed(2)}</SelectItem>
                <SelectItem value="6">6x {(total()/6).toFixed(2)}</SelectItem>
                <SelectItem value="7">7x {(total()/7).toFixed(2)}</SelectItem>
                <SelectItem value="8">8x {(total()/8).toFixed(2)}</SelectItem>
                <SelectItem value="9">9x {(total()/9).toFixed(2)}</SelectItem>
                <SelectItem value="10">10x {(total()/10).toFixed(2)}</SelectItem>
                <SelectItem value="11">11x {(total()/11).toFixed(2)}</SelectItem>
                <SelectItem value="12">12x {(total()/12).toFixed(2)}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldSet>
      </FieldGroup>

      <Button type="submit" disabled={payment.status === "processing"}>
        {payment.status === "processing" ? "Processando..." : "Pagar"}
      </Button>
    </form>
  );
};
