"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { toast } from "sonner";

function InstagramIcon({ size }: { size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size }: { size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Completa los campos obligatorios");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    toast.success("Mensaje enviado", { description: "Te responderemos pronto." });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Contáctanos
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D5A3D] mt-2">
            Estamos aquí para ayudarte
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Escríbenos y te responderemos a la brevedad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mb-5"
                >
                  <Check size={32} className="text-[#2D5A3D]" />
                </motion.div>
                <h3 className="text-lg font-semibold text-[#2D5A3D] mb-1">
                  Mensaje enviado
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Gracias por escribirnos. Te contactaremos pronto.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="text-sm font-medium text-[#2D5A3D] hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Nombre completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full h-12 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">
                      Correo electrónico <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      className="w-full h-12 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Celular (opcional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="300 123 4567"
                    className="w-full h-12 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    className="w-full px-4 py-3 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                  ) : (
                    <><Send size={16} /> Enviar mensaje</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-8"
          >
            <div className="bg-[#F5F0EB]/50 rounded-sm p-6 space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Información de contacto
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#2D5A3D]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Correo electrónico</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-medium text-foreground hover:text-[#2D5A3D] transition-colors">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#2D5A3D]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Teléfono</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm font-medium text-foreground hover:text-[#2D5A3D] transition-colors">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#2D5A3D]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dirección</p>
                    <p className="text-sm font-medium text-foreground">{SITE_CONFIG.address}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#2D5A3D]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Horario de atención</p>
                    <p className="text-sm font-medium text-foreground">Lun - Vie: 9:00 - 18:00</p>
                    <p className="text-sm text-muted-foreground">Sáb: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F0EB]/50 rounded-sm p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Síguenos
              </h3>
              <div className="flex gap-3">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#D4C5A9]/50 flex items-center justify-center text-muted-foreground hover:text-[#2D5A3D] hover:border-[#2D5A3D] transition-all"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#D4C5A9]/50 flex items-center justify-center text-muted-foreground hover:text-[#2D5A3D] hover:border-[#2D5A3D] transition-all"
                >
                  <FacebookIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
