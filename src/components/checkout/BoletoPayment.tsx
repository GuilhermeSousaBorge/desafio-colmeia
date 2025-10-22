"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useState } from "react";

export const BoletoPayment = () => {
  const { startPayment, payment } = useCheckoutStore();
  const [form, setForm] = useState({ name: "", cpf: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startPayment("boleto", form);
  };

  if (payment.status !== "idle" && payment.method === "boleto") {
    return (
      <div className="mt-4 text-center space-y-4">
        {payment.status === "processing" && (
          <p className="text-blue-600 font-medium">Gerando boleto...</p>
        )}
        {payment.status === "paid" && (
          <p className="text-green-600 font-semibold">✅ Pagamento via boleto confirmado!</p>
        )}
        {payment.status === "failed" && (
          <p className="text-red-600 font-semibold">❌ Falha ao processar boleto.</p>
        )}
        {payment.status === "expired" && (
          <p className="text-yellow-600 font-semibold">⏰ Boleto expirado.</p>
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
          <FieldLegend>Pagamento com Boleto</FieldLegend>

          <Field>
            <FieldLabel>Nome completo</FieldLabel>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome completo"
              required
            />
          </Field>

          <Field>
            <FieldLabel>CPF</FieldLabel>
            <Input
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              placeholder="000.000.000-00"
              required
            />
          </Field>
        </FieldSet>
      </FieldGroup>

      <Button type="submit" disabled={payment.status === "processing"}>
        {payment.status === "processing" ? "Processando..." : "Gerar boleto"}
      </Button>
    </form>
  );
};
