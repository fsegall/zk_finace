import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserSelection from "./pages/UserSelection";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import BorrowerLances from "./pages/BorrowerLances";
import CreditRequest from "./pages/CreditRequest";
import CreateLance from "./pages/CreateLance";
import LanceDetails from "./pages/LanceDetails";
import InvestorDashboard from "./pages/InvestorDashboard";
import InvestorDeposit from "./pages/InvestorDeposit";
import InvestorWithdraw from "./pages/InvestorWithdraw";
import InvestorInvestments from "./pages/InvestorInvestments";
import InvestmentDetails from "./pages/InvestmentDetails";
import InvestorRanking from "./pages/InvestorRanking";
import KYCVerification from "./pages/KYCVerification";
import CollateralRegistration from "./pages/CollateralRegistration";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import InvestorContributions from "./pages/InvestorContributions";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-selection" element={<UserSelection />} />
                <Route path="/kyc-verification" element={<KYCVerification />} />
                <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
                <Route path="/borrower/lances" element={<BorrowerLances />} />
                <Route path="/borrower/lance/:id" element={<LanceDetails />} />
                <Route path="/borrower/create-lance" element={<CreateLance />} />
                <Route path="/borrower/credit-request/:lanceId" element={<CreditRequest />} />
                <Route
                  path="/borrower/collateral"
                  element={<CollateralRegistration />}
                />
                <Route path="/borrower/wallet" element={<Wallet />} />
                <Route path="/borrower/settings" element={<Settings />} />
                <Route path="/borrower/support" element={<Support />} />
                <Route path="/investor/dashboard" element={<InvestorDashboard />} />
                <Route path="/investor/deposit" element={<InvestorDeposit />} />
                <Route path="/investor/withdraw" element={<InvestorWithdraw />} />
                <Route path="/investor/investments" element={<InvestorInvestments />} />
                <Route path="/investor/investment/:investmentId" element={<InvestmentDetails />} />
                <Route path="/investor/contributions" element={<InvestorContributions />} />
                <Route path="/investor/settings" element={<Settings />} />
                <Route path="/investor/support" element={<Support />} />
                <Route path="/investor/ranking" element={<InvestorRanking />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
