import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import FilterSidebar from "@/components/FilterSidebar";
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
import { useState } from "react";

const Auctions = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "ending">("live");

  const liveAuctions = [
    {
      id: "1",
      title: "2023 Porsche 911 Carrera S",
      price: 0,
      currentBid: 125000,
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600",
      year: 2023,
      mileage: "3,200 mi",
      fuelType: "Gasoline",
      location: "Beverly Hills, CA",
      timeLeft: "2h 45m",
      isAuction: true,
    },
    {
      id: "2",
      title: "2022 Lamborghini Huracán",
      price: 0,
      currentBid: 245000,
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600",
      year: 2022,
      mileage: "5,800 mi",
      fuelType: "Gasoline",
      location: "Miami, FL",
      timeLeft: "4h 12m",
      isAuction: true,
    },
    {
      id: "3",
      title: "2024 Ferrari Roma",
      price: 0,
      currentBid: 198000,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600",
      year: 2024,
      mileage: "1,200 mi",
      fuelType: "Gasoline",
      location: "New York, NY",
      timeLeft: "1h 30m",
      isAuction: true,
    },
    {
      id: "4",
      title: "2023 McLaren 720S",
      price: 0,
      currentBid: 285000,
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600",
      year: 2023,
      mileage: "2,400 mi",
      fuelType: "Gasoline",
      location: "Las Vegas, NV",
      timeLeft: "6h 20m",
      isAuction: true,
    },
    {
      id: "5",
      title: "2022 Aston Martin Vantage",
      price: 0,
      currentBid: 165000,
      image: "https://images.unsplash.com/photo-1596468138638-f64c02c9c8a4?w=600",
      year: 2022,
      mileage: "8,100 mi",
      fuelType: "Gasoline",
      location: "Scottsdale, AZ",
      timeLeft: "8h 55m",
      isAuction: true,
    },
    {
      id: "6",
      title: "2023 Bentley Continental GT",
      price: 0,
      currentBid: 215000,
      image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600",
      year: 2023,
      mileage: "4,500 mi",
      fuelType: "Gasoline",
      location: "Houston, TX",
      timeLeft: "3h 10m",
      isAuction: true,
    },
  ];

  const tabs = [
    { id: "live", label: "Live Auctions", icon: Flame, count: 24 },
    { id: "upcoming", label: "Upcoming", icon: Clock, count: 18 },
    { id: "ending", label: "Ending Soon", icon: TrendingUp, count: 8 },
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Auctions", value: "156", color: "bg-primary/10 text-primary" },
            { label: "Total Bids Today", value: "2,847", color: "bg-accent-gold/10 text-accent-gold" },
            { label: "Ending Soon", value: "12", color: "bg-accent-racing/10 text-accent-racing" },
            { label: "Avg. Savings", value: "18%", color: "bg-green-500/10 text-green-600" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border/50 p-5 shadow-premium animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`font-heading text-2xl font-bold ${stat.color.split(" ")[1]}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
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
              <FilterSidebar />
            </div>
          </aside>

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

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{liveAuctions.length}</span> auctions
              </p>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {liveAuctions.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} {...vehicle} delay={index * 100} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                Load More Auctions
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auctions;
