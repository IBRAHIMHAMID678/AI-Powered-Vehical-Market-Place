import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const BuyNow = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const vehicles = [
    {
      id: "1",
      title: "2023 Toyota Camry XSE",
      price: 32500,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600",
      year: 2023,
      mileage: "12,500 mi",
      fuelType: "Hybrid",
      location: "Los Angeles, CA",
    },
    {
      id: "2",
      title: "2022 BMW X5 xDrive40i",
      price: 58900,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
      year: 2022,
      mileage: "28,000 mi",
      fuelType: "Gasoline",
      location: "Miami, FL",
    },
    {
      id: "3",
      title: "2024 Tesla Model 3",
      price: 42000,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600",
      year: 2024,
      mileage: "5,200 mi",
      fuelType: "Electric",
      location: "San Francisco, CA",
    },
    {
      id: "4",
      title: "2023 Mercedes-Benz C300",
      price: 47500,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
      year: 2023,
      mileage: "18,900 mi",
      fuelType: "Gasoline",
      location: "New York, NY",
    },
    {
      id: "5",
      title: "2022 Audi Q7 Premium",
      price: 54200,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600",
      year: 2022,
      mileage: "32,400 mi",
      fuelType: "Diesel",
      location: "Chicago, IL",
    },
    {
      id: "6",
      title: "2023 Ford Mustang GT",
      price: 45800,
      image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?w=600",
      year: 2023,
      mileage: "8,700 mi",
      fuelType: "Gasoline",
      location: "Dallas, TX",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Buy Now <span className="text-gradient">Vehicles</span>
          </h1>
          <p className="text-muted-foreground">
            Browse our curated selection of premium vehicles available for immediate purchase
          </p>
        </div>

        {/* Search & Controls Bar */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 mb-8 shadow-premium animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, or keyword..."
                className="pl-12 h-12 rounded-xl border-border/50 focus:border-primary"
              />
            </div>

            {/* Sort */}
            <Select defaultValue="newest">
              <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="mileage">Lowest Mileage</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-premium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground shadow-premium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
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
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-accent-charcoal/50"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full overflow-y-auto animate-slide-in-right">
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
              </div>
            </div>
          )}

          {/* Vehicle Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{vehicles.length}</span> vehicles
              </p>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} {...vehicle} delay={index * 100} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                Load More Vehicles
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyNow;
