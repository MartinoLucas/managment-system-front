"use client";

import { motion } from "framer-motion";
import { PageWrapper, FormTemplate } from "@/components/shared";
import { TextField, PasswordField } from "@/components/shared";
import { loginSchema, type LoginSchemaType } from "@validations/auth.validation";
import { authService } from "@/features/auth/services/auth-service";
import { useRouter } from "next/navigation";
import { Trophy, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (values: LoginSchemaType) => {
    await authService.login(values);
    login(localStorage.getItem("auth_token")!);
    router.push("/dashboard");
  };

  return (
    <PageWrapper className="bg-zinc-100 items-center justify-center p-6">
      <div className="w-full max-w-110">
        {/* Branding Area con Animación */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-colors" />
            <div className="bg-zinc-950 p-5 rounded-4xl text-primary shadow-2xl relative z-10 rotate-3 transition-transform hover:rotate-0 duration-500">
              <Trophy size={32} strokeWidth={2.5} />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold uppercase italic tracking-[ -0.05em] text-zinc-950 mt-8 leading-[0.8] mb-2">
            Transparency <br /> 
            <span className="text-primary font-medium tracking-tighter opacity-90">Management</span>
          </h1>
          
          <div className="flex items-center gap-2 mt-4">
            <ShieldCheck size={12} className="text-zinc-400" />
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400">
              Secure Access Node v1.0
            </p>
          </div>
        </motion.div>

        {/* Formulario con Glassmorphism Refinado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FormTemplate<LoginSchemaType>
            schema={loginSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            title="Sincronizar"
            description="Ingresá tus credenciales de acceso auditado"
            submitText="Iniciar Sesión"
          >
            {({ form, isPending }) => (
              <div className="space-y-5">
                <TextField 
                  control={form.control} 
                  name="email" 
                  label="Email Institucional" 
                  placeholder="admin@edificio.com"
                  disabled={isPending}
                />
                <PasswordField 
                  control={form.control} 
                  name="password" 
                  label="Contraseña" 
                  disabled={isPending}
                />
              </div>
            )}
          </FormTemplate>
        </motion.div>

        {/* Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            ¿No tenés cuenta?{" "}
            <button className="text-zinc-950 hover:text-primary transition-colors border-b border-zinc-200 hover:border-primary pb-0.5">
              Solicitá aprobación aquí
            </button>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
}