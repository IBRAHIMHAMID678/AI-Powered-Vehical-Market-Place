import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import suvIcon from "@/assets/suv-icon.png";
import sedanIcon from "@/assets/sedan-icon.png";
import truckIcon from "@/assets/truck-icon.png";

const Index = () => {
  const categories = [
    {
      title: "SUVs",
      subtitle: "Off-roading & Adventure",
      listingCount: "2,450+",
      image: suvIcon,
    },
    {
      title: "Sedans",
      subtitle: "Comfort & Daily Use",
      listingCount: "3,120+",
      image: sedanIcon,
    },
    {
      title: "Trucks",
      subtitle: "Towing & Transport",
      listingCount: "1,890+",
      image: truckIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative mb-12 lg:mb-16 animate-fade-in rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop"
              alt="Luxury Car Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl py-20 px-8 md:px-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Vehicle Marketplace
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Find Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-racing">Dream Ride</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              Experience the future of car buying with our intelligent AI assistance.
              Analyze market prices, predict value, and bid with confidence.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                Browse Inventory
              </button>
              <button className="bg-white/50 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/80 px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                Sell Your Car
              </button>
            </div>
          </div>
        </section>

        {/* Search Filters */}
        <section className="mb-16 lg:mb-20">
          <SearchBar />
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Browse Categories
              </h2>
              <p className="text-muted-foreground mt-1">
                Explore our curated vehicle categories
              </p>
            </div>
            <a
              href="#"
              className="hidden sm:flex items-center text-primary font-medium hover:underline"
            >
              View All Categories
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                subtitle={category.subtitle}
                listingCount={category.listingCount}
                image={category.image}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-20 py-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: "0ms" }}>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary">15K+</p>
              <p className="text-sm text-muted-foreground mt-1">Active Listings</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary">8K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground mt-1">Verified Dealers</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;