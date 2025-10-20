import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type Event = Tables<"events">;

export interface EventFilters {
  city?: string;
  category?: string;
  date?: string;
  search?: string;
}

export async function fetchEvents(
  filters: EventFilters = {}
): Promise<Event[]> {
  console.log('[fetchEvents] Starting with filters:', filters);
  
  const supabase = await createClient();
  console.log('[fetchEvents] Supabase client created');

  let query = supabase.from("events").select("*");
  console.log('[fetchEvents] Base query created');

  if (filters.city) {
    console.log('[fetchEvents] Applying city filter:', filters.city);
    query = query.eq("city", filters.city);
  }

  if (filters.category) {
    console.log('[fetchEvents] Applying category filter:', filters.category);
    query = query.eq("category", filters.category);
  }

  if (filters.date) {
    console.log('[fetchEvents] Applying date filter:', filters.date);
    query = query.gte("startDate", filters.date);
  }

  if (filters.search) {
    console.log('[fetchEvents] Applying search filter:', filters.search);
    query = query.or(
      `title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
    );
  }

  console.log('[fetchEvents] Applying order by startDate');
  query = query.order("startDate", { ascending: true });

  console.log('[fetchEvents] Executing query...');
  const { data, error } = await query;
  console.log('[fetchEvents] Query completed. Error:', error, 'Data length:', data?.length);

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }

  console.log('[fetchEvents] Returning', data?.length || 0, 'events');
  return data || [];
}
