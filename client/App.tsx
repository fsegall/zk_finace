import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserSelection from "./pages/UserSelection";
import LenderDashboard from "./pages/LenderDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import InvestorRanking from "./pages/InvestorRanking";
import KYCVerification from "./pages/KYCVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-selection" element={<UserSelection />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
          <Route path="/lender/dashboard" element={<LenderDashboard />} />
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/investor/ranking" element={<InvestorRanking />} />
          <Route path="/dashboard" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
