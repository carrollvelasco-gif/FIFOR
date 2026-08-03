import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/constants";
import type { ContactMessage } from "@/lib/contact-store";

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || "");
}

const FROM_EMAIL = "FIFOR <onboarding@resend.dev>";
const ADMIN_EMAIL = "carrollvelasco@gmail.com";

export function buildAdminContactHtml(msg: ContactMessage): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F9F7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding:40px 20px;">
        <table cellpadding="0" cellspacing="0" width="600" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#2D5A3D;padding:24px 40px;">
              <h1 style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">✉️ Nueva solicitud de contacto</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:6px;">Asunto</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:6px;text-align:right;font-weight:600;">${msg.subject}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:6px;">Fecha</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:6px;text-align:right;">
                    ${new Date(msg.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })} - ${new Date(msg.date).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1A1A1A;">Datos del cliente</h3>
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:6px;">Nombre</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:6px;text-align:right;">${msg.name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:6px;">Correo</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:6px;text-align:right;">${msg.email}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;">Teléfono</td>
                  <td style="font-size:13px;color:#1A1A1A;text-align:right;">${msg.phone}</td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1A1A1A;">Mensaje</h3>
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;">
                <tr>
                  <td style="font-size:14px;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${msg.message}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildClientContactHtml(msg: ContactMessage): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F9F7F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding:40px 20px;">
        <table cellpadding="0" cellspacing="0" width="600" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#2D5A3D;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">FIFOR</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="text-align:center;padding-bottom:24px;">
                    <div style="width:56px;height:56px;border-radius:50%;background:#A8D5BA;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
                      <span style="font-size:28px;">📬</span>
                    </div>
                    <h2 style="margin:0;font-size:22px;font-weight:700;color:#2D5A3D;">¡Gracias por comunicarte con FIFOR!</h2>
                    <p style="margin:8px 0 0;font-size:14px;color:#888;line-height:1.5;">
                      Hola <strong style="color:#1A1A1A;">${msg.name}</strong>, hemos recibido tu mensaje correctamente.
                      Nuestro equipo responderá lo antes posible.
                    </p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:6px;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Asunto</span>
                    <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#1A1A1A;">${msg.subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;border-top:1px solid #E8E0D6;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Tu mensaje</span>
                    <p style="margin:4px 0 0;font-size:14px;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${msg.message}</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;padding-top:24px;border-top:1px solid #E8E0D6;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0;font-size:12px;color:#888;">
                      FIFOR &bull; ${SITE_CONFIG.phone} &bull; ${SITE_CONFIG.address}
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#aaa;">
                      Si tienes alguna duda, escríbenos a nuestro WhatsApp o contáctanos por nuestra página web.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactAdminNotification(msg: ContactMessage): Promise<void> {
  const html = buildAdminContactHtml(msg);
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `✉️ Nueva solicitud de contacto - ${msg.subject}`,
    html,
  });
}

export async function sendContactClientConfirmation(msg: ContactMessage): Promise<void> {
  const html = buildClientContactHtml(msg);
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: msg.email,
    subject: "¡Gracias por comunicarte con FIFOR!",
    html,
  });
}

export async function sendContactEmails(msg: ContactMessage): Promise<void> {
  await Promise.all([sendContactAdminNotification(msg), sendContactClientConfirmation(msg)]);
}
