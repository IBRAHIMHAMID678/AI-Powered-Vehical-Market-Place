import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, Plus, Package } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/buy-now", label: "Buy Now" },
    { path: "/auctions", label: "Auctions" },
    { path: "/inventory", label: "Inventory", icon: Package },
  ];

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="Automotive AI Vehicle Marketplace"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                  isActive(link.path) ? "text-primary after:w-full" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="px-5 h-11 rounded-xl font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              asChild
            >
              <Link to="/create-listing">
                <Plus className="w-4 h-4 mr-1.5" />
                Sell
              </Link>
            </Button>
            <Button
              className="px-6 h-11 rounded-xl font-semibold shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 font-medium px-3 py-2.5 rounded-xl transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              <Link
                to="/create-listing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 font-medium px-3 py-2.5 rounded-xl text-primary bg-primary/10"
              >
                <Plus className="w-4 h-4" />
                Create Listing
              </Link>
              <div className="flex gap-3 pt-3 mt-2 border-t border-border">
                <Button className="flex-1 rounded-xl" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;