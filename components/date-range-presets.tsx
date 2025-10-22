"use client";

import type { DateRange } from "react-day-picker";
import { addWeeks, startOfWeek, endOfWeek, endOfMonth } from "date-fns";
import { pt } from "date-fns/locale";

import { Button } from "@/components/ui/button";

interface DateRangePresetsProps {
  onSelectRange: (range: DateRange | undefined) => void;
}

export function DateRangePresets({ onSelectRange }: DateRangePresetsProps) {
  const today = new Date();

  const presets = [
    {
      label: "Hoje",
      getRange: () => ({ from: today, to: today }),
    },
      {
        label: "Este fim de semana",
        getRange: () => {
          const today = new Date();
          const dayOfWeek = today.getDay();

          // Find this Friday (or next Friday if today is Saturday/Sunday)
          const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
          const friday = new Date(today);
          friday.setDate(today.getDate() + daysUntilFriday);

          // Find this Sunday
          const sunday = new Date(friday);
          sunday.setDate(friday.getDate() + 2);

          return { from: friday, to: sunday };
        },
      },
    {
      label: "Próxima semana",
      getRange: () => {
        const nextWeekStart = startOfWeek(addWeeks(today, 1), {
          weekStartsOn: 1,
          locale: pt,
        });
        const nextWeekEnd = endOfWeek(addWeeks(today, 1), {
          weekStartsOn: 1,
          locale: pt,
        });
        return { from: nextWeekStart, to: nextWeekEnd };
      },
    },
    {
      label: "Este mês",
      getRange: () => {
        return { from: today, to: endOfMonth(today) };
      },
    },
  ];

  return (
    <div className="p-3 border-t">
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            onClick={() => {
              const { from, to } = preset.getRange();
              onSelectRange({ from, to });
            }}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
