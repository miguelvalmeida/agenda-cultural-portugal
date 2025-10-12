"use client";

import { CalendarX, FilterX } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { useFilters } from "@/hooks/use-filters";
import { getCategoryLabel } from "@/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function EventsEmptyState() {
  const { searchParams, clearAllParams, isPending } = useFilters();

  const selectedCity = searchParams.get("city");
  const selectedCategory = searchParams.get("category");
  const selectedDate = searchParams.get("date");
  const selectedSearch = searchParams.get("search");

  const hasActiveFilters =
    selectedCity || selectedCategory || selectedDate || selectedSearch;

  const getCustomMessage = () => {
    const activeFilters = [];

    if (selectedSearch) {
      activeFilters.push(`pesquisa por "${selectedSearch}"`);
    }

    if (selectedCity) {
      activeFilters.push(`cidade "${selectedCity}"`);
    }

    if (selectedCategory) {
      activeFilters.push(`categoria "${getCategoryLabel(selectedCategory)}"`);
    }

    if (selectedDate) {
      const formattedDate = format(new Date(selectedDate), "dd/MM/yyyy", {
        locale: pt,
      });
      activeFilters.push(`data "${formattedDate}"`);
    }

    if (activeFilters.length === 0) {
      return {
        title: "Nenhum evento encontrado",
        description:
          "Não há eventos disponíveis no momento. Tente novamente mais tarde.",
      };
    }

    if (activeFilters.length === 1) {
      return {
        title: "Nenhum evento encontrado",
        description: `Não foram encontrados eventos com ${activeFilters[0]}. Tente ajustar os filtros para ver mais eventos.`,
      };
    }

    if (activeFilters.length === 2) {
      return {
        title: "Nenhum evento encontrado",
        description: `Não foram encontrados eventos com ${activeFilters[0]} e ${activeFilters[1]}. Tente ajustar os filtros para ver mais eventos.`,
      };
    }

    // For 3 or more filters
    const lastFilter = activeFilters.pop();
    const filtersText = activeFilters.join(", ");

    return {
      title: "Nenhum evento encontrado",
      description: `Não foram encontrados eventos com ${filtersText} e ${lastFilter}. Tente ajustar os filtros para ver mais eventos.`,
    };
  };

  const { title, description } = getCustomMessage();

  return (
    <Empty
      className="group transition-all duration-300 data-[pending]:opacity-60 data-[pending]:scale-95"
      data-pending={isPending ? "" : undefined}
    >
      <EmptyHeader>
        <EmptyMedia>
          <div className="transition-all duration-500 group-data-[pending]:animate-bounce">
            <CalendarX className="h-12 w-12 text-gray-400" />
          </div>
        </EmptyMedia>
        <EmptyTitle className="transition-all duration-300 group-data-[pending]:animate-pulse">
          {isPending ? "A procurar eventos..." : title}
        </EmptyTitle>
        <EmptyDescription className="transition-all duration-300 group-data-[pending]:animate-pulse">
          {isPending
            ? "Aguarde enquanto filtramos os eventos para você."
            : description}
        </EmptyDescription>
      </EmptyHeader>
      {hasActiveFilters && !isPending && (
        <EmptyContent>
          <Button
            variant="outline"
            onClick={clearAllParams}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Limpar todos os filtros
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
