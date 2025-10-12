import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type Event = Tables<"events">;

export interface EventFilters {
  city?: string;
  category?: string;
  date?: string;
}

export async function fetchEvents(
  filters: EventFilters = {}
): Promise<Event[]> {
  const supabase = await createClient();

  let query = supabase.from("events").select("*");

  // Apply city filter
  if (filters.city) {
    query = query.eq("city", filters.city);
  }

  // Apply category filter
  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  // Apply date filter - events starting from or after the selected date
  if (filters.date) {
    query = query.gte("startDate", filters.date);
  }

  // Order by start date ascending
  query = query.order("startDate", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }

  return data || [];
}
