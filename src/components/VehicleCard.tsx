import { Heart, MapPin, Fuel, Gauge, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface VehicleCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  year: number;
  mileage: string;
  fuelType: string;
  location: string;
  isAuction?: boolean;
  currentBid?: number;
  timeLeft?: string;
  delay?: number;
}

const VehicleCard = ({
  id,
  title,
  price,
  image,
  year,
  mileage,
  fuelType,
  location,
  isAuction = false,
  currentBid,
  timeLeft,
  delay = 0,
}: VehicleCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if this car is in user's favorites
    const checkFavorite = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/auth/favorites', {
          headers: { 'x-auth-token': token }
        });
        const favorites = await res.json();
        if (Array.isArray(favorites) && favorites.some((fav: any) => fav === id || fav._id === id)) {
          setIsFavorite(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkFavorite();
  }, [id]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      if (confirm("You must be logged in to save cars. Proceed to login?")) {
        navigate('/login');
      }
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/favorites/${id}`, {
        method: 'POST',
        headers: { 'x-auth-token': token }
      });
      if (res.ok) {
        setIsFavorite(!isFavorite);
      } else {
        const txt = await res.text();
        console.error("Failed to toggle favorite:", txt);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop";
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-background/60 backdrop-blur-md text-foreground border-white/20 hover:bg-background/80 transition-colors">
            {year}
          </Badge>
          <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground border-none">
            Verified
          </Badge>
          {isAuction && timeLeft && (
            <Badge variant="destructive" className="animate-pulse shadow-lg">
              {timeLeft} left
            </Badge>
          )}
        </div>
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isFavorite ? "fill-accent-racing text-accent-racing" : "text-white"
              }`}
          />
        </button>

        {/* Bottom Info Overlay (on image) */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 text-xs font-medium bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{year} • {fuelType}</p>
          <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
            <Gauge className="w-4 h-4 text-primary" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
            <Fuel className="w-4 h-4 text-primary" />
            <span>{fuelType}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            {isAuction ? (
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Bid</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-primary">PKR</span>
                  <span className="font-heading font-bold text-xl text-foreground">
                    {currentBid?.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Price</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-primary">PKR</span>
                  <span className="font-heading font-bold text-xl text-foreground">
                    {price.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Link to={`/vehicles/${id}`}>
            <Button
              size="sm"
              className="rounded-xl px-5 font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              {isAuction ? "Bid Now" : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
