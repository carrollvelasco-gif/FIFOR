"use client";

import { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useOrderStore } from "@/store/order-store";
import { SITE_CONFIG } from "@/lib/constants";

export function WhatsAppButton() {
  const orders = useOrderStore((s) => s.orders);

  const hasRecentOrder = useMemo(() => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return orders.some(
      (o) =>
        (o.paymentStatus === "approved" || o.paymentStatus === "pending") &&
        new Date(o.date).getTime() > fiveMinutesAgo,
    );
  }, [orders]);

  const message = hasRecentOrder
    ? "¿Necesitas ayuda con tu pedido?"
    : "Contáctanos por WhatsApp";

  const handleClick = () => {
    const text = hasRecentOrder
      ? "Hola. ¿Podrían ayudarme con mi pedido?"
      : "Hola. Quisiera recibir información sobre FIFOR.";
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors rounded-full shadow-lg hover:shadow-xl group"
      aria-label={message}
    >
      <div className="w-12 h-12 flex items-center justify-center shrink-0">
        <MessageCircle size={22} />
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[220px] group-hover:pr-4 text-sm font-medium">
        {message}
      </span>
    </motion.button>
  );
}
