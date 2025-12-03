import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import suvIcon from "@/assets/suv-icon.png";
import sedanIcon from "@/assets/sedan-icon.png";
import truckIcon from "@/assets/truck-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">AUTOMOTIVE</p>
                  <p className="text-[10px] text-muted-foreground tracking-wide">
                    AI VEHICLE MARKETPLACE
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/auctions"
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                Auctions
              </Link>
              <Link
                to="/buy-now"
                className="text-foreground font-medium hover:text-primary transition-colors"
              >
                Buy Now
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button className="px-6 h-10 rounded-lg font-semibold">Search</Button>
              <Button
                variant="outline"
                className="px-6 h-10 rounded-lg font-semibold border-primary text-primary-foreground bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
            Find Your Perfect<br />Vehicle
          </h1>

          {/* Search Filters */}
          <div className="bg-card rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px] h-12 border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="suv">SUVs</SelectItem>
                <SelectItem value="sedan">Sedans</SelectItem>
                <SelectItem value="truck">Trucks</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] h-12 border-border">
                <SelectValue placeholder="Any Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Make</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="vw">Volkswagen</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] h-12 border-border">
                <SelectValue placeholder="Any Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Model</SelectItem>
                <SelectItem value="camry">Camry</SelectItem>
                <SelectItem value="accord">Accord</SelectItem>
                <SelectItem value="f150">F-150</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px] h-12 border-border">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="0-10000">$0 - $10,000</SelectItem>
                <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                <SelectItem value="50000+">$50,000+</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-12 px-8 rounded-lg font-semibold ml-auto">
              Search
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 underline underline-offset-4 decoration-2">
            Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SUVs Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">SUVs</h3>
                  <p className="text-sm text-muted-foreground">Off-roading</p>
                </div>
                <img
                  src={suvIcon}
                  alt="SUV"
                  className="w-24 h-16 object-contain opacity-60"
                />
              </div>
            </div>

            {/* Sedans Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Sedans</h3>
                  <p className="text-sm text-muted-foreground">Comfort & Daily Use</p>
                </div>
                <img
                  src={sedanIcon}
                  alt="Sedan"
                  className="w-24 h-16 object-contain opacity-60"
                />
              </div>
            </div>

            {/* Trucks Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Trucks</h3>
                  <p className="text-sm text-muted-foreground">Towing & Transport</p>
                </div>
                <img
                  src={truckIcon}
                  alt="Truck"
                  className="w-24 h-16 object-contain opacity-60"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
