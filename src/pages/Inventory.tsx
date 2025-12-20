import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Car,
  DollarSign,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const stats = [
    {
      label: "Total Listings",
      value: "24",
      change: "+3",
      isPositive: true,
      icon: Car,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Active Auctions",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-accent-gold/10 text-accent-gold",
    },
    {
      label: "Total Value",
      value: "$842,500",
      change: "+12%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-500/10 text-green-600",
    },
    {
      label: "Pending Sales",
      value: "5",
      change: "-1",
      isPositive: false,
      icon: Package,
      color: "bg-accent-racing/10 text-accent-racing",
    },
  ];

  const listings = [
    {
      id: "1",
      title: "2023 Toyota Camry XSE",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100",
      price: 32500,
      status: "active",
      views: 245,
      inquiries: 12,
      type: "buy-now",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "2022 BMW X5 xDrive40i",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100",
      price: 58900,
      currentBid: 52000,
      status: "auction",
      views: 892,
      inquiries: 34,
      type: "auction",
      timeLeft: "2d 5h",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      title: "2024 Tesla Model 3",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100",
      price: 42000,
      status: "pending",
      views: 1205,
      inquiries: 28,
      type: "buy-now",
      createdAt: "2024-01-08",
    },
    {
      id: "4",
      title: "2023 Mercedes-Benz C300",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100",
      price: 47500,
      status: "sold",
      views: 567,
      inquiries: 15,
      type: "buy-now",
      createdAt: "2024-01-05",
    },
    {
      id: "5",
      title: "2023 Porsche 911 Carrera S",
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=100",
      price: 135000,
      currentBid: 128000,
      status: "auction",
      views: 2341,
      inquiries: 89,
      type: "auction",
      timeLeft: "5h 30m",
      createdAt: "2024-01-12",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/10 text-green-600 border-green-500/20",
      auction: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
      pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      sold: "bg-muted text-muted-foreground border-border",
      draft: "bg-muted text-muted-foreground border-border",
    };

    return (
      <Badge variant="outline" className={`${styles[status]} capitalize font-medium`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              My <span className="text-gradient">Inventory</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your vehicle listings, track performance, and monitor sales
            </p>
          </div>
          <Button className="rounded-xl px-6 shadow-premium hover:shadow-premium-lg transition-all" asChild>
            <Link to="/create-listing">
              <Plus className="w-5 h-5 mr-2" />
              New Listing
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border/50 p-5 shadow-premium animate-fade-in hover:shadow-premium-lg transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.isPositive ? "text-green-600" : "text-accent-racing"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-card rounded-2xl border border-border/50 p-4 mb-6 shadow-premium animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search your listings..."
                className="pl-12 h-11 rounded-xl border-border/50"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 h-11 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="auction">In Auction</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40 h-11 rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy-now">Buy Now</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-premium overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-heading font-semibold">Vehicle</TableHead>
                <TableHead className="font-heading font-semibold">Price / Bid</TableHead>
                <TableHead className="font-heading font-semibold">Status</TableHead>
                <TableHead className="font-heading font-semibold hidden md:table-cell">Views</TableHead>
                <TableHead className="font-heading font-semibold hidden lg:table-cell">Inquiries</TableHead>
                <TableHead className="font-heading font-semibold hidden lg:table-cell">Created</TableHead>
                <TableHead className="font-heading font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing, index) => (
                <TableRow
                  key={listing.id}
                  className="hover:bg-muted/50 border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{listing.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {listing.type === "auction" && listing.timeLeft
                            ? `⏱ ${listing.timeLeft} left`
                            : listing.type.replace("-", " ")}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-heading font-bold text-foreground">
                        ${listing.currentBid?.toLocaleString() || listing.price.toLocaleString()}
                      </p>
                      {listing.currentBid && (
                        <p className="text-xs text-muted-foreground">
                          Ask: ${listing.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(listing.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground">{listing.views.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground">{listing.inquiries}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-muted-foreground">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-accent-racing focus:text-accent-racing">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {listings.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">No listings yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first listing to start selling
              </p>
              <Button className="rounded-xl" asChild>
                <Link to="/create-listing">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Listing
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-5</span> of{" "}
            <span className="font-medium text-foreground">24</span> listings
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
