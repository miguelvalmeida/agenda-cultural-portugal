import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SearchInputFilterProps {
  selectedSearch: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInputFilter({
  selectedSearch,
  handleSearchChange,
}: SearchInputFilterProps) {
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
