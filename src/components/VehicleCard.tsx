import { Heart, MapPin, Fuel, Gauge, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-accent-racing text-accent-racing" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Auction Badge */}
        {isAuction && timeLeft && (
          <Badge className="absolute top-3 left-3 bg-accent-racing text-primary-foreground font-semibold">
            ⏱ {timeLeft}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{fuelType}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            {isAuction ? (
              <>
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="font-heading font-bold text-xl text-primary">
                  ${currentBid?.toLocaleString()}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">Price</p>
                <p className="font-heading font-bold text-xl text-foreground">
                  ${price.toLocaleString()}
                </p>
              </>
            )}
          </div>
          <Button
            size="sm"
            className="rounded-xl font-semibold shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {isAuction ? "Place Bid" : "View Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
