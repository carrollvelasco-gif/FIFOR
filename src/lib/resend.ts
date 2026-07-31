import { Resend } from "resend";
import type { OrderData } from "@/lib/checkout-types";
import { SITE_CONFIG } from "@/lib/constants";

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || "");
}

const FROM_EMAIL = "FIFOR <onboarding@resend.dev>";
const ADMIN_EMAIL = "carrollvelasco@gmail.com";

function formatPrice(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

export function buildCustomerEmailHtml(order: OrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #E8E0D6;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="width:50px;vertical-align:middle;">
                <img src="${item.image || "https://placehold.co/50x60/F5F0EB/D4C5A9?text=..."}" alt="${item.name}" width="50" height="60" style="border-radius:4px;object-fit:cover;display:block;">
              </td>
              <td style="padding-left:12px;vertical-align:middle;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#1A1A1A;">${item.name}</p>
                <p style="margin:4px 0 0;font-size:12px;color:#888;">
                  ${item.color ? `Color: ${item.color}` : ""}${item.color && item.size ? " | " : ""}${item.size ? `Talla: ${item.size}` : ""}
                </p>
              </td>
              <td style="text-align:right;vertical-align:middle;white-space:nowrap;">
                <p style="margin:0;font-size:14px;color:#1A1A1A;">${formatPrice(item.unitPrice)}</p>
                <p style="margin:2px 0 0;font-size:12px;color:#888;">Cant: ${item.quantity}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`,
    )
    .join("");

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
                    <div style="width:56px;height:56px;border-radius:50%;background:#A8D5BA/20;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
                      <span style="font-size:28px;">📝</span>
                    </div>
                    <h2 style="margin:0;font-size:22px;font-weight:700;color:#2D5A3D;">Hemos recibido tu pedido</h2>
                    <p style="margin:8px 0 0;font-size:14px;color:#888;line-height:1.5;">
                      Hola <strong style="color:#1A1A1A;">${order.customer.name}</strong>, gracias por confiar en FIFOR. 
                      Tu pedido está pendiente de confirmación de pago. 
                      Te contactaremos pronto para coordinar la entrega.
                    </p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:4px;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Número de pedido</span>
                    <p style="margin:4px 0 0;font-size:14px;font-weight:700;color:#2D5A3D;">${order.id}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;border-top:1px solid #E8E0D6;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Fecha</span>
                    <p style="margin:4px 0 0;font-size:14px;color:#1A1A1A;">
                      ${new Date(order.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#1A1A1A;">Productos</h3>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${itemsHtml}
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px;">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size:13px;color:#888;">Subtotal</td>
                        <td style="font-size:13px;color:#1A1A1A;text-align:right;">${formatPrice(order.subtotal)}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#888;padding-top:4px;">Envío</td>
                        <td style="font-size:13px;color:#1A1A1A;text-align:right;padding-top:4px;">${formatPrice(order.shippingCost)}</td>
                      </tr>
                      ${order.discount > 0 ? `
                      <tr>
                        <td style="font-size:13px;color:#2D5A3D;padding-top:4px;">Descuento</td>
                        <td style="font-size:13px;color:#2D5A3D;text-align:right;padding-top:4px;">-${formatPrice(order.discount)}</td>
                      </tr>` : ""}
                      <tr>
                        <td style="padding-top:12px;border-top:2px solid #2D5A3D;font-size:15px;font-weight:700;color:#2D5A3D;">Total</td>
                        <td style="padding-top:12px;border-top:2px solid #2D5A3D;font-size:15px;font-weight:700;color:#2D5A3D;text-align:right;">${formatPrice(order.total)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:20px;margin-top:24px;">
                <tr>
                  <td style="padding-bottom:8px;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Dirección de envío</span>
                    <p style="margin:4px 0 0;font-size:13px;color:#1A1A1A;">${order.shipping.address}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#888;">${order.shipping.city}</p>
                    ${order.shipping.observations ? `<p style="margin:2px 0 0;font-size:13px;color:#888;">Obs: ${order.shipping.observations}</p>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;border-top:1px solid #E8E0D6;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Estado del pedido</span>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#D4A017;">Pendiente de pago</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;">
                <tr>
                  <td style="text-align:center;padding-bottom:12px;">
                    <a href="${SITE_CONFIG.url}/pedido/${order.id}" style="display:inline-block;padding:14px 36px;background:#2D5A3D;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:4px;">
                      Ver mi pedido
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <a href="https://wa.me/${SITE_CONFIG.whatsapp}?text=Hola.%20Quisiera%20recibir%20informaci%C3%B3n%20sobre%20mi%20pedido%20${order.id}." style="display:inline-block;padding:14px 36px;background:#25D366;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:4px;">
                      Contactar por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:32px;padding-top:24px;border-top:1px solid #E8E0D6;">
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0;font-size:12px;color:#888;">
                      FIFOR &bull; ${SITE_CONFIG.email} &bull; ${SITE_CONFIG.phone}
                    </p>
                    <p style="margin:4px 0 0;font-size:11px;color:#aaa;">
                      Si tienes alguna duda, responde a este correo o escríbenos a nuestro WhatsApp.
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

export function buildAdminEmailHtml(order: OrderData): string {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #E8E0D6;font-size:13px;color:#1A1A1A;">${item.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #E8E0D6;font-size:13px;color:#1A1A1A;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #E8E0D6;font-size:13px;color:#1A1A1A;text-align:center;">${item.size || "-"}</td>
        <td style="padding:8px 0;border-bottom:1px solid #E8E0D6;font-size:13px;color:#1A1A1A;text-align:right;">${formatPrice(item.unitPrice)}</td>
      </tr>`,
    )
    .join("");

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
              <h1 style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">🛒 Nuevo pedido recibido</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:6px;">
                    <span style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Pedido</span>
                    <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#2D5A3D;">${order.id}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;border-top:1px solid #E8E0D6;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size:13px;color:#888;">Fecha</td>
                        <td style="font-size:13px;color:#1A1A1A;text-align:right;">
                          ${new Date(order.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#888;padding-top:4px;">Hora</td>
                        <td style="font-size:13px;color:#1A1A1A;text-align:right;padding-top:4px;">
                          ${new Date(order.date).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1A1A1A;">Datos del cliente</h3>
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Nombre</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.customer.name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Correo</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.customer.email}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Teléfono</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.customer.phone}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Dirección</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.shipping.address}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Ciudad</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.shipping.city}</td>
                </tr>
                ${order.shipping.observations ? `
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Observaciones</td>
                  <td style="font-size:13px;color:#1A1A1A;padding-bottom:4px;text-align:right;">${order.shipping.observations}</td>
                </tr>` : ""}
                <tr>
                  <td style="font-size:13px;color:#888;">Estado</td>
                  <td style="font-size:13px;color:#D4A017;text-align:right;font-weight:600;">Pendiente de pago</td>
                </tr>
              </table>

              <h3 style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1A1A1A;">Productos</h3>
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
                <thead>
                  <tr>
                    <th style="padding:8px 0;border-bottom:2px solid #2D5A3D;font-size:11px;color:#2D5A3D;text-transform:uppercase;letter-spacing:1px;text-align:left;">Producto</th>
                    <th style="padding:8px 0;border-bottom:2px solid #2D5A3D;font-size:11px;color:#2D5A3D;text-transform:uppercase;letter-spacing:1px;text-align:center;">Cant</th>
                    <th style="padding:8px 0;border-bottom:2px solid #2D5A3D;font-size:11px;color:#2D5A3D;text-transform:uppercase;letter-spacing:1px;text-align:center;">Talla</th>
                    <th style="padding:8px 0;border-bottom:2px solid #2D5A3D;font-size:11px;color:#2D5A3D;text-transform:uppercase;letter-spacing:1px;text-align:right;">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F4;border-radius:6px;padding:16px;">
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Subtotal</td>
                  <td style="font-size:13px;color:#1A1A1A;text-align:right;padding-bottom:4px;">${formatPrice(order.subtotal)}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding-bottom:4px;">Envío</td>
                  <td style="font-size:13px;color:#1A1A1A;text-align:right;padding-bottom:4px;">${formatPrice(order.shippingCost)}</td>
                </tr>
                ${order.discount > 0 ? `
                <tr>
                  <td style="font-size:13px;color:#2D5A3D;padding-bottom:4px;">Descuento</td>
                  <td style="font-size:13px;color:#2D5A3D;text-align:right;padding-bottom:4px;">-${formatPrice(order.discount)}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding-top:8px;border-top:2px solid #2D5A3D;font-size:14px;font-weight:700;color:#2D5A3D;">Total</td>
                  <td style="padding-top:8px;border-top:2px solid #2D5A3D;font-size:14px;font-weight:700;color:#2D5A3D;text-align:right;">${formatPrice(order.total)}</td>
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

export async function sendCustomerConfirmation(order: OrderData): Promise<void> {
  try {
    const html = buildCustomerEmailHtml(order);
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: order.customer.email,
      subject: "✅ Hemos recibido tu pedido - FIFOR",
      html,
    });
    console.log("✔ Correo enviado al cliente.");
  } catch (error) {
    console.error("❌ Error enviando correo al cliente:", error);
  }
}

export async function sendAdminNotification(order: OrderData): Promise<void> {
  try {
    const html = buildAdminEmailHtml(order);
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "🛒 Nuevo pedido recibido - FIFOR",
      html,
    });
    console.log("✔ Correo enviado al administrador.");
  } catch (error) {
    console.error("❌ Error enviando correo al administrador:", error);
  }
}

export async function sendOrderEmails(order: OrderData): Promise<void> {
  await Promise.all([sendCustomerConfirmation(order), sendAdminNotification(order)]);
}
