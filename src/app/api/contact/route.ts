import { NextResponse } from "next/server";
import { saveContactMessage, type ContactMessage } from "@/lib/contact-store";
import { sendContactEmails } from "@/lib/contact";

const SUBJECTS = [
  "Información sobre un producto",
  "Personalización de prendas",
  "Estado de un pedido",
  "Cotización",
  "Sugerencias",
  "Reclamos",
  "Otro",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    const errors: Record<string, string> = {};

    if (!name) errors.name = "Por favor ingresa tu nombre completo.";
    if (!email) {
      errors.email = "Por favor ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Por favor ingresa un correo electrónico válido.";
    }
    if (!phone) errors.phone = "Por favor ingresa tu número de teléfono.";
    if (!subject) {
      errors.subject = "Por favor selecciona un asunto.";
    } else if (!SUBJECTS.includes(subject)) {
      errors.subject = "Por favor selecciona un asunto válido.";
    }
    if (!message) {
      errors.message = "Por favor escribe tu mensaje.";
    } else if (message.length < 10) {
      errors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const msg: ContactMessage = {
      id: `CONTACTO-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toISOString(),
    };

    saveContactMessage(msg);

    try {
      await sendContactEmails(msg);
    } catch (emailError) {
      console.error("Error enviando correos de contacto:", emailError);
    }

    return NextResponse.json({ ok: true, id: msg.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
}
