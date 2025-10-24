import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRangePresets } from "@/components/date-range-presets";

interface DateRangeFilterProps {
  selectedDateRange: DateRange | undefined;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  isDatePopoverOpen: boolean;
  setIsDatePopoverOpen: (open: boolean) => void;
  isMobile?: boolean;
}

export function DateRangeFilter({
  selectedDateRange,
  handleDateRangeChange,
  isDatePopoverOpen,
  setIsDatePopoverOpen,
  isMobile = false,
}: DateRangeFilterProps) {
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
