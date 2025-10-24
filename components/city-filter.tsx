import { CITIES } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CityFilterProps {
  selectedCity: string;
  handleCityChange: (value: string) => void;
}

export function CityFilter({
  selectedCity,
  handleCityChange,
}: CityFilterProps) {
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
