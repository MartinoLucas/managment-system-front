"use client";

import { useEffect, useState } from "react";
import { PageWrapper, DataTable } from "@/components/shared";
import { ColumnDef } from "@/components/shared/DataTable";
import { adminService, PendingUser } from "@/features/admin/services/admin-service";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function NeighborsPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingUsers();
      setUsers(data || []);
    } catch (err) {
      // Error manejado por interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    try {
      if (action === 'approve') {
        await adminService.approveUser(id, 'OWNER'); // Por defecto Propietario
        toast.success("USUARIO APROBADO", { description: "Ahora puede acceder al sistema." });
      } else {
        await adminService.rejectUser(id);
        toast.error("SOLICITUD RECHAZADA");
      }
      fetchPending();
    } catch (e) {}
  };

  const columns: ColumnDef<PendingUser>[] = [
    {
      id: "name",
      header: "Vecino",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-zinc-950 uppercase italic tracking-tight">
            {row.firstName} {row.lastName}
          </span>
          <span className="text-[10px] text-zinc-400 font-medium tracking-wider">{row.email}</span>
        </div>
      )
    },
    {
      id: "status",
      header: "Estado",
      cell: () => (
        <span className="text-[8px] font-black bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-tighter">
          Pendiente
        </span>
      )
    },
    {
      id: "actions",
      header: "Acciones",
      align: "right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="rounded-xl hover:bg-red-50 text-red-500"
            onClick={() => handleAction(row.id, 'reject')}
          >
            <UserX size={16} />
          </Button>
          <Button 
            size="sm" 
            className="rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 font-bold italic uppercase text-[10px] tracking-tighter px-4"
            onClick={() => handleAction(row.id, 'approve')}
          >
            <UserCheck size={14} className="mr-2 text-primary" /> Aprobar
          </Button>
        </div>
      )
    }
  ];

  useEffect(() => { fetchPending(); }, []);

  return (
    <PageWrapper isLoading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 bg-zinc-950 rounded-5xl text-white relative overflow-hidden group">
            <ShieldAlert size={100} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Seguridad</p>
            <h2 className="text-4xl font-extrabold uppercase italic tracking-tighter leading-none">
              Aprobación <br /> de Cuentas
            </h2>
            <p className="mt-4 text-[11px] font-medium text-zinc-400 uppercase tracking-widest max-w-50">
              Validá la identidad de los vecinos antes de dar acceso.
            </p>
        </div>
      </div>

      <DataTable 
        title="Solicitudes de Acceso" 
        description="Usuarios que se registraron y esperan validación de la administración."
        columns={columns}
        data={users}
        searchAccessor={(row) => `${row.firstName} ${row.lastName}`}
      />
    </PageWrapper>
  );
}