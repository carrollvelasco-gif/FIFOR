import type { Metadata } from "next";
import { Suspense } from "react";
import { PersonalizarWizard } from "@/components/personalizar/personalizar-wizard";

export const metadata: Metadata = {
  title: "Personaliza tu prenda",
  description:
    "Diseña tu propia prenda en FIFOR. Elige tipo, color, talla, agrega imagen y texto personalizado. Crea algo único.",
};

export default function PersonalizarPage() {
  return (
    <Suspense>
      <PersonalizarWizard />
    </Suspense>
  );
}
