"use client";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/features/auth/services/auth-service";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function UserNav() {
  const { isAdmin, user } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 p-1 pr-3 rounded-2xl border border-zinc-200/50 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all duration-300 group outline-none">
          <Avatar className="h-9 w-9 rounded-xl border border-zinc-950/5 transition-transform group-hover:scale-95">
            <AvatarImage src="" />
            <AvatarFallback className="bg-zinc-950 text-white font-bold italic text-[10px]">
              LA
            </AvatarFallback>
          </Avatar>
          <div className="flex-col items-start hidden sm:flex">
            <span className="text-[11px] font-extrabold uppercase italic tracking-tighter text-zinc-950">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
              {isAdmin ? "Administrador" : "Usuario"}
            </span>
          </div>
          <ChevronDown size={12} className="text-zinc-400 group-hover:text-zinc-950 transition-colors" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-60 p-2 bg-white/80 backdrop-blur-2xl border-white/20 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
        align="end"
      >
        <DropdownMenuLabel className="p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <p className="text-xs font-extrabold uppercase italic tracking-tight">
                    {user.firstName} {user.lastName}
                </p>
                <ShieldCheck size={12} className="text-primary" />
            </div>
            <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-zinc-100/50 mx-2" />
        
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="rounded-xl px-4 py-2.5 focus:bg-zinc-950 focus:text-white cursor-pointer transition-colors group">
            <User className="mr-3 h-3.5 w-3.5 text-zinc-400 group-focus:text-primary transition-colors" />
            <span className="font-bold uppercase italic tracking-tight text-[11px]">Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl px-4 py-2.5 focus:bg-zinc-950 focus:text-white cursor-pointer transition-colors group">
            <Settings className="mr-3 h-3.5 w-3.5 text-zinc-400 group-focus:text-primary transition-colors" />
            <span className="font-bold uppercase italic tracking-tight text-[11px]">Ajustes</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-zinc-100/50 mx-2" />
        
        <DropdownMenuItem 
          onClick={() => authService.logout()}
          className="rounded-xl px-4 py-2.5 focus:bg-red-500 focus:text-white text-red-600 cursor-pointer transition-colors group"
        >
          <LogOut className="mr-3 h-3.5 w-3.5" />
          <span className="font-bold uppercase italic tracking-tight text-[11px]">Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}