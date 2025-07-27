import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRBAC } from "@/hooks/useRBAC";
import { useMenu } from "@/contexts/MenuContext";
import LanguageSwitch from "@/components/LanguageSwitch";
import WalletConnect from "@/components/WalletConnect";
import MobileMenu from "@/components/MobileMenu";
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
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp as TrendingUpIcon,
  Calendar,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  BarChart3,
} from "lucide-react";

const InvestorContributions = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, isLender, isBorrower } = useRBAC();
  const { isMobileMenuOpen } = useMenu();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const contributions = [
    {
      id: 1,
      borrower: "Maria Cardoso",
      project: "Expansão de Restaurante",
      amountInvested: 15000,
      amountReceived: 8750,
      expectedReturn: 18750,
      interestRate: 12.5,
      monthsRemaining: 8,
      totalMonths: 24,
      status: "Adimplente",
      lastPayment: "15/03/2024",
      nextPayment: "15/04/2024",
      monthlyPayment: 781.25,
      category: "Comércio",
      risk: "Baixo",
    },
    {
      id: 2,
      borrower: "João Silva",
      project: "Reforma de Casa",
      amountInvested: 25000,
      amountReceived: 15625,
      expectedReturn: 31250,
      interestRate: 10.0,
      monthsRemaining: 12,
      totalMonths: 36,
      status: "Adimplente",
      lastPayment: "10/03/2024",
      nextPayment: "10/04/2024",
      monthlyPayment: 868.06,
      category: "Imobiliário",
      risk: "Médio",
    },
    {
      id: 3,
      borrower: "Ana Costa",
      project: "Abertura de Loja",
      amountInvested: 8000,
      amountReceived: 4800,
      expectedReturn: 9600,
      interestRate: 15.0,
      monthsRemaining: 6,
      totalMonths: 18,
      status: "Adimplente",
      lastPayment: "20/03/2024",
      nextPayment: "20/04/2024",
      monthlyPayment: 533.33,
      category: "Comércio",
      risk: "Alto",
    },
    {
      id: 4,
      borrower: "Carlos Santos",
      project: "Compra de Equipamentos",
      amountInvested: 12000,
      amountReceived: 7200,
      expectedReturn: 14400,
      interestRate: 11.5,
      monthsRemaining: 10,
      totalMonths: 24,
      status: "Adimplente",
      lastPayment: "05/03/2024",
      nextPayment: "05/04/2024",
      monthlyPayment: 600.00,
      category: "Tecnologia",
      risk: "Médio",
    },
  ];

  const filteredContributions = contributions.filter(
    (contribution) =>
      contribution.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contribution.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalInvested = contributions.reduce((sum, c) => sum + c.amountInvested, 0);
  const totalReceived = contributions.reduce((sum, c) => sum + c.amountReceived, 0);
  const totalExpected = contributions.reduce((sum, c) => sum + c.expectedReturn, 0);
  const totalProfit = totalExpected - totalInvested;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #3CFFB1 0%, #002168 70.19%, #00022A 87.98%)",
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
                fill="url(#paint0_linear_logo_contributions)"
              />
              <path
                d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                fill="url(#paint1_linear_logo_contributions)"
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
                  id="paint0_linear_logo_contributions"
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
                  id="paint1_linear_logo_contributions"
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
              to="/investor/contributions"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <BarChart3 className="w-4 h-4 text-primary" />
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
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input
                  placeholder="Buscar por tomador ou projeto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Dashboard Content */}
          <main className="p-4 lg:p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "Investidor", href: "/investor/dashboard" },
                { label: "Lances Contribuídos" },
              ]}
            />

            {/* Header Section */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                {t('investor.contributions.title') || 'Lances Contribuídos'}
              </h1>
              <p className="text-sm lg:text-base text-foreground">
                {t('investor.contributions.subtitle') || 'Acompanhe seus investimentos e retornos em tempo real'}
                {user && (
                  <span className="block mt-1 text-xs lg:text-sm text-muted-foreground">
                    {t('common.welcome') || 'Olá'}, {profile?.full_name || user.email}
                  </span>
                )}
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card className="bg-card/20 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium text-foreground flex items-center gap-2">
                    <DollarSign className="w-3 lg:w-4 h-3 lg:h-4" />
                    Total Investido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg lg:text-xl font-bold text-foreground">
                    R$ {totalInvested.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-xs text-foreground mt-1">
                    {contributions.length} projetos ativos
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/20 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium text-foreground flex items-center gap-2">
                    <TrendingUpIcon className="w-3 lg:w-4 h-3 lg:h-4" />
                    Já Recebido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg lg:text-xl font-bold text-foreground">
                    R$ {totalReceived.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-xs text-foreground mt-1">
                    {((totalReceived / totalInvested) * 100).toFixed(1)}% do total
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/20 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium text-foreground flex items-center gap-2">
                    <Target className="w-3 lg:w-4 h-3 lg:h-4" />
                    Expectativa Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg lg:text-xl font-bold text-foreground">
                    R$ {totalExpected.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-xs text-foreground mt-1">
                    +R$ {totalProfit.toLocaleString('pt-BR')} de lucro
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/20 border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs lg:text-sm font-medium text-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 lg:w-4 h-3 lg:h-4" />
                    Status Geral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg lg:text-xl font-bold text-success">
                    100% Adimplente
                  </div>
                  <p className="text-xs text-foreground mt-1">
                    Todos os tomadores em dia
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contributions List */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <h2 className="text-lg lg:text-xl font-semibold text-foreground">
                  Projetos Ativos
                </h2>
                <Badge variant="secondary" className="bg-success/20 text-success w-fit">
                  {filteredContributions.length} projetos
                </Badge>
              </div>

              {filteredContributions.map((contribution) => (
                <Card key={contribution.id} className="bg-card/20 border-0">
                  <CardContent className="p-4 lg:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                      {/* Project Info */}
                      <div className="space-y-3 lg:space-y-4">
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1">
                            {contribution.project}
                          </h3>
                          <p className="text-sm lg:text-base text-foreground mb-2">
                            Tomador: {contribution.borrower}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {contribution.category}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                contribution.risk === 'Baixo' ? 'bg-success/20 text-success' :
                                contribution.risk === 'Médio' ? 'bg-warning/20 text-warning' :
                                'bg-destructive/20 text-destructive'
                              }`}
                            >
                              Risco {contribution.risk}
                            </Badge>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs lg:text-sm">
                            <span className="text-foreground">Progresso do Contrato</span>
                            <span className="text-foreground font-medium">
                              {Math.round(((contribution.totalMonths - contribution.monthsRemaining) / contribution.totalMonths) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-cyan-400 h-2 rounded-full"
                              style={{ 
                                width: `${((contribution.totalMonths - contribution.monthsRemaining) / contribution.totalMonths) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-foreground">
                            <span>{contribution.totalMonths - contribution.monthsRemaining} meses pagos</span>
                            <span>{contribution.monthsRemaining} meses restantes</span>
                          </div>
                        </div>
                      </div>

                      {/* Financial Info */}
                      <div className="space-y-3 lg:space-y-4">
                        <div className="grid grid-cols-2 gap-3 lg:gap-4">
                          <div className="text-center p-2 lg:p-3 bg-muted/50 rounded-lg">
                            <div className="text-xs lg:text-sm text-foreground mb-1">Investido</div>
                            <div className="text-sm lg:text-base font-bold text-foreground">
                              R$ {contribution.amountInvested.toLocaleString('pt-BR')}
                            </div>
                          </div>
                          <div className="text-center p-2 lg:p-3 bg-muted/50 rounded-lg">
                            <div className="text-xs lg:text-sm text-foreground mb-1">Recebido</div>
                            <div className="text-sm lg:text-base font-bold text-success">
                              R$ {contribution.amountReceived.toLocaleString('pt-BR')}
                            </div>
                          </div>
                        </div>

                        <div className="text-center p-3 lg:p-4 bg-gradient-to-r from-primary/10 to-cyan-400/10 rounded-lg">
                          <div className="text-xs lg:text-sm text-foreground mb-1">Expectativa Final</div>
                          <div className="text-base lg:text-lg font-bold text-primary">
                            R$ {contribution.expectedReturn.toLocaleString('pt-BR')}
                          </div>
                          <div className="text-xs text-foreground mt-1">
                            Taxa: {contribution.interestRate}% a.a.
                          </div>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="space-y-3 lg:space-y-4">
                        <div className="flex items-center gap-2 mb-2 lg:mb-3">
                          <CheckCircle className="w-3 lg:w-4 h-3 lg:h-4 text-success" />
                          <span className="text-xs lg:text-sm font-medium text-success">
                            {contribution.status}
                          </span>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-foreground">Parcela Mensal:</span>
                            <span className="text-xs lg:text-sm font-medium text-foreground">
                              R$ {contribution.monthlyPayment.toLocaleString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-foreground">Último Pagamento:</span>
                            <span className="text-xs lg:text-sm font-medium text-foreground">
                              {contribution.lastPayment}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs lg:text-sm text-foreground">Próximo Pagamento:</span>
                            <span className="text-xs lg:text-sm font-medium text-foreground">
                              {contribution.nextPayment}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 lg:pt-3 border-t border-muted">
                          <Button variant="outline" className="w-full text-xs">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Compliance Banner */}
            <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-success/10 rounded-xl">
              <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                <CheckCircle className="w-4 lg:w-6 h-4 lg:h-6 text-success" />
                <h3 className="text-base lg:text-lg font-semibold text-success">
                  Todos os Tomadores Estão Adimplentes
                </h3>
              </div>
              <p className="text-sm lg:text-base text-foreground">
                Parabéns! Todos os seus investimentos estão com pagamentos em dia. 
                Os tomadores de empréstimo estão cumprindo suas obrigações mensais 
                conforme acordado, garantindo a segurança e rentabilidade dos seus investimentos.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorContributions; 