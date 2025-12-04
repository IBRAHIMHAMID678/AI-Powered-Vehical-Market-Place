import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Car } from "lucide-react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`bg-card rounded-2xl p-4 md:p-6 shadow-premium transition-all duration-500 ${
        isFocused ? "shadow-glow scale-[1.01]" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-4">
        {/* Search Icon Animation Container */}
        <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
          <Car
            className={`h-7 w-7 text-primary transition-all duration-500 ${
              isFocused ? "animate-bounce-subtle" : ""
            }`}
          />
        </div>

        {/* Select Filters */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select>
            <SelectTrigger
              className="h-12 lg:h-14 border-border/50 bg-background/50 rounded-xl text-sm font-medium hover:border-primary/50 transition-colors"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border shadow-premium-lg">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="suv">SUVs</SelectItem>
              <SelectItem value="sedan">Sedans</SelectItem>
              <SelectItem value="truck">Trucks</SelectItem>
              <SelectItem value="sports">Sports Cars</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              className="h-12 lg:h-14 border-border/50 bg-background/50 rounded-xl text-sm font-medium hover:border-primary/50 transition-colors"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <SelectValue placeholder="Any Make" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border shadow-premium-lg">
              <SelectItem value="any">Any Make</SelectItem>
              <SelectItem value="toyota">Toyota</SelectItem>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="ford">Ford</SelectItem>
              <SelectItem value="bmw">BMW</SelectItem>
              <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
              <SelectItem value="audi">Audi</SelectItem>
              <SelectItem value="tesla">Tesla</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              className="h-12 lg:h-14 border-border/50 bg-background/50 rounded-xl text-sm font-medium hover:border-primary/50 transition-colors"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <SelectValue placeholder="Any Model" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border shadow-premium-lg">
              <SelectItem value="any">Any Model</SelectItem>
              <SelectItem value="camry">Camry</SelectItem>
              <SelectItem value="accord">Accord</SelectItem>
              <SelectItem value="f150">F-150</SelectItem>
              <SelectItem value="model3">Model 3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              className="h-12 lg:h-14 border-border/50 bg-background/50 rounded-xl text-sm font-medium hover:border-primary/50 transition-colors"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border shadow-premium-lg">
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="0-10000">Under $10,000</SelectItem>
              <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
              <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
              <SelectItem value="100000+">$100,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button
          className="h-12 lg:h-14 px-8 rounded-xl font-semibold text-base shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <Search className="h-5 w-5 mr-2 transition-transform group-hover:scale-110" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;