"use client";

import { CalendarX } from "lucide-react";

import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";

export function ErrorFallback() {
  return (
    <Empty>
      <EmptyMedia>
        <CalendarX className="h-12 w-12 text-gray-400" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Erro ao carregar conteúdo</EmptyTitle>
        <EmptyDescription>
          Ocorreu um erro inesperado. Tente novamente.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
