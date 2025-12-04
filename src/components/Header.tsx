import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              to="/"
              className="text-foreground font-medium hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Home
            </Link>
            <Link
              to="/auctions"
              className="text-muted-foreground font-medium hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Auctions
            </Link>
            <Link
              to="/buy-now"
              className="text-muted-foreground font-medium hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Buy Now
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              className="px-6 h-11 rounded-xl font-semibold shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              variant="outline"
              className="px-6 h-11 rounded-xl font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              asChild
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground font-medium px-2 py-2 hover:bg-muted rounded-lg">
                Home
              </Link>
              <Link to="/auctions" className="text-muted-foreground font-medium px-2 py-2 hover:bg-muted rounded-lg">
                Auctions
              </Link>
              <Link to="/buy-now" className="text-muted-foreground font-medium px-2 py-2 hover:bg-muted rounded-lg">
                Buy Now
              </Link>
              <div className="flex gap-3 pt-2">
                <Button className="flex-1" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
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