import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  listingCount: string;
  image: string;
  delay?: number;
}

const CategoryCard = ({ title, subtitle, listingCount, image, delay = 0 }: CategoryCardProps) => {
  return (
    <div
      className="group bg-card rounded-2xl p-6 shadow-premium hover-scale-glow cursor-pointer border border-transparent hover:border-primary/20 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-xs text-primary font-semibold pt-2">{listingCount} listings</p>
        </div>
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-28 h-20 object-contain opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:-translate-x-2"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Browse {title}</span>
        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default CategoryCard;