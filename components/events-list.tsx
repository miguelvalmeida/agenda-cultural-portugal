import { fetchEvents, type EventFilters } from "@/lib/data/events";
import { EventCard } from "@/components/event-card";
import { EventsEmptyState } from "@/components/events-empty-state";

interface EventsListProps {
  filters: EventFilters;
}

export async function EventsList({ filters }: EventsListProps) {
  console.log('[EventsList] Component called with filters:', filters);
  
  console.log('[EventsList] About to call fetchEvents...');
  const events = await fetchEvents(filters);
  console.log('[EventsList] fetchEvents completed, got', events.length, 'events');

  if (events.length === 0) {
    console.log('[EventsList] No events found, rendering empty state');
    return <EventsEmptyState />;
  }

  console.log('[EventsList] Rendering', events.length, 'events');
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} priority={index < 4} />
      ))}
    </div>
  );
}
