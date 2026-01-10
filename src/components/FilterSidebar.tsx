import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export interface FilterState {
  priceRange: number[];
  yearRange: number[];
  makes: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  colors: string[];
  registrationCities: string[];
  locations: string[];
  engineCCRange: number[];
}

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApply: (filters: FilterState) => void;
}

const FilterSidebar = ({ isOpen = true, onClose, onApply }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 50000000],
    yearRange: [1980, 2025],
    makes: [],
    bodyTypes: [],
    fuelTypes: [],
    transmissions: [],
    colors: [],
    registrationCities: [],
    locations: [],
    engineCCRange: [600, 6000],
  });

  // Pakistani market prioritized
  const makes = ["Suzuki", "Toyota", "Honda", "Daihatsu", "Kia", "Hyundai", "Changan", "MG", "Audi", "BMW", "Mercedes", "Nissan", "Mitsubishi", "Ford", "Tesla"];
  const bodyTypes = ["Sedan", "SUV", "Hatchback", "Micro Van", "Crossover", "Truck", "Coupe", "Convertible"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];
  const transmissions = ["Automatic", "Manual"];
  const colors = ["White", "Black", "Silver", "Grey", "Blue", "Red", "Gold", "Green", "Bronze"];
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Faisalabad", "Multan", "Quetta", "Sialkot", "Gujranwala", "Hyderabad"]; // Common for both reg and location for simplicity
  const locations = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Faisalabad", "Multan", "Quetta", "Hyderabad", "Abbottabad", "Bahawalpur"];

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[category] as string[];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleApply = () => {
    onApply(filters);
    if (onClose) onClose();
  };

  const handleReset = () => {
    const resetState = {
      priceRange: [0, 50000000],
      yearRange: [1980, 2025],
      makes: [],
      bodyTypes: [],
      fuelTypes: [],
      transmissions: [],
      colors: [],
      registrationCities: [],
      locations: [],
      engineCCRange: [600, 6000],
    };
    setFilters(resetState);
    onApply(resetState);
  };

  return (
    <div
      className={`bg-card rounded-2xl border border-border/50 p-6 shadow-premium ${isOpen ? "block" : "hidden lg:block"
        }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-bold text-lg text-foreground">Filters</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
        <Slider
          defaultValue={[0, 50000000]}
          max={50000000}
          step={50000}
          className="mb-3"
          value={filters.priceRange}
          onValueChange={(val) => setFilters(prev => ({ ...prev, priceRange: val }))}
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>PKR {filters.priceRange[0].toLocaleString()}</span>
          <span>PKR {filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Year</h4>
        <Slider
          defaultValue={[1980, 2025]}
          min={1980}
          max={2025}
          step={1}
          className="mb-3"
          value={filters.yearRange}
          onValueChange={(val) => setFilters(prev => ({ ...prev, yearRange: val }))}
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filters.yearRange[0]}</span>
          <span>{filters.yearRange[1]}</span>
        </div>
      </div>

      {/* Make */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Make</h4>
        <div className="space-y-3">
          {makes.map((make) => (
            <label key={make} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.makes.includes(make)}
                onCheckedChange={() => handleCheckboxChange("makes", make)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {make}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Body Type</h4>
        <div className="space-y-3">
          {bodyTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.bodyTypes.includes(type)}
                onCheckedChange={() => handleCheckboxChange("bodyTypes", type)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Transmission</h4>
        <div className="space-y-3">
          {transmissions.map((trans) => (
            <label key={trans} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.transmissions.includes(trans)}
                onCheckedChange={() => handleCheckboxChange("transmissions", trans)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {trans}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Fuel Type</h4>
        <div className="space-y-3">
          {fuelTypes.map((fuel) => (
            <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.fuelTypes.includes(fuel)}
                onCheckedChange={() => handleCheckboxChange("fuelTypes", fuel)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {fuel}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Registration City */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Registration City</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {cities.map((city) => (
            <label key={city} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.registrationCities.includes(city)}
                onCheckedChange={() => handleCheckboxChange("registrationCities", city)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {city}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Location</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {locations.map((loc) => (
            <label key={loc} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={filters.locations.includes(loc)}
                onCheckedChange={() => handleCheckboxChange("locations", loc)}
                className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {loc}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Engine CC */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Engine Capacity (CC)</h4>
        <Slider
          defaultValue={[600, 6000]}
          min={600}
          max={6000}
          step={50}
          className="mb-3"
          value={filters.engineCCRange}
          onValueChange={(val) => setFilters(prev => ({ ...prev, engineCCRange: val }))}
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filters.engineCCRange[0]} cc</span>
          <span>{filters.engineCCRange[1]} cc</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Color</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <label key={color} className="cursor-pointer group relative">
              <Checkbox
                checked={filters.colors.includes(color)}
                onCheckedChange={() => handleCheckboxChange("colors", color)}
                className="sr-only" // Hide default checkbox
              />
              <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all ${filters.colors.includes(color) ? 'ring-2 ring-primary ring-offset-2' : ''}`} style={{ backgroundColor: color.toLowerCase() }}>
                {color === "White" && <span className="text-xs text-black/50 sr-only">White</span>}
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white px-1 rounded">
                {color}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 rounded-xl" onClick={handleReset}>
          Reset
        </Button>
        <Button className="flex-1 rounded-xl" onClick={handleApply}>
          ApplyFilters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
