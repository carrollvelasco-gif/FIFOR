import Link from "next/link";
import { Music2, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = {
  tienda: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Personaliza tu camiseta", href: "/personalizar" },
    { label: "Nuevos productos", href: "/catalogo?tag=nuevo" },
    { label: "Más vendidos", href: "/catalogo?sort=popular" },
  ],
  ayuda: [
    { label: "Contacto", href: "/contacto" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Seguimiento de pedido", href: "/seguimiento" },
    { label: "Métodos de pago", href: "/politicas#pagos" },
  ],
  politicas: [
    { label: "Política de envío", href: "/politicas#envio" },
    { label: "Privacidad", href: "/politicas#privacidad" },
    { label: "Términos y condiciones", href: "/politicas#terminos" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#F5F0EB] border-t border-[#D4C5A9]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-[#2D5A3D]">
                FIFOR
              </span>

            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Moda con diseño elegante y minimalista para toda la familia. Prendas de alta
              calidad pensadas para el confort y el estilo de cada día.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#D4C5A9]/40 flex items-center justify-center hover:bg-[#A8D5BA] hover:border-[#A8D5BA] transition-colors"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#D4C5A9]/40 flex items-center justify-center hover:bg-[#A8D5BA] hover:border-[#A8D5BA] transition-colors"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#D4C5A9]/40 flex items-center justify-center hover:bg-[#A8D5BA] hover:border-[#A8D5BA] transition-colors"
                aria-label="TikTok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Tienda</h3>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Ayuda</h3>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Políticas</h3>
            <ul className="space-y-3">
              {footerLinks.politicas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D4C5A9]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-[#2D5A3D] transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{SITE_CONFIG.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span className="truncate">{SITE_CONFIG.address}</span>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} FIFOR. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
