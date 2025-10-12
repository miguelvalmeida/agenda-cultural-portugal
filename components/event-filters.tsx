"use client";

import { useState } from "react";
import { CalendarIcon, X, Search } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useDebouncedCallback } from "use-debounce";

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

export function EventFilters() {
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const { optimisticParams, setParams, clearAllParams, isPending } =
    useFilters();

  const selectedCity = optimisticParams.get("city") || "";
  const selectedCategory = optimisticParams.get("category") || "";
  const selectedSearch = optimisticParams.get("search") || "";
  const selectedDate = optimisticParams.get("date")
    ? new Date(optimisticParams.get("date") || "")
    : null;

  const handleCityChange = (value: string) => {
    const newCity = value === "all" ? "" : value;
    setParams("city", newCity);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? "" : value;
    setParams("category", newCategory);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setParams("date", format(date, "yyyy-MM-dd"));
    } else {
      setParams("date", null);
    }
    setIsDatePopoverOpen(false);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setParams("search", value || null);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const hasActiveFilters =
    selectedCity || selectedCategory || selectedDate || selectedSearch;

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Search Filter */}
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label htmlFor="search-input">Pesquisar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search-input"
              type="text"
              placeholder="Pesquisar eventos..."
              defaultValue={selectedSearch}
              onChange={handleSearchChange}
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <Label htmlFor="city-select">Cidade</Label>
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger id="city-select" className="w-full !h-10">
              <SelectValue placeholder="Selecionar cidade">
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

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category-select">Categoria</Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-select" className="w-full !h-10">
              <SelectValue placeholder="Selecionar categoria">
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

        {/* Date Filter */}
        <div className="space-y-2">
          <Label htmlFor="date-button">Data</Label>
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-button"
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {selectedDate ? (
                  format(selectedDate, "dd/MM/yyyy", { locale: pt })
                ) : (
                  <span className="text-muted-foreground">Selecionar data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate || undefined}
                onSelect={handleDateChange}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                locale={pt}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Clear Filters Button */}
        <div>
          <Button
            variant="outline"
            onClick={() => clearAllParams()}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 h-10 transition-opacity ${
              hasActiveFilters ? "opacity-100" : "opacity-50"
            }`}
            disabled={!hasActiveFilters}
          >
            <X className="h-4 w-4" />
            Limpar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
