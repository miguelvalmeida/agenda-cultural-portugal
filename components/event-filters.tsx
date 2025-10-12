"use client";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

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

export function EventFilters() {
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);

  const { optimisticParams, setParams, clearAllParams, isPending } =
    useFilters();

  const selectedCity = optimisticParams.get("city") || "";
  const selectedCategory = optimisticParams.get("category") || "";
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

  const hasActiveFilters = selectedCity || selectedCategory || selectedDate;

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6"
      data-pending={isPending ? "" : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* City Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Cidade</label>
          <Select
            value={selectedCity || "all"}
            onValueChange={handleCityChange}
          >
            <SelectTrigger className="w-full !h-10">
              <SelectValue placeholder="Selecionar cidade" />
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
          <label className="text-sm font-medium text-gray-700">Categoria</label>
          <Select
            value={selectedCategory || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full !h-10">
              <SelectValue placeholder="Selecionar categoria" />
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
          <label className="text-sm font-medium text-gray-700">Data</label>
          <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-10"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy", { locale: pt })
                  : "Selecionar data"}
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
