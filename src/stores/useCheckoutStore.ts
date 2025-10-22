import { create } from "zustand";

type PaymentMethod = "card" | "pix" | "boleto";
type CheckoutStatus = "idle" | "processing" | "paid" | "failed" | "expired";

interface PaymentData {
  method: PaymentMethod | null;
  details?: Record<string, unknown>;
  status: CheckoutStatus;
}

interface CheckoutStore {
  payment: PaymentData;
  startPayment: (method: PaymentMethod, details?: Record<string, unknown>) => void;
  setStatus: (status: CheckoutStatus) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  payment: {
    method: null,
    details: {},
    status: "idle",
  },

  startPayment: (method, details) => {
    set({
      payment: { method, details, status: "processing" },
    });

    // simula o delay e resultado do pagamento
    setTimeout(() => {
      const result = Math.random();
      if (result < 0.7) {
        // sucesso 70%
        set({
          payment: { method, details, status: "paid" },
        });
      } else if (result < 0.9) {
        // falha 20%
        set({
          payment: { method, details, status: "failed" },
        });
      } else {
        // expirado 10%
        set({
          payment: { method, details, status: "expired" },
        });
      }
    }, 2000);
  },

  setStatus: (status) =>
    set((state) => ({
      payment: { ...state.payment, status },
    })),

  reset: () =>
    set({
      payment: { method: null, details: {}, status: "idle" },
    }),
}));
