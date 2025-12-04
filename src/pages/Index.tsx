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
        <section className="mb-12 lg:mb-16 animate-fade-in">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold tracking-wide text-sm mb-4 uppercase">
              AI-Powered Vehicle Marketplace
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Find Your Perfect{" "}
              <span className="text-gradient">Vehicle</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover thousands of vehicles with intelligent AI assistance. Buy, sell, or bid with confidence.
            </p>
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