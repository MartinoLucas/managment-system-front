"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function BrandLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative">
        {/* Glow de fondo animado */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-primary blur-3xl rounded-full"
        />

        {/* Logo Container */}
        <motion.div
          initial={{ rotate: 3 }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 bg-zinc-950 p-6 rounded-5xl shadow-2xl border border-white/10"
        >
          <Building2 size={48} className="text-primary" />
          
          {/* Línea de escaneo láser */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-primary/50 shadow-[0_0_15px_#10b981] z-20"
          />
        </motion.div>
      </div>

      {/* Texto de carga */}
      <div className="flex flex-col items-center">
        <motion.h2 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-black uppercase italic tracking-tighter text-zinc-950 leading-none"
        >
          Sincronizando <span className="text-primary">Datos</span>
        </motion.h2>
        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400 animate-pulse">
          Accediendo al nodo de tesorería
        </p>
      </div>
    </div>
  );
}