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
  const { optimisticParams, clearAllParams, isPending } = useFilters();

  const selectedCity = optimisticParams.get("cidade");
  const selectedCategory = optimisticParams.get("categoria");
  const selectedDate = optimisticParams.get("data");
  const selectedSearch = optimisticParams.get("pesquisa");

  const hasActiveFilters =
    selectedCity || selectedCategory || selectedDate || selectedSearch;

  const getCustomMessage = () => {
    const activeFilters = [];

    if (selectedSearch) {
      activeFilters.push(`pesquisa por "${selectedSearch}"`);
    }

    if (selectedCity) {
      activeFilters.push(`na cidade "${selectedCity}"`);
    }

    if (selectedCategory) {
      activeFilters.push(`com categoria "${getCategoryLabel(selectedCategory)}"`);
    }

    if (selectedDate) {
      const formattedDate = format(new Date(selectedDate), "dd/MM/yyyy", {
        locale: pt,
      });
      activeFilters.push(`com data "${formattedDate}"`);
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
        description: `Não foram encontrados eventos ${activeFilters[0]}. Tente ajustar os filtros para ver mais eventos.`,
      };
    }

    if (activeFilters.length === 2) {
      return {
        title: "Nenhum evento encontrado",
        description: `Não foram encontrados eventos ${activeFilters[0]} e ${activeFilters[1]}. Tente ajustar os filtros para ver mais eventos.`,
      };
    }

    // For 3 or more filters
    const lastFilter = activeFilters.pop();
    const filtersText = activeFilters.join(", ");

    return {
      title: "Nenhum evento encontrado",
      description: `Não foram encontrados eventos ${filtersText} e ${lastFilter}. Tente ajustar os filtros para ver mais eventos.`,
    };
  };

  const { title, description } = getCustomMessage();

  return (
    <Empty
      data-pending={isPending ? "" : undefined}
      className="transition-all duration-300 group-has-data-pending:opacity-60 group-has-data-pending:scale-95"
    >
      <EmptyHeader>
        <EmptyMedia>
          <div className="transition-all duration-500 group-has-data-pending:animate-bounce">
            <CalendarX className="h-12 w-12 text-gray-400" />
          </div>
        </EmptyMedia>
        <EmptyTitle className="transition-all duration-300">
          <span className="group-has-data-pending:hidden">{title}</span>
          <span className="hidden group-has-data-pending:block">
            A procurar eventos...
          </span>
        </EmptyTitle>
        <EmptyDescription className="transition-all duration-300">
          <span className="group-has-data-pending:hidden">{description}</span>
          <span className="hidden group-has-data-pending:block">
            Estamos a filtrar os eventos para si. Por favor, aguarde um momento.
          </span>
        </EmptyDescription>
      </EmptyHeader>
      {hasActiveFilters && (
        <EmptyContent>
          <Button
            variant="outline"
            onClick={clearAllParams}
            className="flex items-center gap-2 group-has-data-pending:hidden"
          >
            <FilterX className="h-4 w-4" />
            Limpar todos os filtros
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
