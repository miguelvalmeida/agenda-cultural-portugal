import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ClearFiltersButtonProps {
  hasActiveFilters: boolean;
  clearAllParams: () => void;
}

export function ClearFiltersButton({
  hasActiveFilters,
  clearAllParams,
}: ClearFiltersButtonProps) {
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
