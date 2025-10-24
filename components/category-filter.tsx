import { CATEGORIES } from "@/lib/constants";
import { getCategoryLabel } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFilterProps {
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
}

export function CategoryFilter({
  selectedCategory,
  handleCategoryChange,
}: CategoryFilterProps) {
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
