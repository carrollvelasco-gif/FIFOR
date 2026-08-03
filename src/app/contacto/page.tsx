"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Check, Loader2, X } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const SUBJECTS = [
  "Información sobre un producto",
  "Personalización de prendas",
  "Estado de un pedido",
  "Cotización",
  "Sugerencias",
  "Reclamos",
  "Otro",
];

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

const inputClass = "w-full h-12 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Por favor ingresa tu nombre completo.";
  if (!form.email.trim()) {
    errors.email = "Por favor ingresa tu correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Por favor ingresa un correo electrónico válido.";
  }
  if (!form.phone.trim()) errors.phone = "Por favor ingresa tu número de teléfono.";
  if (!form.subject) errors.subject = "Por favor selecciona un asunto.";
  if (!form.message.trim()) {
    errors.message = "Por favor escribe tu mensaje.";
  } else if (form.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }
  return errors;
}

export default function ContactoPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.values(fieldErrors).some(Boolean)) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        throw new Error("Error al enviar el mensaje");
      }
      setForm(initialForm);
      setShowSuccess(true);
    } catch {
      setErrors({ message: "No pudimos enviar tu mensaje. Intenta nuevamente en unos momentos." });
    } finally {
      setSending(false);
    }
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
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-foreground mb-1.5">
                    Nombre completo <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Ej: María Pérez"
                    aria-invalid={!!errors.name}
                    className={`${inputClass} ${errors.name ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-foreground mb-1.5">
                    Correo electrónico <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="ejemplo@correo.com"
                    aria-invalid={!!errors.email}
                    className={`${inputClass} ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-foreground mb-1.5">
                    Teléfono <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="300 123 4567"
                    aria-invalid={!!errors.phone}
                    className={`${inputClass} ${errors.phone ? "border-red-400 focus:border-red-400" : ""}`}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-foreground mb-1.5">
                    Asunto <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    aria-invalid={!!errors.subject}
                    className={`${inputClass} ${form.subject ? "" : "text-muted-foreground/40"} ${errors.subject ? "border-red-400 focus:border-red-400" : ""}`}
                  >
                    <option value="" disabled>
                      Selecciona un asunto
                    </option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="text-foreground">
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-foreground mb-1.5">
                  Mensaje <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres)..."
                  rows={5}
                  aria-invalid={!!errors.message}
                  className={`w-full px-4 py-3 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40 resize-none ${errors.message ? "border-red-400 focus:border-red-400" : ""}`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
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

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-lg p-8 shadow-2xl text-center"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-5"
              >
                <Check size={32} className="text-[#2D5A3D]" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#2D5A3D] mb-2">
                ¡Gracias por comunicarte con FIFOR!
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Hemos recibido tu mensaje correctamente.
                Nuestro equipo responderá lo antes posible.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm"
              >
                Volver al inicio
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
