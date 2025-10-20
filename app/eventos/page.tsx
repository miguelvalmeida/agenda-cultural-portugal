import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import type { EventFilters } from "@/lib/data/events";
import { EventsList } from "@/components/events-list";
import { EventsListSkeleton } from "@/components/events-list-skeleton";
import { ErrorFallback } from "@/components/error-boundaries";
import { EventFilters as EventFiltersComponent } from "@/components/event-filters";

interface EventosProps {
  searchParams: Promise<{
    cidade?: string;
    categoria?: string;
    data?: string;
    pesquisa?: string;
  }>;
}

export default async function Eventos({ searchParams }: EventosProps) {
  const params = await searchParams;

  const filters: EventFilters = {
    city: params.cidade || undefined,
    category: params.categoria || undefined,
    date: params.data || undefined,
    search: params.pesquisa || undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="group container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agenda Cultural Portugal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra os melhores eventos culturais em todo o país. Desde
            concertos e teatro até exposições e festivais.
          </p>
        </div>

        <div className="mb-8">
          <EventFiltersComponent />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eventos</h2>
          <ErrorBoundary fallbackRender={ErrorFallback}>
            {Object.values(params).every((value) => !value) ? (
              <Suspense fallback={<EventsListSkeleton />}>
                <EventsList filters={filters} />
              </Suspense>
            ) : (
              <EventsList filters={filters} />
            )}
          </ErrorBoundary>
        </div>
      </div>

      <footer className="border-t border-gray-200 pt-8 pb-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            <p>Agenda Cultural Portugal - Descubra a cultura portuguesa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
