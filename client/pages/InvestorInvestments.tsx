import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Home,
  Star,
  TrendingUp,
  Settings,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  CreditCard,
  Building,
  QrCode,
  Copy,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Wallet,
  Landmark,
  Smartphone,
  Clock,
  Shield,
  Filter,
  Calendar,
  Percent,
  TrendingDown,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Target,
  Award,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useRBAC } from "../hooks/useRBAC";
import { useMenu } from "../contexts/MenuContext";
import LanguageSwitch from "../components/LanguageSwitch";
import WalletConnect from "../components/WalletConnect";
import MobileMenu from "../components/MobileMenu";

const InvestorInvestments = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, isLender, isBorrower } = useRBAC();
  const { isMobileMenuOpen } = useMenu();
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const handleLogout = async () => {
    await logout();
  };

  const investments = [
    {
      id: 1,
      title: "TechGrow Software Development",
      description: "Desenvolvimento de software para crescimento de agroindústria",
      category: "Tech",
      amount: 15000,
      return: 1230,
      apy: 8.2,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-07-15",
      progress: 65,
      monthlyPayment: 102.50,
      nextPayment: "2024-04-15",
      risk: "Baixo",
      collateral: "Imóvel comercial",
    },
    {
      id: 2,
      title: "Fresh Eats Cafe Expansion",
      description: "Expansão de cafeteria com foco em produtos orgânicos",
      category: "Food",
      amount: 8500,
      return: 552,
      apy: 6.5,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      progress: 35,
      monthlyPayment: 46.00,
      nextPayment: "2024-04-01",
      risk: "Médio",
      collateral: "Equipamentos",
    },
    {
      id: 3,
      title: "Urban Apparel Manufacturing",
      description: "Produção de roupas urbanas sustentáveis",
      category: "Fashion",
      amount: 12000,
      return: 696,
      apy: 5.8,
      status: "completed",
      startDate: "2023-08-01",
      endDate: "2024-02-01",
      progress: 100,
      monthlyPayment: 58.00,
      nextPayment: "Finalizado",
      risk: "Baixo",
      collateral: "Maquinário industrial",
    },
    {
      id: 4,
      title: "Green Energy Solar Panels",
      description: "Instalação de painéis solares para propriedade rural",
      category: "Energy",
      amount: 25000,
      return: 0,
      apy: 4.2,
      status: "pending",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      progress: 25,
      monthlyPayment: 87.50,
      nextPayment: "2024-04-01",
      risk: "Médio",
      collateral: "Painéis solares",
    },
    {
      id: 5,
      title: "Organic Farm Equipment",
      description: "Aquisição de equipamentos para produção orgânica certificada",
      category: "Agriculture",
      amount: 18000,
      return: 0,
      apy: 5.1,
      status: "pending",
      startDate: "2024-03-10",
      endDate: "2024-09-10",
      progress: 90,
      monthlyPayment: 76.50,
      nextPayment: "2024-04-10",
      risk: "Baixo",
      collateral: "Equipamentos agrícolas",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo":
        return "bg-green-500/20 text-green-600";
      case "Médio":
        return "bg-yellow-500/20 text-yellow-600";
      case "Alto":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const filteredInvestments = filterStatus === "all" 
    ? investments 
    : investments.filter(investment => investment.status === filterStatus);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = investments.reduce((sum, inv) => sum + inv.return, 0);
  const averageApy = investments.reduce((sum, inv) => sum + inv.apy, 0) / investments.length;

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
        <div className="hidden lg:block w-full lg:w-64 bg-sidebar p-4 lg:p-6 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center mb-6 lg:mb-8">
            <svg
              className="h-6 lg:h-8 w-auto"
              viewBox="0 0 442 149"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z"
                fill="url(#paint0_linear_logo_investor)"
              />
              <path
                d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                fill="url(#paint1_linear_logo_investor)"
              />
              <text
                fill="white"
                style={{ whiteSpace: "pre" }}
                fontFamily="Inter, sans-serif"
                fontSize="54.7487"
                fontWeight="600"
                letterSpacing="0em"
              >
                <tspan x="199.152" y="94.2104">
                  FINANCE
                </tspan>
              </text>
              <defs>
                <linearGradient
                  id="paint0_linear_logo_investor"
                  x1="114.487"
                  y1="150.065"
                  x2="160.147"
                  y2="0.214775"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#00D7CC" />
                  <stop offset="0.975962" stopColor="#004EF6" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_logo_investor"
                  x1="20.414"
                  y1="150.168"
                  x2="54.1142"
                  y2="-5.3753"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#00D7CC" />
                  <stop offset="0.975962" stopColor="#004EF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              to="/investor/dashboard"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/investor/ranking"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Trophy className="w-4 h-4" />
              Ranking
            </Link>
            <Link
              to="/investor/investments"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              Investimentos
            </Link>
            <Link
              to="/investor/contributions"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <BarChart3 className="w-4 h-4" />
              Lances Contribuídos
            </Link>
            <Link
              to="/investor/settings"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </Link>
          </nav>

          {/* Support */}
          <div className="mt-auto pt-8">
            <Link
              to="/investor/support"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
            >
              <HelpCircle className="w-4 h-4" />
              Suporte
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card/20 px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
              <div className="flex items-center gap-3 lg:gap-4">
                <Link to="/investor/dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Voltar ao Dashboard</span>
                    <span className="sm:hidden">Voltar</span>
                  </Button>
                </Link>
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
                  <WalletConnect />
                  
                  <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      {user?.user_metadata?.avatar_url && (
                        <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                        <span className="text-xs text-muted-foreground">
                          @{user?.email ? user.email.split("@")[0] : "usuario"}
                        </span>
                      </div>
                    </div>
                  </div>

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

          {/* Main Content */}
          <main className="p-4 lg:p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "Dashboard", href: "/investor/dashboard" },
                { label: "Detalhes dos Investimentos" },
              ]}
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                  Detalhes dos Investimentos
                </h1>
                <p className="text-sm lg:text-base text-foreground">
                  Acompanhe o desempenho de todos os seus investimentos
                </p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-card/20 rounded-xl p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-foreground mb-1">Total Investido</p>
                    <p className="text-lg lg:text-xl font-bold text-foreground">
                      R$ {totalInvested.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-foreground mb-1">Retorno Total</p>
                    <p className="text-lg lg:text-xl font-bold text-green-600">
                      R$ {totalReturn.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 lg:w-6 h-5 lg:h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-foreground mb-1">APY Médio</p>
                    <p className="text-lg lg:text-xl font-bold text-blue-600">
                      {averageApy.toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Percent className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-foreground mb-1">Investimentos Ativos</p>
                    <p className="text-lg lg:text-xl font-bold text-purple-600">
                      {investments.filter(inv => inv.status === "active").length}
                    </p>
                  </div>
                  <div className="w-10 lg:w-12 h-10 lg:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 lg:w-6 h-5 lg:h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-foreground" />
                <span className="text-sm lg:text-base text-foreground">Filtrar por:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                  className="whitespace-nowrap"
                >
                  Todos
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                  className="whitespace-nowrap"
                >
                  Ativos
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                  className="whitespace-nowrap"
                >
                  Concluídos
                </Button>
                <Button
                  variant={filterStatus === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                  className="whitespace-nowrap"
                >
                  Pendentes
                </Button>
              </div>
            </div>

            {/* Investments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {filteredInvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="bg-card/20 rounded-xl p-4 lg:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 lg:mb-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-muted rounded-full flex items-center justify-center">
                        <Building className="w-4 lg:w-5 h-4 lg:h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base lg:text-lg text-foreground line-clamp-1">
                          {investment.title}
                        </h3>
                        <p className="text-xs lg:text-sm text-foreground line-clamp-2">
                          {investment.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(investment.status)} border text-xs`}
                    >
                      {getStatusText(investment.status)}
                    </Badge>
                  </div>

                  {/* Category and Risk */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 lg:mb-4">
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary text-xs">
                      {investment.category}
                    </Badge>
                    <Badge variant="outline" className={`${getRiskColor(investment.risk)} text-xs`}>
                      Risco: {investment.risk}
                    </Badge>
                  </div>

                  {/* Investment Details */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <div>
                      <div className="text-xs lg:text-sm text-foreground">Valor Investido</div>
                      <div className="font-semibold text-sm lg:text-base text-foreground">
                        R$ {investment.amount.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs lg:text-sm text-foreground">Retorno</div>
                      <div className="font-semibold text-sm lg:text-base text-green-600">
                        R$ {investment.return.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs lg:text-sm text-foreground">APY</div>
                      <div className="font-semibold text-sm lg:text-base text-blue-600">
                        {investment.apy}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs lg:text-sm text-foreground">Pagamento Mensal</div>
                      <div className="font-semibold text-sm lg:text-base text-foreground">
                        R$ {investment.monthlyPayment.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2 mb-3 lg:mb-4">
                    <div className="flex justify-between text-xs lg:text-sm">
                      <span className="text-foreground">Progresso do Projeto</span>
                      <span className="font-semibold text-foreground">
                        {investment.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-primary h-2 rounded-full relative overflow-hidden"
                        style={{ width: `${investment.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4 text-xs lg:text-sm">
                    <div>
                      <div className="text-foreground">Início</div>
                      <div className="font-medium text-foreground">
                        {new Date(investment.startDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <div className="text-foreground">Fim</div>
                      <div className="font-medium text-foreground">
                        {new Date(investment.endDate).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Next Payment */}
                  <div className="bg-muted/50 rounded-lg p-2 lg:p-3 mb-3 lg:mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 lg:w-4 h-3 lg:h-4 text-foreground" />
                      <div>
                        <div className="text-xs lg:text-sm text-foreground">Próximo Pagamento</div>
                        <div className="font-medium text-xs lg:text-sm text-foreground">
                          {investment.nextPayment === "Finalizado" 
                            ? "Projeto Finalizado" 
                            : new Date(investment.nextPayment).toLocaleDateString('pt-BR')
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collateral */}
                  <div className="bg-primary/10 rounded-lg p-2 lg:p-3 mb-3 lg:mb-4 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 lg:w-4 h-3 lg:h-4 text-primary" />
                      <div>
                        <div className="text-xs lg:text-sm text-foreground">Garantia</div>
                        <div className="font-medium text-xs lg:text-sm text-foreground">
                          {investment.collateral}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/investor/investment/${investment.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-3 lg:w-4 h-3 lg:h-4 mr-2" />
                        <span className="hidden sm:inline">Ver Detalhes</span>
                        <span className="sm:hidden">Detalhes</span>
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-3 lg:w-4 h-3 lg:h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredInvestments.length === 0 && (
              <div className="text-center py-8 lg:py-12">
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Target className="w-6 lg:w-8 h-6 lg:h-8 text-foreground" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">
                  Nenhum investimento encontrado
                </h3>
                <p className="text-sm lg:text-base text-foreground mb-4 lg:mb-6">
                  {filterStatus === "all" 
                    ? "Você ainda não fez nenhum investimento. Comece explorando os lances disponíveis!"
                    : `Não há investimentos com status "${getStatusText(filterStatus)}" no momento.`
                  }
                </p>
                {filterStatus === "all" && (
                  <Link to="/investor/dashboard">
                    <Button className="bg-primary hover:bg-primary/80 transition-colors w-full sm:w-auto">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Explorar Investimentos
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorInvestments; 