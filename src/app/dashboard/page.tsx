"use client";

import { useEffect, useState } from "react";
import { PageWrapper, DataTable } from "@/components/shared";
import { ColumnDef } from "@/components/shared/DataTable";
import { expenseService, ExpenseDTO } from "@/features/finance/services/expense-service";
import { Building2, ArrowUpRight, Wallet, Megaphone, Info, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { CreateExpenseModal } from "@/features/finance/component/CreateExpenseModal";
import { useAuth } from "@/context/AuthContext";
import { Announcement, residentService } from "@/features/residents/services/resident-service";
import { communicationService, Post } from "@/features/communication/services/communication-service";

const columns: ColumnDef<ExpenseDTO>[] = [
  {
    id: "desc",
    header: "Concepto",
    cell: (row) => (
      <div className="flex flex-col py-1">
        <span className="font-bold text-zinc-900 uppercase italic tracking-tight text-sm">
          {row.description}
        </span>
        <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
          Ref: {row.id.toString().padStart(4, '0')}
        </span>
      </div>
    )
  },
  {
    id: "cat",
    header: "Categoría",
    cell: (row) => (
      <span className="text-[9px] font-bold bg-zinc-950 text-white px-2.5 py-1 rounded-full uppercase tracking-tighter">
        {row.category}
      </span>
    )
  },
  {
    id: "amt",
    header: "Importe",
    align: "right",
    cell: (row) => (
      <span className="font-extrabold text-lg text-zinc-950 italic tracking-tighter">
        $ {row.amount.toLocaleString("es-AR")}
      </span>
    )
  }
];

// --- VISTA ADMINISTRADOR ---
const AdminView = ({ expenses, fetchExpenses }: any) => {
  const total = expenses.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Flujo de Caja" value={`$ ${total.toLocaleString('es-AR')}`} label="Mes en curso" delay={0.1} />
        <StatCard title="Transacciones" value={expenses.length.toString()} label="Operaciones auditadas" delay={0.2} />
        <StatCard title="Seguridad" value="JWT" label="Encriptación activa" delay={0.3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DataTable 
          title="Libro Diario" 
          description="Registro histórico de egresos validados por la administración."
          columns={columns}
          data={expenses}
          searchAccessor={(row: any) => row.description}
          headerActions={<CreateExpenseModal onRefresh={fetchExpenses} />}
        />
      </motion.div>
    </>
  );
};

// --- VISTA VECINO ---
const ResidentView = ({ announcements, balance }: { announcements: Post[], balance: number }) => {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-extrabold uppercase italic tracking-tighter text-zinc-950">
          Estado de <span className="text-primary/80">Cuenta</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <motion.div whileHover={{ y: -5 }} className="p-8 bg-zinc-950 rounded-5xl text-white shadow-2xl relative overflow-hidden">
            <Wallet className="absolute -right-4 -top-4 text-white/5" size={120} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6">Saldo Pendiente</p>
            <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                ${balance.toLocaleString('es-AR')}
            </h3>
            <p className="mt-8 text-[9px] font-bold text-zinc-500 uppercase tracking-widest italic">
                Sincronizado con Tesorería
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            <Megaphone size={14} /> Comunicados
          </h2>
          
          {announcements.length > 0 ? (
            announcements.map((ann) => (
              <div key={ann.id} className="p-6 bg-white/60 backdrop-blur-xl border border-white/40 rounded-4xl flex gap-4 relative overflow-hidden group">
                {ann.content && <div className="absolute top-0 left-0 w-1 h-full bg-primary" />}
                <div className="h-10 w-10 shrink-0 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                    <Bell size={20} />
                </div>
                <div>
                    <h4 className="text-lg font-extrabold uppercase italic tracking-tight text-zinc-950">{ann.title}</h4>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-1">{ann.content}</p>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-4">{ann.createdAt}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center border-2 border-dashed border-zinc-200 rounded-4xl">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sin comunicados nuevos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function DashboardPage() {
  const { user, isAdmin } = useAuth(); // Usamos el hook que creamos

  const [expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [announcements, setAnnouncements] = useState<Post[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ title: string; description: string } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!isAdmin) {
        const data = await expenseService.getAll();
        setExpenses(data || []);
      } else {
        const posts = await communicationService.getPosts();
        setAnnouncements(posts || []);
        setBalance(0);
      }
    } catch (err) {        
      setError({
        title: "Sincronización Fallida",
        description: "No se pudo conectar con el servidor central."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin]);

  return (
    <PageWrapper isLoading={loading} error={error} retryFunction={fetchData}>
      {isAdmin ? (
        <AdminView expenses={expenses} fetchExpenses={fetchData} />
      ) : (
        <ResidentView announcements={announcements} balance={balance} />
      )}
    </PageWrapper>
  );
}

// Mantén StatCard y columns fuera del componente principal

function StatCard({ title, value, label, delay }: { title: string, value: string, label: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="p-8 bg-white/70 backdrop-blur-xl rounded-5xl border border-white/40 shadow-xl relative group overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">{title}</p>
          <ArrowUpRight size={16} className="text-zinc-300 group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-4xl font-extrabold uppercase italic tracking-tighter text-zinc-950">{value}</h3>
        <p className="mt-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700">
        <Building2 size={120} />
      </div>
    </motion.div>
  );
}