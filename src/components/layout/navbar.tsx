"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  Package,
  Palette,
  MapPin,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { useUserStore } from "@/store/user-store";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ACCOUNT_MENU = [
  { label: "Mi perfil", href: "/mi-cuenta/perfil", icon: User },
  { label: "Mis pedidos", href: "/mi-cuenta/pedidos", icon: Package },
  { label: "Mis diseños", href: "/mi-cuenta/disenos", icon: Palette },
  { label: "Direcciones", href: "/mi-cuenta/direcciones", icon: MapPin },
  { label: "Favoritos", href: "/mi-cuenta/favoritos", icon: Heart },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { data: session, status } = useSession();
  const { user, logout } = useUserStore();
  const activeUser = session?.user || user;
  const {
    isMobileMenuOpen,
    openSearch,
    toggleCart,
    toggleMobileMenu,
    closeMobileMenu,
  } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    nextAuthSignOut({ redirect: false });
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={toggleMobileMenu}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <span className="text-2xl md:text-3xl font-bold tracking-tight text-[#2D5A3D]">
              FIFOR
            </span>

          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-[#2D5A3D] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A8D5BA] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={openSearch}
              className="p-2 hover:text-[#2D5A3D] transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {user ? (
              <div className="relative hidden sm:block" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1.5 p-1.5 pr-2 hover:text-[#2D5A3D] transition-colors rounded-sm hover:bg-[#F5F0EB]/50"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2D5A3D] text-white text-xs font-semibold flex items-center justify-center overflow-hidden">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      activeUser?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="text-sm font-medium max-w-[90px] truncate">
                    {activeUser?.name || "Usuario"}
                  </span>
                  <ChevronDown size={14} className={cn("transition-transform", menuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#F5F0EB] rounded-sm shadow-lg py-1"
                    >
                      {ACCOUNT_MENU.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-[#F5F0EB]/50 transition-colors"
                        >
                          <item.icon size={16} className="text-muted-foreground" />
                          {item.label}
                        </Link>
                      ))}
                      <hr className="my-1 border-[#F5F0EB]" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/mi-cuenta"
                className="hidden sm:block p-2 hover:text-[#2D5A3D] transition-colors"
                aria-label="Mi cuenta"
              >
                <User size={20} />
              </Link>
            )}

            <button
              onClick={toggleCart}
              className="p-2 hover:text-[#2D5A3D] transition-colors relative"
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2D5A3D] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-lg overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3 px-2 text-sm font-medium hover:text-[#2D5A3D] hover:bg-[#F5F0EB] rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-2 border-[#F5F0EB]" />
            {activeUser ? (
                <>
                  <div className="flex items-center gap-2 py-3 px-2 text-sm font-medium text-foreground">
                    <div className="w-7 h-7 rounded-full bg-[#2D5A3D] text-white text-xs font-semibold flex items-center justify-center overflow-hidden">
                      {session?.user?.image ? (
                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        activeUser?.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                    {activeUser?.name || "Usuario"}
                  </div>
                  {ACCOUNT_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 py-2.5 px-2 pl-11 text-sm text-muted-foreground hover:text-[#2D5A3D] hover:bg-[#F5F0EB] rounded-md transition-colors"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => { handleLogout(); closeMobileMenu(); }}
                    className="flex items-center gap-2 w-full py-2.5 px-2 pl-11 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/mi-cuenta"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 py-3 px-2 text-sm font-medium hover:text-[#2D5A3D] hover:bg-[#F5F0EB] rounded-md transition-colors"
                >
                  <User size={18} /> Iniciar sesión
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
