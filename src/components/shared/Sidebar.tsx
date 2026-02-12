"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, ReceiptText, Users, 
  MessageSquare, Settings, LogOut, Building2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ReceiptText, label: "Expensas", href: "/dashboard/expenses" },
  { icon: Users, label: "Vecinos", href: "/dashboard/neighbors" },
  { icon: MessageSquare, label: "Mensajes", href: "/dashboard/communication" },
  { icon: Settings, label: "Ajustes", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth(); // Asumiendo que tienes un hook de autenticación para obtener roles

  return (
    <div className="w-64 bg-zinc-950 h-screen flex flex-col p-6 text-white border-r border-white/5 sticky top-0 z-50">
      {/* Brand - Más refinado */}
      <div className="flex items-center gap-3 mb-12 px-2 group cursor-default">
        <div className="bg-primary p-2 rounded-xl rotate-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:rotate-0 transition-transform duration-500">
          <Building2 size={22} className="text-zinc-950" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold uppercase italic tracking-tighter text-xl leading-none">
            Transparency
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-primary/80">
            Management
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          if (item.href === "/dashboard/neighbors" && !isAdmin) return null;
          return (
              <Link key={item.href} href={item.href} className="block">
                <div className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 group",
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon size={18} className={cn("relative z-10 transition-colors", isActive ? "text-primary" : "group-hover:text-zinc-200")} />
                  <span className="relative z-10 font-bold uppercase italic tracking-tight text-[13px]">
                    {item.label}
                  </span>
                </div>
              </Link>
          );
        })}
      </nav>

      {/* Logout con estilo minimalista */}
      <button 
        onClick={() => logout()}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group mt-auto"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase italic tracking-tight text-[13px]">Logout</span>
      </button>
    </div>
  );
}