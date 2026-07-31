import { create } from "zustand";
import type {
  CustomerInfo,
  ShippingAddress,
  CheckoutStep,
  OrderData,
} from "@/lib/checkout-types";
import { generateId } from "@/lib/utils";

interface CheckoutStore {
  step: CheckoutStep;
  customer: CustomerInfo;
  shipping: ShippingAddress;
  discountCode: string;
  discountAmount: number;
  shippingCost: number;
  order: OrderData | null;
  errors: Partial<Record<"customer" | "shipping", string[]>>;

  setCustomer: (customer: CustomerInfo) => void;
  setShipping: (shipping: ShippingAddress) => void;
  setDiscountCode: (code: string) => void;
  setDiscountAmount: (amount: number) => void;
  setShippingCost: (cost: number) => void;
  setOrder: (order: OrderData) => void;
  setErrors: (errors: Partial<Record<"customer" | "shipping", string[]>>) => void;
  goToStep: (step: CheckoutStep) => void;
  reset: () => void;
}

const initialCustomer: CustomerInfo = { name: "", email: "", phone: "" };
const initialShipping: ShippingAddress = {
  city: "",
  address: "",
  observations: "",
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step: "form",
  customer: { ...initialCustomer },
  shipping: { ...initialShipping },
  discountCode: "",
  discountAmount: 0,
  shippingCost: 0,
  order: null,
  errors: {},

  setCustomer: (customer) => set({ customer },
  ),
  setShipping: (shipping) => set({ shipping }),
  setDiscountCode: (code) => set({ discountCode: code }),
  setDiscountAmount: (amount) => set({ discountAmount: amount }),
  setShippingCost: (cost) => set({ shippingCost: cost }),
  setOrder: (order) => set({ order }),
  setErrors: (errors) => set({ errors }),
  goToStep: (step) => set({ step }),

  reset: () =>
    set({
      step: "form",
      customer: { ...initialCustomer },
      shipping: { ...initialShipping },
      discountCode: "",
      discountAmount: 0,
      shippingCost: 0,
      order: null,
      errors: {},
    }),
}));

export function buildOrderData(
  customer: CustomerInfo,
  shipping: ShippingAddress,
  items: { id: string; name: string; image: string; color: string; size: string; quantity: number; price: number }[],
  subtotal: number,
  shippingCost: number,
  discountAmount: number,
  total: number,
  hasCustomization: boolean,
): OrderData {
  return {
    id: `FIFOR-${Date.now().toString(36).toUpperCase()}-${generateId().toUpperCase()}`,
    date: new Date().toISOString(),
    customer,
    shipping,
    items: items.map((i) => ({
      id: i.id,
      name: i.name,
      image: i.image,
      color: i.color,
      size: i.size,
      quantity: i.quantity,
      unitPrice: i.price,
    })),
    subtotal,
    shippingCost,
    discount: discountAmount,
    total,
    status: "pending",
    paymentStatus: "pending",
    hasCustomization,
    timelineStatuses: ["recibido"],
  };
}
