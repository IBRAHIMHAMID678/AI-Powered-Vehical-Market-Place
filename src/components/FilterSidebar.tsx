import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const FilterSidebar = ({ isOpen = true, onClose }: FilterSidebarProps) => {
  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla"];
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];

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
        <Slider defaultValue={[10000, 50000]} max={100000} step={1000} className="mb-3" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>PKR 10,000</span>
          <span>PKR 50,000</span>
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Year</h4>
        <Slider defaultValue={[2018, 2024]} min={2010} max={2024} step={1} className="mb-3" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>2018</span>
          <span>2024</span>
        </div>
      </div>

      {/* Make */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-4">Make</h4>
        <div className="space-y-3">
          {makes.map((make) => (
            <label key={make} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
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
              <Checkbox className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {type}
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
              <Checkbox className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                {fuel}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 rounded-xl">
          Reset
        </Button>
        <Button className="flex-1 rounded-xl">Apply</Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
