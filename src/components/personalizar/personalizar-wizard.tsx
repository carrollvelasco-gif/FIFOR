"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  X,
  Type,
  Image as ImageIcon,
  Sliders,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore, type DesignConfig } from "@/store/cart-store";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";
import {
  GarmentSVG,
  GARMENT_COLORS,
  GARMENT_TYPES,
  SIZES,
  FONTS,
} from "@/components/personalizar/garment-svg";

interface DesignState {
  productType: "camiseta" | "gorra" | null;
  color: string;
  size: string | null;
  quantity: number;
  image: string | null;
  imageX: number;
  imageY: number;
  imageScale: number;
  imageRotation: number;
  text: string;
  textX: number;
  textY: number;
  textFont: string;
  textSize: number;
  textColor: string;
}

const STEPS = [
  { id: "tipo", label: "Tipo de prenda", icon: Sliders },
  { id: "color", label: "Color", icon: Sliders },
  { id: "talla", label: "Talla y cantidad", icon: Sliders },
  { id: "diseno", label: "Diseño", icon: ImageIcon },
  { id: "texto", label: "Texto", icon: Type },
  { id: "resumen", label: "Resumen", icon: Check },
];

export function PersonalizarWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [design, setDesign] = useState<DesignState>({
    productType: null,
    color: "#FFFFFF",
    size: null,
    quantity: 1,
    image: null,
    imageX: 50,
    imageY: 45,
    imageScale: 1,
    imageRotation: 0,
    text: "",
    textX: 50,
    textY: 50,
    textFont: "'Nunito', sans-serif",
    textSize: 24,
    textColor: "#2D5A3D",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isTextDragging, setIsTextDragging] = useState(false);
  const [textDragOffset, setTextDragOffset] = useState({ x: 0, y: 0 });
  const IMAGE_BOUNDS = { minX: 20, maxX: 80, minY: 25, maxY: 60 };
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const restoreId = searchParams.get("restore");
  useEffect(() => {
    if (!restoreId) return;
    const cart = useCartStore.getState();
    const item = cart.items.find((i) => i.id === restoreId);
    if (!item?.designConfig) return;
    const cfg = item.designConfig;
    setDesign({
      productType: cfg.productType,
      color: cfg.color,
      size: item.size,
      quantity: item.quantity,
      image: item.image,
      imageX: cfg.imageX,
      imageY: cfg.imageY,
      imageScale: cfg.imageScale,
      imageRotation: cfg.imageRotation,
      text: cfg.text,
      textX: cfg.textX,
      textY: cfg.textY,
      textFont: cfg.textFont,
      textSize: cfg.textSize,
      textColor: cfg.textColor,
    });
    setStep(5);
    router.replace("/personalizar", { scroll: false });
  }, [restoreId, router]);

  const currentType = GARMENT_TYPES.find((t) => t.id === design.productType);
  const customizationPrice = design.image ? 15000 : 0;
  const textPrice = design.text ? 10000 : 0;
  const totalPrice = (currentType?.basePrice || 0) + customizationPrice + textPrice;

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return design.productType !== null;
      case 1: return true;
      case 2: return design.size !== null;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      default: return true;
    }
  }, [step, design]);

  const handleNext = () => {
    if (!canProceed()) {
      toast.error("Completa este paso para continuar");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDesign((d) => ({ ...d, image: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!design.image || !previewRef.current) return;
    setIsDragging(true);
    const rect = previewRef.current.getBoundingClientRect();
    const clickPctX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickPctY = ((e.clientY - rect.top) / rect.height) * 100;
    setDragOffset({ x: clickPctX - design.imageX, y: clickPctY - design.imageY });
  };

  const handleTextMouseDown = (e: React.MouseEvent) => {
    if (!design.text || !previewRef.current) return;
    e.stopPropagation();
    setIsTextDragging(true);
    const rect = previewRef.current.getBoundingClientRect();
    const clickPctX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickPctY = ((e.clientY - rect.top) / rect.height) * 100;
    setTextDragOffset({ x: clickPctX - design.textX, y: clickPctY - design.textY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const mousePctX = ((e.clientX - rect.left) / rect.width) * 100;
    const mousePctY = ((e.clientY - rect.top) / rect.height) * 100;

    if (isDragging && design.image) {
      setDesign((d) => ({
        ...d,
        imageX: Math.max(IMAGE_BOUNDS.minX, Math.min(IMAGE_BOUNDS.maxX, mousePctX - dragOffset.x)),
        imageY: Math.max(IMAGE_BOUNDS.minY, Math.min(IMAGE_BOUNDS.maxY, mousePctY - dragOffset.y)),
      }));
    }

    if (isTextDragging && design.text) {
      setDesign((d) => ({
        ...d,
        textX: mousePctX - textDragOffset.x,
        textY: mousePctY - textDragOffset.y,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsTextDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleAddToCart = () => {
    if (!design.productType || !design.size) return;

    const itemName = `${currentType?.label} personalizada${design.text ? ` - "${design.text}"` : ""}`;

    addItem({
      id: generateId(),
      productId: `custom-${design.productType}-${Date.now()}`,
      name: itemName,
      slug: "personalizada",
      image: design.image || "/placeholder.svg",
      price: totalPrice,
      quantity: design.quantity,
      size: design.size,
      color: GARMENT_COLORS.find((c) => c.value === design.color)?.name || "",
      designConfig: {
        productType: design.productType,
        color: design.color,
        imageX: design.imageX,
        imageY: design.imageY,
        imageScale: design.imageScale,
        imageRotation: design.imageRotation,
        text: design.text,
        textX: design.textX,
        textY: design.textY,
        textFont: design.textFont,
        textSize: design.textSize,
        textColor: design.textColor,
      },
    });

    toast.success("¡Prenda personalizada agregada!", {
      description: `${itemName} x${design.quantity} - ${formatPrice(totalPrice * design.quantity)}`,
    });
  };

  const garmentPreview = (
    <div
      ref={previewRef}
      className="relative w-full max-w-xs mx-auto aspect-[4/5] bg-[#F5F0EB] rounded-sm overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {design.productType && (
        <GarmentSVG
          type={design.productType}
          color={design.color}
          className="w-full h-full"
        />
      )}

      {design.image && (
        <div
          className="absolute cursor-move"
          style={{
            left: `${design.imageX}%`,
            top: `${design.imageY}%`,
            transform: `translate(-50%, -50%) scale(${design.imageScale}) rotate(${design.imageRotation}deg)`,
            width: "40%",
            height: "auto",
          }}
        >
          <img
            src={design.image}
            alt="Diseño"
            className="w-full h-auto object-contain pointer-events-none rounded-sm shadow-sm"
            draggable={false}
          />
        </div>
      )}

      {design.text && (
        <div
          className="absolute cursor-move text-center"
          style={{
            left: `${design.textX}%`,
            top: `${design.textY}%`,
            transform: `translate(-50%, -50%)`,
            fontFamily: design.textFont,
            fontSize: `${design.textSize}px`,
            color: design.textColor,
            lineHeight: 1.2,
            maxWidth: "60%",
            textShadow:
              design.color === "#1A1A1A" || design.color === "#2D5A3D" || design.color === "#1E3A5F"
                ? "0 1px 3px rgba(255,255,255,0.3)"
                : "none",
          }}
          onMouseDown={handleTextMouseDown}
        >
          {design.text}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Personalización
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D5A3D] mt-2">
            Diseña tu prenda
          </h1>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Elige, personaliza y crea una prenda única
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap",
                    i === step
                      ? "bg-[#2D5A3D] text-white"
                      : i < step
                        ? "bg-[#A8D5BA]/30 text-[#2D5A3D] cursor-pointer"
                        : "bg-[#F5F0EB] text-muted-foreground"
                  )}
                >
                  {i < step ? <Check size={12} /> : <s.icon size={12} />}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-4 md:w-8 h-[1px] mx-1",
                      i < step ? "bg-[#A8D5BA]" : "bg-[#F5F0EB]"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            {step < 5 && garmentPreview}
            {step === 5 && (
              <div className="sticky top-32">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A8D5BA] font-semibold mb-3">
                  Vista previa del diseño
                </p>
                {garmentPreview}
              </div>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#2D5A3D]">
                      ¿Qué prenda quieres personalizar?
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {GARMENT_TYPES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setDesign((d) => ({ ...d, productType: t.id, size: null }))}
                          className={cn(
                            "relative p-6 rounded-sm border-2 transition-all text-center",
                            design.productType === t.id
                              ? "border-[#2D5A3D] bg-[#F5F0EB]"
                              : "border-border hover:border-[#A8D5BA]"
                          )}
                        >
                          <GarmentSVG
                            type={t.id}
                            color="#D4C5A9"
                            className="w-24 h-28 mx-auto mb-3"
                          />
                          <p className="font-semibold text-sm">{t.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Desde {formatPrice(t.basePrice)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#2D5A3D]">
                      Elige el color
                    </h2>
                    <div className="grid grid-cols-4 gap-3">
                      {GARMENT_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setDesign((d) => ({ ...d, color: c.value }))}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            className={cn(
                              "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all",
                              design.color === c.value
                                ? "border-[#2D5A3D] scale-110"
                                : "border-transparent hover:scale-105"
                            )}
                            style={{ backgroundColor: c.value, borderColor: design.color === c.value ? "#2D5A3D" : c.border }}
                          />
                          <span className="text-[10px] text-muted-foreground text-center leading-tight">
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#2D5A3D]">
                      Talla y cantidad
                    </h2>
                    {design.productType && (
                      <>
                        <p className="text-sm text-muted-foreground">Talla</p>
                        <div className="flex flex-wrap gap-2">
                          {SIZES[design.productType].map((s) => (
                            <button
                              key={s}
                              onClick={() => setDesign((d) => ({ ...d, size: s }))}
                              className={cn(
                                "h-10 px-4 text-sm font-medium rounded-sm border transition-all",
                                design.size === s
                                  ? "bg-[#2D5A3D] text-white border-[#2D5A3D]"
                                  : "bg-white text-foreground border-border hover:border-[#2D5A3D]"
                              )}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="mt-6">
                          <p className="text-sm text-muted-foreground mb-2">Cantidad</p>
                          <div className="inline-flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => setDesign((d) => ({ ...d, quantity: Math.max(1, d.quantity - 1) }))}
                              className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
                              {design.quantity}
                            </span>
                            <button
                              onClick={() => setDesign((d) => ({ ...d, quantity: d.quantity + 1 }))}
                              className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#2D5A3D]">
                      Agrega una imagen
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Sube una imagen para personalizar tu prenda (opcional)
                    </p>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#D4C5A9] rounded-sm p-8 text-center cursor-pointer hover:border-[#A8D5BA] transition-colors"
                    >
                      {design.image ? (
                        <div className="relative w-24 h-24 mx-auto">
                          <img
                            src={design.image}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-sm"
                          />
                        </div>
                      ) : (
                        <Upload size={32} className="mx-auto text-[#D4C5A9]" />
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {design.image ? "Haz clic para cambiar imagen" : "Haz clic para subir imagen"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG • Máx 5MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />

                    {design.image && (
                      <div className="space-y-3 p-4 bg-[#F5F0EB] rounded-sm">
                        <p className="text-xs font-semibold text-foreground">
                          Ajustes de la imagen
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setDesign((d) => ({ ...d, imageScale: Math.min(3, d.imageScale + 0.1) }))}
                            className="flex items-center gap-1 text-xs hover:text-[#2D5A3D] transition-colors"
                          >
                            <ZoomIn size={14} /> Zoom +
                          </button>
                          <button
                            onClick={() => setDesign((d) => ({ ...d, imageScale: Math.max(0.3, d.imageScale - 0.1) }))}
                            className="flex items-center gap-1 text-xs hover:text-[#2D5A3D] transition-colors"
                          >
                            <ZoomOut size={14} /> Zoom -
                          </button>
                          <button
                            onClick={() => setDesign((d) => ({ ...d, imageRotation: d.imageRotation + 15 }))}
                            className="flex items-center gap-1 text-xs hover:text-[#2D5A3D] transition-colors"
                          >
                            <RotateCw size={14} /> Rotar
                          </button>
                          <button
                            onClick={() => setDesign((d) => ({ ...d, image: null }))}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            <X size={14} /> Quitar
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Arrastra la imagen sobre la prenda para posicionarla
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#2D5A3D]">
                      Agrega texto personalizado
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Escribe un texto para personalizar tu prenda (opcional)
                    </p>

                    <input
                      type="text"
                      value={design.text}
                      onChange={(e) => setDesign((d) => ({ ...d, text: e.target.value }))}
                      placeholder="Ej: Mi nombre, una frase..."
                      className="w-full h-11 px-4 text-sm border border-border rounded-sm focus:outline-none focus:border-[#2D5A3D] transition-colors"
                      maxLength={30}
                    />

                    {design.text && (
                      <div className="space-y-3 p-4 bg-[#F5F0EB] rounded-sm">
                        <p className="text-xs font-semibold text-foreground">
                          Opciones de texto
                        </p>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Fuente</p>
                          <div className="flex flex-wrap gap-1">
                            {FONTS.map((f) => (
                              <button
                                key={f.name}
                                onClick={() => setDesign((d) => ({ ...d, textFont: f.value }))}
                                className={cn(
                                  "px-3 py-1 text-xs rounded-sm border transition-all",
                                  design.textFont === f.value
                                    ? "bg-[#2D5A3D] text-white border-[#2D5A3D]"
                                    : "bg-white border-border hover:border-[#2D5A3D]"
                                )}
                                style={{ fontFamily: f.value }}
                              >
                                {f.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tamaño</p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setDesign((d) => ({ ...d, textSize: Math.max(12, d.textSize - 2) }))}
                                className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-white"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-medium">
                                {design.textSize}
                              </span>
                              <button
                                onClick={() => setDesign((d) => ({ ...d, textSize: Math.min(60, d.textSize + 2) }))}
                                className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-white"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Color</p>
                            <div className="flex gap-1">
                              {["#2D5A3D", "#1A1A1A", "#FFFFFF", "#A8D5BA", "#D4C5A9", "#1E3A5F", "#E84A4A"].map(
                                (c) => (
                                  <button
                                    key={c}
                                    onClick={() => setDesign((d) => ({ ...d, textColor: c }))}
                                    className={cn(
                                      "w-7 h-7 rounded-full border-2 transition-all",
                                      design.textColor === c ? "border-[#2D5A3D] scale-110" : "border-transparent"
                                    )}
                                    style={{ backgroundColor: c }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-[#2D5A3D]">
                        Resumen de tu diseño
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Revisa los detalles antes de agregar al carrito
                      </p>
                    </div>

                    <div className="bg-[#F5F0EB]/50 rounded-sm p-5 space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                        <span className="text-muted-foreground">Prenda</span>
                        <span className="font-medium">{currentType?.label}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                        <span className="text-muted-foreground">Color</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: design.color }}
                          />
                          <span className="font-medium">
                            {GARMENT_COLORS.find((c) => c.value === design.color)?.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                        <span className="text-muted-foreground">Talla</span>
                        <span className="font-medium">{design.size}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                        <span className="text-muted-foreground">Cantidad</span>
                        <span className="font-medium">{design.quantity}</span>
                      </div>
                      {design.image && (
                        <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                          <span className="text-muted-foreground">Imagen personalizada</span>
                          <span className="font-medium text-[#2D5A3D]">+$15,000</span>
                        </div>
                      )}
                      {design.text && (
                        <div className="flex justify-between py-2 border-b border-[#D4C5A9]/30">
                          <span className="text-muted-foreground">Texto personalizado</span>
                          <span className="font-medium text-[#2D5A3D]">+$10,000</span>
                        </div>
                      )}
                      <div className="flex justify-between py-3">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="text-xl font-bold text-[#2D5A3D]">
                          {formatPrice(totalPrice * design.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!design.productType || !design.size}
                      className="w-full h-14 flex items-center justify-center gap-2 text-base font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-none disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                    >
                      <ShoppingBag size={20} />
                      Agregar al carrito — {formatPrice(totalPrice * design.quantity)}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-2">
                      <Check size={14} className="text-[#A8D5BA]" />
                      Envíos a toda Colombia
                      <span className="mx-2">•</span>
                      <Check size={14} className="text-[#A8D5BA]" />
                      Pago seguro
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#F5F0EB]">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-[#2D5A3D] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-sm font-medium bg-[#2D5A3D] text-white px-6 h-10 hover:bg-[#1E3D29] transition-colors rounded-none disabled:bg-muted disabled:text-muted-foreground"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
