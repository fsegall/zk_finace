import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Home,
  TrendingUp,
  Wallet,
  Settings,
  ChevronDown,
  Plus,
  Filter,
  ArrowLeft,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Upload,
  MapPin,
  Phone,
  Mail,
  Building,
  Target,
  Shield,
  CreditCard,
  Landmark,
  Smartphone,
  Save,
  Send,
  Image,
  Video,
  Link as LinkIcon,
  BarChart3,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useRBAC } from "../hooks/useRBAC";
import { useLanguage } from "../contexts/LanguageContext";
import { useMenu } from "../contexts/MenuContext";
import LanguageSwitch from "../components/LanguageSwitch";
import WalletConnect from "../components/WalletConnect";
import MobileMenu from "../components/MobileMenu";
import { Logo } from "../components/Logo";

const InvestorDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { logout, user, profile } = useAuth();
  const { isAdmin, isLender, isBorrower } = useRBAC();
  const { isMobileMenuOpen } = useMenu();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const sidebarItems = [
    { icon: Home, label: t('dashboard.title'), active: true },
    { icon: TrendingUp, label: t('dashboard.investments'), active: false },
    { icon: BarChart3, label: t('dashboard.contributions'), active: false },
    { icon: Trophy, label: t('dashboard.ranking'), active: false },
    { icon: Settings, label: t('dashboard.settings'), active: false },
  ];

  const investments = [
    {
      id: 1,
      title: "TechGrow Software Development",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Tech",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
      progress: 65,
      raised: "R$32.000",
      goal: "R$50.000",
      myInvestment: "R$5.000",
    },
    {
      id: 2,
      title: "Fresh Eats Cafe Expansion",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "João Silva",
      category: "Food",
      value: "R$78.560,00",
      interest: "6.3% APR",
      expires: "10 dias",
      progress: 35,
      raised: "R$20.000",
      goal: "R$50.000",
      myInvestment: "R$3.000",
    },
    {
      id: 3,
      title: "Urban Apparel Manufacturing",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Ana Costa",
      category: "Fashion",
      value: "R$6.423,00",
      interest: "3.7% APR",
      expires: "28 dias",
      progress: 65,
      raised: "R$1.000",
      goal: "R$50.000",
      myInvestment: "R$1.500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #004EF6 0%, #002168 70.19%, #00022A 87.98%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className={`hidden lg:block w-full lg:w-64 bg-sidebar p-4 lg:p-6 transition-all duration-300`}>
          {/* Logo */}
          <div className="flex items-center mb-6 lg:mb-8">
            <Logo size="md" />
          </div>

          {/* Navigation */}
          <nav className="space-y-1 lg:space-y-2">
            <Link
              to="/investor/dashboard"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Home className="w-3 h-3 lg:w-4 lg:h-4" />
              {t('dashboard.title')}
            </Link>
            <Link
              to="/investor/investments"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
              {t('dashboard.investments')}
            </Link>
            <Link
              to="/investor/contributions"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <BarChart3 className="w-3 h-3 lg:w-4 lg:h-4" />
              {t('dashboard.contributions')}
            </Link>
            <Link
              to="/investor/ranking"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Trophy className="w-3 h-3 lg:w-4 lg:h-4" />
              {t('dashboard.ranking')}
            </Link>
            <Link
              to="/investor/settings"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Settings className="w-3 h-3 lg:w-4 lg:h-4" />
              {t('dashboard.settings')}
            </Link>
          </nav>

          {/* Support */}
          <div className="mt-auto pt-6 lg:pt-8 space-y-1 lg:space-y-2">
            <Link
              to="/kyc-verification"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg`}
            >
              <span className="text-xs">←</span>
              {t('dashboard.backToKYC')}
            </Link>
            <Link
              to="/investor/support"
              className={`w-full flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg`}
            >
              <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-sidebar-foreground flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
              {t('dashboard.support')}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card/20 px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input
                  placeholder={t('dashboard.search')}
                  className="pl-10 bg-muted border-0 text-foreground placeholder:text-foreground text-sm"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-4">
                {/* Mobile Menu */}
                <MobileMenu userType="investor" />
                
                {/* Mobile Wallet - Always Visible */}
                <div className="lg:hidden">
                  <WalletConnect />
                </div>
                
                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-6">
                  <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      {user?.user_metadata?.avatar_url && (
                        <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                      )}
                      <span className="text-sm">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                      <span className="text-xs text-foreground">
                        @{user?.email ? user.email.split("@")[0] : "usuario"}
                      </span>
                      {isAdmin && (
                        <Link to="/admin" className="ml-2 px-2 py-0.5 rounded bg-primary text-primary-foreground text-xs hover:underline">
                          Admin
                        </Link>
                      )}
                      {isLender && <span className="ml-2 px-2 py-0.5 rounded bg-success text-success-foreground text-xs">Investidor</span>}
                      {isBorrower && <span className="ml-2 px-2 py-0.5 rounded bg-warning text-warning-foreground text-xs">Tomador</span>}
                    </div>
                  </div>

                  <WalletConnect />
                  <LanguageSwitch />
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-muted/50 rounded-lg text-foreground transition-colors"
                  >
                    <span className="text-sm">{t('auth.logout')}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-4 lg:p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "Dashboard" },
              ]}
            />

            <div className="mt-6 lg:mt-8">
              {/* Welcome Section */}
              <div className="mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {t('dashboard.welcome')}, {profile?.full_name || user?.user_metadata?.full_name || "Usuário"}!
                </h1>
                <p className="text-foreground">
                  {t('dashboard.subtitle')}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <Link
                  to="/investor/investments"
                  className="bg-card/20 rounded-xl p-4 lg:p-6 hover:bg-card/30 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('dashboard.investments')}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground">
                    {t('dashboard.investmentsDesc')}
                  </p>
                </Link>

                <Link
                  to="/investor/contributions"
                  className="bg-card/20 rounded-xl p-4 lg:p-6 hover:bg-card/30 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('dashboard.contributions')}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground">
                    {t('dashboard.contributionsDesc')}
                  </p>
                </Link>

                <Link
                  to="/investor/ranking"
                  className="bg-card/20 rounded-xl p-4 lg:p-6 hover:bg-card/30 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-warning" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('dashboard.ranking')}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground">
                    {t('dashboard.rankingDesc')}
                  </p>
                </Link>

                <Link
                  to="/kyc-verification"
                  className="bg-card/20 rounded-xl p-4 lg:p-6 hover:bg-card/30 transition-colors border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-info/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-info" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t('dashboard.kyc')}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground">
                    {t('dashboard.kycDesc')}
                  </p>
                </Link>
              </div>

              {/* Recent Investments */}
              <div className="bg-card/20 rounded-xl p-4 lg:p-6 border border-border">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                    {t('dashboard.recentInvestments')}
                  </h2>
                  <Link
                    to="/investor/investments"
                    className="text-primary hover:text-primary/80 transition-colors text-sm"
                  >
                    {t('dashboard.viewAll')} →
                  </Link>
                </div>

                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="bg-muted/50 rounded-lg p-4 lg:p-6 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {investment.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {investment.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground mb-3">
                            {investment.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {investment.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {investment.value}
                            </span>
                            <span className="flex items-center gap-1">
                              <Percent className="w-4 h-4" />
                              {investment.interest}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {investment.expires}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-foreground">
                              {investment.myInvestment}
                            </div>
                            <div className="text-sm text-foreground">
                              {t('dashboard.myInvestment')}
                            </div>
                          </div>
                          <div className="w-full lg:w-32">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-foreground">{t('dashboard.progress')}</span>
                              <span className="text-foreground">{investment.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${investment.progress}%` }}
                              />
                            </div>
                          </div>
                          <Link
                            to={`/investor/investment/${investment.id}`}
                            className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            {t('dashboard.viewDetails')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
