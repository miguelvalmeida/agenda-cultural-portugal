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
  const supabase = await createClient();

  let query = supabase.from("events").select("*");

  if (filters.city) {
    query = query.eq("city", filters.city);
  }

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.date) {
    query = query.gte("startDate", filters.date);
  }

  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
    );
  }

  query = query.order("startDate", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }

  return data || [];
}
