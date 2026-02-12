"use client";

import * as React from "react";
import { z } from "zod";
import { 
  useForm, 
  UseFormReturn, 
  DefaultValues, 
  FieldValues, 
  SubmitHandler,
  Resolver
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Definimos T como FieldValues para que sea compatible con react-hook-form
interface FormTemplateProps<T extends FieldValues> {
  // Usamos z.ZodType con any en el input para evitar el error de unknown
  schema: z.ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => Promise<void>;
  title: string;
  description?: string;
  submitText?: string;
  children: (ctx: { form: UseFormReturn<T>; isPending: boolean }) => React.ReactNode;
}

export function FormTemplate<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  title,
  description,
  submitText = "Guardar",
  children,
}: FormTemplateProps<T>) {
  const [isPending, startTransition] = React.useTransition();
  
  const form = useForm<T>({
    // El cast a Resolver<T> es la clave para que coincida con la firma de useForm
    resolver: zodResolver(schema) as unknown as Resolver<T>,
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<T> = async (values) => {
    startTransition(async () => {
      try {
        await onSubmit(values);
      } catch (e) {
        toast.error("Error al enviar el formulario");
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="w-full shadow-2xl border-white/20 bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-zinc-950 leading-none">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form 
            id="dynamic-form" 
            onSubmit={form.handleSubmit(handleFormSubmit)} 
            className="space-y-6"
          >
            {children({ form, isPending })}
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 bg-zinc-950/5 px-8 py-6">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => form.reset()} 
            disabled={isPending}
            className="rounded-2xl font-black uppercase italic tracking-tighter text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar
          </Button>
          <Button 
            type="submit" 
            form="dynamic-form" 
            disabled={isPending}
            className="rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 font-black uppercase italic tracking-tighter px-8 h-12 shadow-xl shadow-zinc-950/20 transition-all active:scale-95"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Enviando..." : submitText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}