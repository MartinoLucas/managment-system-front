"use client";

import { motion } from "framer-motion";
import { PageWrapper } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageWrapper className="justify-center items-center px-6">
      <section className="w-full max-w-5xl">
        {/* Badge superior */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6"
        >
          <span className="bg-white/50 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-sm">
            Building OS v1.0.26
          </span>
        </motion.div>

        {/* Hero Principal */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-zinc-950">
            Gestión <br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-600">
              Transparente
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
            Administración de consorcios con trazabilidad total en tiempo real. 
            Sin secretos, solo datos.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button asChild size="lg" className="rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 h-14 px-10 font-black uppercase italic tracking-tighter text-lg shadow-2xl shadow-zinc-950/20">
            <Link href="/auth/login">
              Ingresar al Sistema <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl border-white/40 bg-white/40 backdrop-blur-md h-14 px-10 font-black uppercase italic tracking-tighter text-lg hover:bg-white/60">
            Ver Demo Pública
          </Button>
        </div>

        {/* Features Grid - ADN Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <FeatureCard 
            icon={<ShieldCheck className="text-primary" />}
            title="Seguridad JWT"
            desc="Acceso encriptado y roles definidos."
          />
          <FeatureCard 
            icon={<BarChart3 className="text-primary" />}
            title="Gastos Claros"
            desc="Visualización de facturas y pagos."
          />
          <FeatureCard 
            icon={<Zap className="text-primary" />}
            title="Real-Time"
            desc="Sincronización instantánea con Java."
          />
        </div>
      </section>
    </PageWrapper>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-5xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <div className="bg-zinc-950 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase italic tracking-tighter text-zinc-950">
        {title}
      </h3>
      <p className="mt-2 text-xs font-medium text-zinc-500 leading-relaxed uppercase tracking-wider">
        {desc}
      </p>
    </div>
  );
}