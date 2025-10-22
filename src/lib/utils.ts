import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (price: string | number) => {
  return parseFloat(price.toString()).toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
};

export const paymentSimulator = async (
  method: string
): Promise<"success" | "failed" | "expired"> => {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  await delay(1500);

  const random = Math.random();
  if (random < 0.7) return "success";
  if (random < 0.9) return "failed";
  return "expired";
};
