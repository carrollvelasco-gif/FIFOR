interface GarmentSVGProps {
  type: "camiseta" | "gorra";
  color: string;
  className?: string;
}

export function CamisetaSVG({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 500" fill="none" className={className}>
      <path
        d="M120 80L80 100L40 140L60 180L100 160L100 420C100 440 120 460 140 460H260C280 460 300 440 300 420V160L340 180L360 140L320 100L280 80L260 100H140L120 80Z"
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
      />
      <path
        d="M140 100L160 140H240L260 100"
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
      />
    </svg>
  );
}

export function GorraSVG({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 350" fill="none" className={className}>
      <path
        d="M80 200C80 160 120 100 200 100C280 100 320 160 320 200V220H80V200Z"
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
      />
      <path
        d="M80 220H320L340 260C340 260 280 240 200 240C120 240 60 260 60 260L80 220Z"
        fill={color}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
      />
      <path
        d="M200 100C200 60 220 40 240 40"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="4"
        fill="none"
      />
      <ellipse cx="200" cy="100" rx="100" ry="20" fill={color} stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
    </svg>
  );
}

export function GarmentSVG({ type, color, className }: GarmentSVGProps) {
  if (type === "gorra") return <GorraSVG color={color} className={className} />;
  return <CamisetaSVG color={color} className={className} />;
}

export const GARMENT_COLORS = [
  { name: "Blanco", value: "#FFFFFF", border: "#E5E7EB" },
  { name: "Negro", value: "#1A1A1A", border: "#1A1A1A" },
  { name: "Verde Menta", value: "#A8D5BA", border: "#8FC4A6" },
  { name: "Verde Oscuro", value: "#2D5A3D", border: "#1E3D29" },
  { name: "Beige", value: "#F5F0EB", border: "#D4C5A9" },
  { name: "Gris", value: "#D1D5DB", border: "#9CA3AF" },
  { name: "Azul Marino", value: "#1E3A5F", border: "#152A45" },
  { name: "Rosa Claro", value: "#F9E8E8", border: "#E8C4C4" },
];

export const GARMENT_TYPES = [
  { id: "camiseta" as const, label: "Camiseta", basePrice: 49900 },
  { id: "gorra" as const, label: "Gorra", basePrice: 39900 },
];

export const SIZES = {
  camiseta: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  gorra: ["Talla Única"],
};

export const FONTS = [
  { name: "Nunito", value: "'Nunito', sans-serif", label: "Nunito" },
  { name: "Arial", value: "Arial, sans-serif", label: "Arial" },
  { name: "Georgia", value: "Georgia, serif", label: "Georgia" },
  { name: "Courier New", value: "'Courier New', monospace", label: "Courier New" },
  { name: "Impact", value: "Impact, sans-serif", label: "Impact" },
  { name: "Comic Sans MS", value: "'Comic Sans MS', cursive", label: "Comic Sans" },
];
