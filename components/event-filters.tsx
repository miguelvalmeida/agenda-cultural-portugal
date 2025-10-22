"use client";

import { useState } from "react";
import { CalendarIcon, X, Search, Filter, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useDebouncedCallback } from "use-debounce";
import type { DateRange } from "react-day-picker";

import { getCategoryLabel } from "@/lib/utils";
import { useFilters } from "@/hooks/use-filters";
import { CITIES, CATEGORIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateRangePresets } from "@/components/date-range-presets";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function SearchFilter({
  selectedSearch,
  handleSearchChange,
}: {
  selectedSearch: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid gap-2 sm:col-span-2 lg:col-span-1">
      <Label htmlFor="search-input">Pesquisar</Label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id="search-input"
          type="text"
          placeholder="Pesquisar eventos..."
          defaultValue={selectedSearch}
          onChange={handleSearchChange}
          className="pl-10 h-9 text-sm md:h-10"
        />
      </div>
    </div>
  );
}

function CityFilter({
  selectedCity,
  handleCityChange,
}: {
  selectedCity: string;
  handleCityChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="city">Cidade</Label>
      <Select value={selectedCity} onValueChange={handleCityChange}>
        <SelectTrigger id="city" className="h-9 text-sm w-full md:h-10!">
          <SelectValue placeholder="Cidade">
            {selectedCity ? selectedCity : "Todas as cidades"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as cidades</SelectItem>
          {CITIES.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CategoryFilter({
  selectedCategory,
  handleCategoryChange,
}: {
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="category">Categoria</Label>
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger id="category" className="h-9 text-sm w-full md:h-10!">
          <SelectValue placeholder="Categoria">
            {selectedCategory
              ? getCategoryLabel(selectedCategory)
              : "Todas as categorias"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {CATEGORIES.map((category) => (
            <SelectItem key={category} value={category}>
              {getCategoryLabel(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function DateRangeFilter({
  selectedDateRange,
  handleDateRangeChange,
  isDatePopoverOpen,
  setIsDatePopoverOpen,
  isMobile = false,
}: {
  selectedDateRange: DateRange | undefined;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  isDatePopoverOpen: boolean;
  setIsDatePopoverOpen: (open: boolean) => void;
  isMobile?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="date-range">Datas</Label>
      <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            variant="outline"
            className="w-full justify-start text-left font-normal h-9 text-sm md:h-10"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
            {selectedDateRange?.from ? (
              selectedDateRange.to ? (
                `${format(selectedDateRange.from, "dd/MM/yyyy", {
                  locale: pt,
                })} - ${format(selectedDateRange.to, "dd/MM/yyyy", {
                  locale: pt,
                })}`
              ) : (
                `A partir de ${format(selectedDateRange.from, "dd/MM/yyyy", {
                  locale: pt,
                })}`
              )
            ) : (
              <span className="text-muted-foreground">Datas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={selectedDateRange}
            onSelect={handleDateRangeChange}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            numberOfMonths={isMobile ? 1 : 2}
            showOutsideDays={false}
            locale={pt}
            className="w-full md:w-auto"
          />
          <DateRangePresets onSelectRange={handleDateRangeChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ClearFiltersButton({
  hasActiveFilters,
  clearAllParams,
}: {
  hasActiveFilters: boolean;
  clearAllParams: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={() => clearAllParams()}
      className="w-full lg:w-fit flex items-center justify-center gap-2 h-10"
      disabled={!hasActiveFilters}
    >
      <X className="h-4 w-4" />
      Limpar filtros
    </Button>
  );
}

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
            <SearchFilter
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
          <SearchFilter
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
