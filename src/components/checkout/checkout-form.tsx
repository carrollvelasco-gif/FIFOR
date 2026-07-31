"use client";

import { useState, useEffect, useRef } from "react";
import { useCheckoutStore } from "@/store/checkout-store";

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40 resize-none"
      />
    </div>
  );
}

const COLOMBIAN_CITIES = [
  "Arauca", "Armenia", "Barrancabermeja", "Barranquilla",
  "Bogot\u00E1 D.C.", "Bucaramanga", "Buenaventura", "Cali",
  "Cartagena", "C\u00FAcuta", "Florencia", "Ibagu\u00E9",
  "Manizales", "Medell\u00EDn", "Monter\u00EDa", "Neiva",
  "Pasto", "Pereira", "Popay\u00E1n", "Quibd\u00F3",
  "Riohacha", "San Andr\u00E9s", "Santa Marta", "Sincelejo",
  "Tunja", "Valledupar", "Villavicencio", "Yopal",
];

function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = COLOMBIAN_CITIES.filter((c) =>
    c.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-foreground mb-1.5">
        Ciudad <span className="text-red-400 ml-0.5">*</span>
      </label>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Ej: Medell\u00EDn"
        className="w-full h-11 px-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
      />
      {open && (
        <div className="absolute top-full left-0 w-full z-50 mt-1 border border-[#D4C5A9]/50 rounded-sm bg-white shadow-lg max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((city) => (
              <button
                key={city}
                type="button"
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#F5F0EB] ${
                  city === value ? "bg-[#F5F0EB] font-medium text-[#2D5A3D]" : ""
                }`}
                onClick={() => {
                  onChange(city);
                  setOpen(false);
                }}
              >
                {city}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              No se encontr\u00F3 la ciudad
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const { customer, shipping, setCustomer, setShipping } = useCheckoutStore();

  const [firstName, lastName] = customer.name.split(" ").reduce(
    (acc, word, i) => {
      if (i === 0) acc[0] = word;
      else acc[1] = (acc[1] ? acc[1] + " " : "") + word;
      return acc;
    },
    ["", ""] as [string, string],
  );

  const handleFirstName = (v: string) => {
    setCustomer({ ...customer, name: `${v} ${lastName}`.trim() });
  };

  const handleLastName = (v: string) => {
    setCustomer({ ...customer, name: `${firstName} ${v}`.trim() });
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-[#2D5A3D] text-white text-xs flex items-center justify-center font-medium">
            1
          </span>
          <h2 className="text-base font-semibold text-foreground">
            Información del cliente
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            value={firstName}
            onChange={handleFirstName}
            placeholder="Ej: María"
            required
          />
          <Input
            label="Apellidos"
            value={lastName}
            onChange={handleLastName}
            placeholder="Ej: Pérez García"
            required
          />
          <Input
            label="Correo electrónico"
            type="email"
            value={customer.email}
            onChange={(v) => setCustomer({ ...customer, email: v })}
            placeholder="ejemplo@correo.com"
            required
          />
          <Input
            label="Teléfono"
            type="tel"
            value={customer.phone}
            onChange={(v) => setCustomer({ ...customer, phone: v })}
            placeholder="300 123 4567"
            required
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-full bg-[#2D5A3D] text-white text-xs flex items-center justify-center font-medium">
            2
          </span>
          <h2 className="text-base font-semibold text-foreground">
            Dirección de envío
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CitySelect
            value={shipping.city}
            onChange={(v) => setShipping({ ...shipping, city: v })}
          />
          <div className="sm:col-span-2">
            <Input
              label="Dirección"
              value={shipping.address}
              onChange={(v) => setShipping({ ...shipping, address: v })}
              placeholder="Cra 1 # 2-3, Barrio Centro"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Observaciones (opcional)"
              value={shipping.observations}
              onChange={(v) => setShipping({ ...shipping, observations: v })}
              placeholder="Ej: Casa blanca, portón verde. Indicaciones adicionales para la entrega."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
