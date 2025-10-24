"use client";

import { useState } from "react";
import { X, Filter, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useDebouncedCallback } from "use-debounce";
import type { DateRange } from "react-day-picker";

import { useFilters } from "@/hooks/use-filters";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DateRangeFilter } from "@/components/date-range-filter";
import { SearchInputFilter } from "@/components/search-input-filter";
import { CityFilter } from "@/components/city-filter";
import { CategoryFilter } from "@/components/category-filter";
import { ClearFiltersButton } from "@/components/clear-filters-button";

export function EventFilters() {
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isMobileDatePopoverOpen, setIsMobileDatePopoverOpen] = useState(false);
  const {
    optimisticParams,
    setParams,
    clearAllParams,
    isPending,
    searchParams,
  } = useFilters();

  const selectedCity = optimisticParams.get("cidade") || "";
  const selectedCategory = optimisticParams.get("categoria") || "";
  const selectedSearch = optimisticParams.get("pesquisa") || "";
  const selectedDateFrom = searchParams.get("de")
    ? new Date(searchParams.get("de") || "")
    : undefined;
  const selectedDateTo = searchParams.get("ate")
    ? new Date(searchParams.get("ate") || "")
    : undefined;

  const selectedDateRange: DateRange | undefined = selectedDateFrom
    ? { from: selectedDateFrom, to: selectedDateTo }
    : undefined;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setParams([{ name: "pesquisa", value: value || null }]);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleCityChange = (value: string) => {
    const newCityId = value === "all" ? "" : value;
    setParams([{ name: "cidade", value: newCityId }]);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? "" : value;
    setParams([{ name: "categoria", value: newCategory }]);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setParams([
      {
        name: "de",
        value: range?.from ? format(range.from, "yyyy-MM-dd") : null,
      },
      { name: "ate", value: range?.to ? format(range.to, "yyyy-MM-dd") : null },
    ]);
    setIsDatePopoverOpen(false);
    setIsMobileDatePopoverOpen(false);
  };

  const hasActiveFilters = Boolean(
    selectedCity ||
      selectedCategory ||
      selectedDateFrom ||
      selectedDateTo ||
      selectedSearch
  );

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className="bg-white border border-gray-200 rounded-xl shadow-sm"
    >
      <div className="md:hidden">
        <Collapsible>
          <CollapsibleTrigger className="group w-full p-3 flex justify-between items-center rounded-xl">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {hasActiveFilters && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 space-y-3 border-t">
            <SearchInputFilter
              selectedSearch={selectedSearch}
              handleSearchChange={handleSearchChange}
            />
            <div className="grid grid-cols-2 gap-3">
              <CityFilter
                selectedCity={selectedCity}
                handleCityChange={handleCityChange}
              />
              <CategoryFilter
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
            </div>
            <DateRangeFilter
              selectedDateRange={selectedDateRange}
              handleDateRangeChange={handleDateRangeChange}
              isDatePopoverOpen={isMobileDatePopoverOpen}
              setIsDatePopoverOpen={setIsMobileDatePopoverOpen}
              isMobile={true}
            />
            <ClearFiltersButton
              hasActiveFilters={hasActiveFilters}
              clearAllParams={clearAllParams}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="hidden md:block p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-4 items-end">
          <SearchInputFilter
            selectedSearch={selectedSearch}
            handleSearchChange={handleSearchChange}
          />
          <CityFilter
            selectedCity={selectedCity}
            handleCityChange={handleCityChange}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <DateRangeFilter
            selectedDateRange={selectedDateRange}
            handleDateRangeChange={handleDateRangeChange}
            isDatePopoverOpen={isDatePopoverOpen}
            setIsDatePopoverOpen={setIsDatePopoverOpen}
            isMobile={false}
          />
          <ClearFiltersButton
            hasActiveFilters={hasActiveFilters}
            clearAllParams={clearAllParams}
          />
        </div>
      </div>
    </div>
  );
}
