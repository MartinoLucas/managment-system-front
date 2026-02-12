"use client";

import { useEffect, useState } from "react";
import { PageWrapper, DataTable } from "@/components/shared";
import { ColumnDef } from "@/components/shared/DataTable";
import { expenseService, ExpenseDTO } from "@/features/finance/services/expense-service";
import { Building2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CreateExpenseModal } from "@/features/finance/component/CreateExpenseModal";

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

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<ExpenseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ title: string; description: string } | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await expenseService.getAll();
      setExpenses(data || []);
    } catch (err) {        
      setError({
        title: "Sincronización Fallida",
        description: "El servicio de tesorería no responde. Verificá tu conexión."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <PageWrapper isLoading={loading} error={error} retryFunction={fetchExpenses}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Flujo de Caja" value={`$ ${total.toLocaleString('es-AR')}`} label="Mes en curso" delay={0.1} />
        <StatCard title="Transacciones" value={expenses.length.toString()} label="Operaciones auditadas" delay={0.2} />
        <StatCard title="Seguridad" value="JWT" label="Encriptación activa" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DataTable 
          title="Libro Diario" 
          description="Registro histórico de egresos validados por la administración."
          columns={columns}
          data={expenses}
          searchAccessor={(row) => row.description}
          headerActions={
            <CreateExpenseModal onRefresh={fetchExpenses} />
          }
        />
      </motion.div>
    </PageWrapper>
  );
}

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