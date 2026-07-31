"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore, buildOrderData } from "@/store/checkout-store";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

function validateCustomer(customer: { name: string; email: string; phone: string }): string[] {
  const errors: string[] = [];
  if (!customer.name.trim()) errors.push("nombre completo");
  if (!customer.email.trim()) errors.push("correo electr\u00F3nico");
  if (!customer.phone.trim()) errors.push("tel\u00E9fono");
  return errors;
}

function validateShipping(shipping: { city: string; address: string }): string[] {
  const errors: string[] = [];
  if (!shipping.city.trim()) errors.push("ciudad");
  if (!shipping.address.trim()) errors.push("direcci\u00F3n");
  return errors;
}

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const {
    step,
    customer,
    shipping,
    shippingCost,
    discountAmount,
    setOrder,
    goToStep,
  } = useCheckoutStore();
  const [processing, setProcessing] = useState(false);

  const subtotal = getTotal();
  const total = subtotal + shippingCost - discountAmount;

  const canContinue = useMemo(() => {
    const customerErrors = validateCustomer(customer);
    const shippingErrors = validateShipping(shipping);
    return customerErrors.length === 0 && shippingErrors.length === 0;
  }, [customer, shipping]);

  const handleSubmitOrder = async () => {
    if (!canContinue) return;
    setProcessing(true);

    try {
      const sCost = ["Bogot\u00E1", "Medell\u00EDn", "Cali", "Barranquilla", "Cartagena", "Bucaramanga"].includes(shipping.city) ? 12000 : 18000;
      const hasCustomization = items.some((i) => i.designConfig !== undefined);
      const orderData = buildOrderData(
        customer,
        shipping,
        items.map((i) => ({
          id: i.productId,
          name: i.name,
          image: i.image,
          color: i.color,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal,
        sCost,
        discountAmount,
        subtotal + sCost - discountAmount,
        hasCustomization
      );

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Error al registrar el pedido");
      const createdOrder = await res.json();

      setOrder(createdOrder);

      const productsList = createdOrder.items
        .map((item: { name: string; size?: string; quantity: number; unitPrice: number }) => {
          const lines = ["\u2022 " + item.name];
          if (item.size) lines.push("  Talla: " + item.size);
          lines.push("  Cantidad: " + item.quantity);
          lines.push("  Precio: " + formatPrice(item.unitPrice * item.quantity));
          return lines.join("\n");
        })
        .join("\n\n");

      const message = [
        "\u00A1Hola, FIFOR!",
        "",
        "Acabo de realizar un pedido desde su p\u00E1gina web y deseo confirmar mi compra.",
        "",
        "Pedido: #" + createdOrder.id,
        "",
        "Resumen del pedido",
        "",
        productsList,
        "",
        "Total a pagar: " + formatPrice(createdOrder.total),
        "",
        "Cliente: " + createdOrder.customer.name,
        "Correo: " + createdOrder.customer.email,
        "Tel\u00E9fono: " + createdOrder.customer.phone,
        "Ciudad: " + createdOrder.shipping.city,
        "Direcci\u00F3n: " + createdOrder.shipping.address,
        "",
        "Confirmar valor de env\u00EDo de pedido",
        "",
        "Quedo atento(a) a las instrucciones para realizar el pago.",
        "",
        "\u00A1Muchas gracias!",
      ].join("\n");

      const whatsappUrl = "https://wa.me/" + SITE_CONFIG.whatsapp + "?text=" + encodeURIComponent(message);
      window.location.href = whatsappUrl;

      goToStep("confirm");
    } catch (err) {
      console.error("Error al registrar el pedido:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <h1 className="text-2xl font-bold text-[#2D5A3D] mb-2">Tu carrito est\u00E1 vac\u00EDo</h1>
          <p className="text-muted-foreground mb-6">Agrega productos antes de continuar con el checkout.</p>
          <Link
            href="/carrito"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors"
          >
            Ir al carrito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {step !== "confirm" && (
          <div className="flex items-center gap-3 mb-10">
            <Link
              href="/carrito"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al carrito
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
                Checkout
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-1">
                Finalizar compra
              </h1>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-3 space-y-8">
                <CheckoutForm />
                <button
                  onClick={handleSubmitOrder}
                  disabled={processing || !canContinue}
                  className="w-full h-12 flex items-center justify-center gap-2 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Confirmar pedido en WhatsApp
                    </>
                  )}
                </button>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} /> Datos protegidos
                  </span>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <OrderSummary />
                </div>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OrderConfirmation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}