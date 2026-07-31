import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OrderData } from "@/lib/checkout-types";

interface OrderStore {
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  getOrder: (id: string) => OrderData | undefined;
  getUserOrders: () => OrderData[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      getOrder: (id) => get().orders.find((o) => o.id === id),
      getUserOrders: () => get().orders,
    }),
    { name: "fifor-orders" },
  ),
);
