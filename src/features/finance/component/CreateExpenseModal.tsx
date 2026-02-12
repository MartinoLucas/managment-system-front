"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormTemplate, TextField, SelectField } from "@/components/shared";
import { expenseSchema, type ExpenseSchemaType } from "@/lib/validations/finance-schema";
import { expenseService } from "../services/expense-service";
import { Plus, Receipt } from "lucide-react";
import { toast } from "sonner";

export function CreateExpenseModal({ onRefresh }: { onRefresh: () => void }) {
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: ExpenseSchemaType) => {
    try {
      await expenseService.create(values);
      toast.success("GASTO REGISTRADO", {
        description: "El egreso fue auditado y guardado correctamente."
      });
      setOpen(false);
      onRefresh(); // Recarga la tabla
    } catch (e) {
      // El error ya lo maneja el FormTemplate o el apiClient
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 font-extrabold uppercase italic tracking-tighter px-6 h-12 shadow-xl shadow-zinc-950/20 transition-all active:scale-95">
          <Plus className="mr-2 h-5 w-5 text-primary" /> Nuevo Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-white/80 backdrop-blur-2xl border-white/20 rounded-5xl shadow-2xl p-0 overflow-hidden">
        <div className="p-8 bg-zinc-950 text-white flex items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-2xl border border-primary/30">
                <Receipt className="text-primary" size={24} />
            </div>
            <div>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter leading-none">
                    Registrar Egreso
                </DialogTitle>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mt-1">
                    Gestión de Tesorería v1.0
                </p>
            </div>
        </div>

        <div className="p-8">
            <FormTemplate<ExpenseSchemaType>
                schema={expenseSchema}
                defaultValues={{ description: "", amount: 0, category: "MAINTENANCE", invoiceFileUrl: "" }}
                onSubmit={onSubmit}
                title="" // Título vacío porque usamos el del Dialog
                submitText="Confirmar Gasto"
            >
                {({ form, isPending }) => (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <TextField control={form.control} name="description" label="Concepto" placeholder="Ej: Pago de Edesur Enero" />
                        </div>
                        <TextField control={form.control} name="amount" label="Monto ($)" type="number" placeholder="0.00" />
                        <SelectField 
                            control={form.control} 
                            name="category" 
                            label="Categoría"
                            options={[
                                { label: "Mantenimiento", value: "MAINTENANCE" },
                                { label: "Servicios", value: "UTILITIES" },
                                { label: "Sueldos", value: "SALARIES" },
                                { label: "Impuestos", value: "TAXES" },
                            ]}
                        />
                        <div className="col-span-2">
                             <TextField control={form.control} name="invoiceFileUrl" label="URL Comprobante (Opcional)" placeholder="https://..." />
                        </div>
                    </div>
                )}
            </FormTemplate>
        </div>
      </DialogContent>
    </Dialog>
  );
}