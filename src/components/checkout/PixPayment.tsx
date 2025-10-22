"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useState } from "react";

export const PixPayment = () => {
  const { startPayment, payment, reset } = useCheckoutStore();
  const [form, setForm] = useState({ cpf: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startPayment("pix", form);
  };

  if (payment.status !== "idle" && payment.method === "pix") {
    return (
      <div className="mt-4 text-center space-y-4">
        {payment.status === "processing" && (
          <p className="text-blue-600 font-medium">Processando pagamento via PIX...</p>
        )}
        {payment.status === "paid" && (
          <p className="text-green-600 font-semibold">✅ Pagamento confirmado!</p>
        )}
        {payment.status === "failed" && (
          <p className="text-red-600 font-semibold">❌ Falha no pagamento. Tente novamente.</p>
        )}
        {payment.status === "expired" && (
          <p className="text-yellow-600 font-semibold">⏰ Pagamento expirado.</p>
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
          <FieldLegend>Pagamento via PIX</FieldLegend>

          <Field>
            <FieldLabel>CPF</FieldLabel>
            <Input
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              placeholder="000.000.000-00"
              required
            />
          </Field>

          <Field>
            <FieldLabel>E-mail</FieldLabel>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@exemplo.com"
              required
            />
          </Field>
        </FieldSet>
      </FieldGroup>

      <Button type="submit" disabled={payment.status === "processing"}>
        {payment.status === "processing" ? "Processando..." : "Gerar QR Code e pagar"}
      </Button>
    </form>
  );
};
