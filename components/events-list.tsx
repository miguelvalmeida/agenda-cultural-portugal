import { fetchEvents, type EventFilters } from "@/lib/data/events";
import { EventCard } from "@/components/event-card";
import { EventsEmptyState } from "@/components/events-empty-state";

interface EventsListProps {
  filters: EventFilters;
}

export async function EventsList({ filters }: EventsListProps) {
  const events = await fetchEvents(filters);

  if (events.length === 0) {
    return <EventsEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} priority={index < 4} />
      ))}
    </div>
  );
}
