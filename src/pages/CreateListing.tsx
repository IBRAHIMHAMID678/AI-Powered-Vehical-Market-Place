import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Upload,
  Car,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  Camera,
  X,
} from "lucide-react";
import { useState } from "react";

const CreateListing = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isAuction, setIsAuction] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Vehicle Details", icon: Car },
    { id: 2, title: "Photos", icon: ImageIcon },
    { id: 3, title: "Pricing", icon: DollarSign },
    { id: 4, title: "Description", icon: FileText },
  ];

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz", "Audi", "Tesla", "Porsche", "Chevrolet", "Lexus"];
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible", "Van", "Wagon"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
  const transmissions = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
  const colors = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Brown", "Beige", "Gold"];

  const handleImageUpload = () => {
    // Simulating image upload
    const newImage = `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 12)}?w=300`;
    setImages([...images, newImage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Listing
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Create Your <span className="text-gradient">Listing</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            List your vehicle in minutes with our intelligent form. Our AI will help optimize your listing for maximum visibility.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-premium"
                    : currentStep > step.id
                    ? "bg-primary/20 text-primary"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep === step.id
                      ? "bg-primary-foreground/20"
                      : currentStep > step.id
                      ? "bg-primary/30"
                      : "bg-muted"
                  }`}
                >
                  {step.id}
                </div>
                <span className="hidden md:block font-medium whitespace-nowrap">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground mx-2 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-3xl border border-border/50 shadow-premium-lg p-6 md:p-8 animate-fade-in">
          {/* Step 1: Vehicle Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Vehicle Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Make *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map((make) => (
                        <SelectItem key={make} value={make.toLowerCase()}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Model *</Label>
                  <Input placeholder="e.g., Camry, Civic, F-150" className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label>Year *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Body Type *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bodyTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mileage *</Label>
                  <Input placeholder="e.g., 25000" type="number" className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label>VIN (Optional)</Label>
                  <Input placeholder="17-character VIN" className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label>Fuel Type *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map((fuel) => (
                        <SelectItem key={fuel} value={fuel.toLowerCase()}>
                          {fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Transmission *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      {transmissions.map((trans) => (
                        <SelectItem key={trans} value={trans.toLowerCase()}>
                          {trans}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Exterior Color *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color.toLowerCase()}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Interior Color *</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color.toLowerCase()}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Upload Photos</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Add high-quality photos to attract more buyers. We recommend at least 8 photos.
              </p>

              {/* Upload Area */}
              <div
                onClick={handleImageUpload}
                className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 hover:bg-primary/5 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <p className="font-medium text-foreground mb-1">Click to upload photos</p>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
              </div>

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-muted rounded-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <button
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 p-1.5 bg-accent-charcoal/80 text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-accent-charcoal/80 text-primary-foreground text-xs px-2 py-1 rounded">
                        Photo {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tips */}
              <div className="bg-primary/5 rounded-2xl p-5 mt-6">
                <h4 className="font-semibold text-foreground mb-3">📸 Photo Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Include exterior shots from all angles</li>
                  <li>• Capture the dashboard and interior</li>
                  <li>• Show the engine bay and trunk</li>
                  <li>• Highlight any special features or upgrades</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Set Your Price</h2>

              {/* Listing Type Toggle */}
              <div className="bg-muted/50 rounded-2xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">Enable Auction</p>
                    <p className="text-sm text-muted-foreground">
                      Let buyers bid on your vehicle instead of a fixed price
                    </p>
                  </div>
                  <Switch checked={isAuction} onCheckedChange={setIsAuction} />
                </div>
              </div>

              {isAuction ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Starting Bid *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="10,000" type="number" className="h-12 pl-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Reserve Price (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="15,000" type="number" className="h-12 pl-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Auction Duration *</Label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Buy Now Price (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="25,000" type="number" className="h-12 pl-12 rounded-xl" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Asking Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="25,000" type="number" className="h-12 pl-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2 flex items-end">
                    <div className="flex items-center gap-3 h-12 bg-muted/50 rounded-xl px-4">
                      <Switch />
                      <span className="text-sm text-muted-foreground">Accept offers</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Price Suggestion */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-5 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">AI Price Suggestion</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Based on market analysis, similar vehicles are selling for:
                    </p>
                    <p className="font-heading text-2xl font-bold text-primary">$22,500 - $26,800</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Description */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Describe Your Vehicle</h2>

              <div className="space-y-2">
                <Label>Listing Title *</Label>
                <Input
                  placeholder="e.g., 2023 Toyota Camry XSE - Low Miles, One Owner"
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Description *</Label>
                  <Button variant="ghost" size="sm" className="text-primary">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  placeholder="Describe your vehicle's condition, features, history, and any modifications..."
                  className="min-h-[200px] rounded-xl resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Key Features (Optional)</Label>
                <Textarea
                  placeholder="• Leather seats&#10;• Sunroof&#10;• Backup camera&#10;• Heated seats"
                  className="min-h-[120px] rounded-xl resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Your Location *</Label>
                <Input placeholder="City, State" className="h-12 rounded-xl" />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="rounded-xl px-6"
            >
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="rounded-xl px-8 shadow-premium hover:shadow-premium-lg transition-all"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button className="rounded-xl px-8 shadow-premium hover:shadow-premium-lg transition-all bg-gradient-to-r from-primary to-primary/80">
                <Upload className="w-4 h-4 mr-2" />
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateListing;
