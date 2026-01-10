import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, Plus, Package, User, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  const [user, setUser] = useState<any>(null);

  useState(() => {
    // Check for user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data");
      }
    }
  });

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/buy-now", label: "Buy Now" },
    { path: "/auctions", label: "Auctions" },
    { path: "/inventory", label: "Inventory", icon: Package },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-racing rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative h-10 w-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              Auto<span className="text-primary">Market</span>
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 font-medium text-sm transition-all duration-200 relative py-2 px-1 hover:text-primary ${isActive(link.path) ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="px-5 h-10 rounded-xl font-semibold border-border/50 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <Link to="/create-listing">
                <Plus className="w-4 h-4 mr-1.5" />
                Sell Car
              </Link>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-4 h-10 rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-premium">
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="px-6 h-10 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <Link to="/login">Sign In</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 circle-button hover:bg-muted"
              onClick={toggleTheme}
            >
              {isDark ? '🌞' : '🌙'}
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
                  className={`flex items-center gap-2 font-medium px-3 py-2.5 rounded-xl transition-colors ${isActive(link.path)
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
                {user ? (
                  <Button onClick={handleSignOut} variant="outline" className="flex-1 rounded-xl">
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button className="flex-1 rounded-xl" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;