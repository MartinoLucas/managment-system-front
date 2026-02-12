"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/shared/Sidebar";
import { UserNav } from "@/components/shared/UserNav";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans selection:bg-primary/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-zinc-200/50 sticky top-0 z-40 px-10 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 leading-none">
              Management System
            </h2>
            <p className="text-lg font-extrabold uppercase italic tracking-tighter text-zinc-950 mt-0.5">
              Control <span className="text-primary/80 font-medium">Panel</span>
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end border-r border-zinc-200 pr-6">
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Server Status</span>
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-950 uppercase tracking-tight">Active Node</span>
                </div>
            </div>
            <UserNav />
          </div>
        </header>
        
        {/* Contenedor con transición de página */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}