"use client";

import { CalendarX, RefreshCw } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <CalendarX className="h-12 w-12 text-gray-400" />
        </EmptyMedia>
        <EmptyTitle>Erro ao carregar conteúdo</EmptyTitle>
        <EmptyDescription>
          Ocorreu um erro inesperado. Tente novamente.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={resetErrorBoundary}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </EmptyContent>
    </Empty>
  );
}
