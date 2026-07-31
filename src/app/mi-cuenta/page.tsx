"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { toast } from "sonner";

type Tab = "login" | "register";

function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center justify-center gap-3 w-full h-12 text-sm font-medium border border-[#D4C5A9] bg-white hover:bg-[#F5F0EB]/50 transition-colors rounded-sm"
    >
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Continuar con Google
    </button>
  );
}

function LoggedInView() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-4 overflow-hidden">
        {session?.user?.image ? (
          <img src={session.user.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <User size={32} className="text-[#2D5A3D]" />
        )}
      </div>
      <h2 className="text-xl font-bold text-[#2D5A3D]">
        {session?.user?.name || "Usuario"}
      </h2>
      <p className="text-sm text-muted-foreground mt-1">{session?.user?.email}</p>

      <div className="mt-8 space-y-3">
        <button
          onClick={() => router.push("/mi-cuenta/perfil")}
          className="w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm"
        >
          Ir a mi perfil
        </button>
        <button
          onClick={() => router.push("/mi-cuenta/pedidos")}
          className="w-full h-12 text-sm font-medium border border-[#D4C5A9] bg-white hover:bg-[#F5F0EB]/50 transition-colors rounded-sm"
        >
          Mis pedidos
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium text-red-500 border border-red-200 bg-white hover:bg-red-50 transition-colors rounded-sm"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </motion.div>
  );
}

export default function MiCuentaPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { login } = useUserStore();
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Completa todos los campos");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({
      name: loginForm.email.split("@")[0],
      lastName: "",
      email: loginForm.email,
      phone: "",
    });
    setLoading(false);
    toast.success("Inicio de sesión exitoso");
    router.push("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, lastName, email, phone, password, confirmPassword } = registerForm;
    if (!name || !lastName || !email || !phone || !password || !confirmPassword) {
      toast.error("Completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({ name, lastName, email, phone });
    setLoading(false);
    toast.success("Cuenta creada exitosamente");
    router.push("/");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24 md:py-32 px-4">
        <Loader2 size={24} className="animate-spin text-[#2D5A3D]" />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-24 md:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              Bienvenido
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
              Mi cuenta
            </h1>
          </div>
          <LoggedInView />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-24 md:py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Bienvenido
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
            Mi cuenta
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {tab === "login" ? "Inicia sesión para continuar" : "Crea tu cuenta en FIFOR"}
          </p>
        </div>

        <div className="flex bg-[#F5F0EB]/50 rounded-sm p-1 mb-8">
          {(["login", "register"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium rounded-sm transition-all duration-200",
                tab === t
                  ? "bg-white text-[#2D5A3D] shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Tu contraseña"
                    className="w-full h-12 pl-10 pr-10 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Iniciando sesión...</> : "Iniciar sesión"}
              </button>
              <button
                type="button"
                className="block w-full text-xs text-muted-foreground hover:text-[#2D5A3D] transition-colors text-center mt-2"
              >
                ¿Olvidaste tu contraseña?
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#D4C5A9]/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-muted-foreground">O continúa con</span>
                </div>
              </div>

              <GoogleSignInButton />
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleRegister}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Nombre</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      placeholder="María"
                      className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Apellidos</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      placeholder="Pérez Gómez"
                      className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Correo electrónico</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Celular</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    placeholder="300 123 4567"
                    className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Contraseña</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="Mín. 6 caracteres"
                      className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Confirmar contraseña</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      placeholder="Repite la contraseña"
                      className="w-full h-12 pl-10 pr-4 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Creando cuenta...</> : "Crear cuenta"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#D4C5A9]/30" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-muted-foreground">O continúa con</span>
                </div>
              </div>

              <GoogleSignInButton />
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
