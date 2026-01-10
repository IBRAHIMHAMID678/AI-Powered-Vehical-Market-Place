import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyNow from "./pages/BuyNow";
import Auctions from "./pages/Auctions";
import CreateListing from "./pages/CreateListing";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";
import VehicleDetails from "./pages/VehicleDetails";
import { ChatBot } from "@/components/ChatBot";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <ChatBot />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
