export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  city: string;
  address: string;
  observations: string;
}

export type CheckoutStep = "form" | "confirm";

export interface OrderSummaryItem {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | "recibido"
  | "pago-aprobado"
  | "produccion"
  | "personalizacion"
  | "calidad"
  | "empacado"
  | "enviado"
  | "entregado";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  recibido: "Pedido recibido",
  "pago-aprobado": "Pago aprobado",
  produccion: "En producción",
  personalizacion: "Personalización",
  calidad: "Control de calidad",
  empacado: "Empacado",
  enviado: "Enviado",
  entregado: "Entregado",
};

export const ORDER_TIMELINE: OrderStatus[] = [
  "recibido",
  "pago-aprobado",
  "produccion",
  "personalizacion",
  "calidad",
  "empacado",
  "enviado",
  "entregado",
];

export interface TrackingInfo {
  carrier: string;
  number: string;
  url: string;
}

export interface OrderData {
  id: string;
  date: string;
  customer: CustomerInfo;
  shipping: ShippingAddress;
  items: OrderSummaryItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: "pending" | "approved" | "rejected";
  paymentStatus: "pending" | "approved" | "rejected";
  timelineStatuses: OrderStatus[];
  hasCustomization: boolean;
  tracking?: TrackingInfo;
}

export interface CheckoutState {
  step: CheckoutStep;
  customer: CustomerInfo;
  shipping: ShippingAddress;
  discountCode: string;
  discountAmount: number;
  shippingCost: number;
  order: OrderData | null;
}
