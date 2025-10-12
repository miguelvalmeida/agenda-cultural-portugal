import { CalendarX } from "lucide-react";

import { fetchEvents, type EventFilters } from "@/lib/data/events";
import { EventCard } from "@/components/event-card";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";

interface EventsListProps {
  filters: EventFilters;
}

export async function EventsList({ filters }: EventsListProps) {
  const events = await fetchEvents(filters);

  if (events.length === 0) {
    return (
      <Empty className="group-has-data-pending:animate-pulse">
        <EmptyMedia>
          <CalendarX className="h-12 w-12 text-gray-400" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Nenhum evento encontrado</EmptyTitle>
          <EmptyDescription>
            Não foram encontrados eventos com os filtros aplicados. Tente
            ajustar os filtros para ver mais eventos.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
