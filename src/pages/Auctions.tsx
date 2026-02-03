import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List, SlidersHorizontal, Flame, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const Auctions = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "ending">("live");

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterState>({
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

  const fetchVehicles = useCallback(async () => {
    try {
      setLoading(true);
      const limit = 12;
      let url = `http://localhost:5000/api/cars?type=auction&random=true&page=${page}&limit=${limit}`;

      // Search Query
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      // Makes
      if (activeFilters.makes.length > 0) {
        url += `&make=${activeFilters.makes.join(',')}`;
      }

      // Fuel
      if (activeFilters.fuelTypes.length > 0) {
        url += `&fuelType=${activeFilters.fuelTypes.join(',')}`;
      }

      // Body Type
      if (activeFilters.bodyTypes.length > 0) {
        url += `&bodyType=${activeFilters.bodyTypes.join(',')}`;
      }

      // Transmission
      if (activeFilters.transmissions.length > 0) {
        url += `&transmission=${activeFilters.transmissions.join(',')}`;
      }

      // Color
      if (activeFilters.colors.length > 0) {
        url += `&color=${encodeURIComponent(activeFilters.colors.join(','))}`; // encode for # or names
      }

      // Registration City
      if (activeFilters.registrationCities.length > 0) {
        url += `&registrationCity=${activeFilters.registrationCities.join(',')}`;
      }

      // Location
      if (activeFilters.locations.length > 0) {
        url += `&location=${activeFilters.locations.join(',')}`;
      }

      // Engine CC - Only send if restricted
      if (activeFilters.engineCCRange[0] > 600 || activeFilters.engineCCRange[1] < 6000) {
        url += `&minEngineCC=${activeFilters.engineCCRange[0]}&maxEngineCC=${activeFilters.engineCCRange[1]}`;
      }
      if (activeFilters.bodyTypes.length > 0) {
        url += `&bodyType=${activeFilters.bodyTypes.join(',')}`;
      }

      // Transmission
      if (activeFilters.transmissions.length > 0) {
        url += `&transmission=${activeFilters.transmissions.join(',')}`;
      }

      // Color
      if (activeFilters.colors.length > 0) {
        url += `&color=${encodeURIComponent(activeFilters.colors.join(','))}`;
      }

      // Price Range
      if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 50000000) {
        url += `&minPrice=${activeFilters.priceRange[0]}&maxPrice=${activeFilters.priceRange[1]}`;
      }

      // Year Range
      if (activeFilters.yearRange[0] > 1980 || activeFilters.yearRange[1] < 2025) {
        url += `&minYear=${activeFilters.yearRange[0]}&maxYear=${activeFilters.yearRange[1]}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const mapped = data.cars.map((car: any) => ({
        id: car._id,
        title: car.title,
        price: car.price,
        currentBid: car.price, // Assuming price is current bid for auctions
        image: car.image,
        year: car.year || parseInt(car.title.match(/\d{4}/)?.[0] || "2020"),
        mileage: car.mileage || "N/A",
        fuelType: car.fuelType || car.features?.find((f: string) => ["Petrol", "Diesel", "Hybrid", "Electric"].includes(f)) || "Petrol",
        location: car.location,
        make: car.make || car.title.split(' ')[1] || 'Unknown',
        isAuction: true,
        timeLeft: "24h" // Placeholder as DB doesn't have end time yet
      }));

      if (page === 1) {
        setVehicles(mapped);
      } else {
        setVehicles(prev => [...prev, ...mapped]);
      }
      setTotal(data.totalCars);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, activeFilters]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    setPage(1);
    setIsFilterOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const tabs = [
    { id: "live", label: "Live Auctions", icon: Flame, count: total },
    { id: "upcoming", label: "Upcoming", icon: Clock, count: 0 },
    { id: "ending", label: "Ending Soon", icon: TrendingUp, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Live <span className="text-gradient">Auctions</span>
            </h1>
            <Badge className="bg-accent-racing text-primary-foreground animate-pulse">
              <Flame className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Bid on exclusive vehicles with real-time updates. Don't miss out on your dream car!
          </p>
        </div>


        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-premium"
                : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <Badge
                variant="secondary"
                className={activeTab === tab.id ? "bg-primary-foreground/20 text-primary-foreground" : ""}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Search & Controls Bar */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 mb-8 shadow-premium animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search auctions..."
                className="pl-12 h-12 rounded-xl border-border/50 focus:border-primary"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Select defaultValue="ending">
              <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending">Ending Soonest</SelectItem>
                <SelectItem value="bids">Most Bids</SelectItem>
                <SelectItem value="price-low">Lowest Current Bid</SelectItem>
                <SelectItem value="price-high">Highest Current Bid</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-premium"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-premium"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden h-12 rounded-xl"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar onApply={handleApplyFilters} />
            </div>
          </aside>

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-accent-charcoal/50"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full overflow-y-auto animate-slide-in-right">
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} onApply={handleApplyFilters} />
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{vehicles.length}</span> auctions
              </p>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "grid-cols-1"
                }`}
            >
              {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} {...vehicle} delay={index * 100} />
              ))}
            </div>

            {vehicles.length < total && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  className="rounded-xl px-8 font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  {loading ? "Loading..." : "Load More Auctions"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auctions;
