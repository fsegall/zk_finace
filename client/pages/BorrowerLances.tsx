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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useMyLoans, LoanWithDetails } from "../hooks/useMyLoans";
import WalletConnect from "../components/WalletConnect";

// Tipo unificado para lances (reais e mock)
interface DisplayLance {
  id: string | number;
  title: string;
  description: string;
  author: string;
  category: string;
  value: string;
  interest: string;
  expires: string;
  progress: number;
  raised: string;
  goal: string;
  status: string;
  createdAt: string;
  investors: number;
  daysLeft: number;
}

const BorrowerLances = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Buscar dados reais do banco
  const { data: realLoans, isLoading, error } = useMyLoans();

  // Dados mock para manter a tela completa
  const mockLances = [
    {
      id: 2,
      title: "Fresh Eats Cafe Expansion",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Food",
      value: "R$78.560,00",
      interest: "6.3% APR",
      expires: "10 dias",
      progress: 35,
      raised: "R$20.000",
      goal: "R$50.000",
      status: "active",
      createdAt: "2024-03-10",
      investors: 8,
      daysLeft: 10,
    },
    {
      id: 3,
      title: "Urban Apparel Manufacturing",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Fashion",
      value: "R$6.423,00",
      interest: "3.7% APR",
      expires: "28 dias",
      progress: 65,
      raised: "R$1.000",
      goal: "R$50.000",
      status: "completed",
      createdAt: "2024-02-20",
      investors: 15,
      daysLeft: 0,
    },
    {
      id: 4,
      title: "Green Energy Solar Panels",
      description:
        "Instalação de painéis solares para redução de custos energéticos em propriedade rural...",
      author: "Maria Cardoso",
      category: "Energy",
      value: "R$120.000,00",
      interest: "4.2% APR",
      expires: "15 dias",
      progress: 25,
      raised: "R$30.000",
      goal: "R$120.000",
      status: "active",
      createdAt: "2024-03-05",
      investors: 6,
      daysLeft: 15,
    },
    {
      id: 5,
      title: "Organic Farm Equipment",
      description:
        "Aquisição de equipamentos modernos para produção orgânica certificada...",
      author: "Maria Cardoso",
      category: "Agriculture",
      value: "R$45.000,00",
      interest: "5.1% APR",
      expires: "3 dias",
      progress: 90,
      raised: "R$40.500",
      goal: "R$45.000",
      status: "active",
      createdAt: "2024-03-12",
      investors: 22,
      daysLeft: 3,
    },
    {
      id: 6,
      title: "Digital Marketing Agency",
      description:
        "Criação de agência de marketing digital focada em pequenas empresas...",
      author: "Maria Cardoso",
      category: "Marketing",
      value: "R$35.000,00",
      interest: "6.8% APR",
      expires: "0 dias",
      progress: 45,
      raised: "R$15.750",
      goal: "R$35.000",
      status: "expired",
      createdAt: "2024-02-25",
      investors: 9,
      daysLeft: 0,
    },
  ];

  // Combinar dados reais com mock
  const allLances = [
    // Primeiro lance real (se existir)
    ...(realLoans && realLoans.length > 0 ? [realLoans[0]] : []),
    // Lances mock
    ...mockLances
  ];

  // Converter lance real para formato compatível com o mock
  const formatRealLoanForDisplay = (loan: LoanWithDetails) => ({
    id: loan.id,
    title: loan.title,
    description: loan.description,
    author: loan.author,
    category: loan.category,
    value: loan.value,
    interest: loan.interest,
    expires: loan.expires,
    progress: loan.progress,
    raised: loan.raised,
    goal: loan.goal,
    status: loan.status,
    createdAt: loan.created_at,
    investors: loan.investors,
    daysLeft: loan.daysLeft,
  });

  // Preparar lista final de lances para exibição
  const displayLances: DisplayLance[] = allLances.map((lance, index) => {
    if (index === 0 && realLoans && realLoans.length > 0) {
      // Primeiro lance é real
      return formatRealLoanForDisplay(lance as LoanWithDetails);
    } else {
      // Outros lances são mock
      return lance as DisplayLance;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "expired":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "expired":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "completed":
        return "Concluído";
      case "expired":
        return "Expirado";
      default:
        return "Desconhecido";
    }
  };

  const filteredLances = filterStatus === "all" 
    ? displayLances 
    : displayLances.filter(lance => lance.status === filterStatus);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Carregando seus lances...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-h4 font-semibold text-foreground mb-2">Erro ao carregar dados</h3>
          <p className="text-body text-foreground">Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

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

      <div className="relative z-10 flex">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block w-64 bg-sidebar p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <svg
              className="h-8 w-auto"
              viewBox="0 0 442 149"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z"
                fill="url(#paint0_linear_logo_borrower)"
              />
              <path
                d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                fill="url(#paint1_linear_logo_borrower)"
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
                  id="paint0_linear_logo_borrower"
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
                  id="paint1_linear_logo_borrower"
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
              to="/borrower/dashboard"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/borrower/lances"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-4 h-4" />
              Lances
            </Link>
            <Link
              to="/borrower/wallet"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Wallet className="w-4 h-4" />
              Carteira
            </Link>
            <Link
              to="/borrower/settings"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </Link>
          </nav>

          {/* Support */}
          <div className="mt-auto pt-8 space-y-2">
            <Link
              to="/kyc-verification"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
            >
              <span className="text-xs">←</span>
              Voltar ao KYC
            </Link>
            <Link
              to="/borrower/support"
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
            >
              <div className="w-4 h-4 rounded-full border border-sidebar-foreground flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
              Suporte
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card/20 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input
                  placeholder="Buscar lances..."
                  className="pl-10 bg-muted border-0 text-foreground placeholder:text-foreground"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <WalletConnect />
                
                <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    {user?.user_metadata?.avatar_url && (
                      <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                    )}
                    <span className="text-body">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                    <span className="text-small text-foreground">
                      @{user?.email ? user.email.split("@")[0] : "usuario"}
                    </span>
                  </div>
                </div>

                <Link to="/login">
                  <button className="p-2 hover:bg-muted/50 rounded-lg text-foreground transition-colors">
                    <span className="text-sm">Sair</span>
                  </button>
                </Link>

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
          </header>

          {/* Main Content */}
          <main className="p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "KYC Verificação", href: "/kyc-verification" },
                { label: "Dashboard", href: "/borrower/dashboard" },
                { label: "Lances" },
              ]}
            />

            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-h1 font-bold text-foreground mb-2">
                  Meus Lances
                </h1>
                <p className="text-body text-foreground">
                  Gerencie seus pedidos de empréstimo e acompanhe o progresso
                </p>
              </div>
              <Link to="/borrower/create-lance">
                <Button className="bg-primary hover:bg-primary/80 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Novo Lance
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body text-foreground mb-1">Total de Lances</p>
                    <p className="text-h2 font-bold text-foreground">{allLances.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body text-foreground mb-1">Lances Ativos</p>
                    <p className="text-h2 font-bold text-green-600">
                      {allLances.filter(l => l.status === "active").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body text-foreground mb-1">Total Arrecadado</p>
                    <p className="text-h2 font-bold text-foreground">R$138.250</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body text-foreground mb-1">Investidores</p>
                    <p className="text-h2 font-bold text-foreground">72</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-foreground" />
                <span className="text-body text-foreground">Filtrar por:</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("active")}
                >
                  Ativos
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("completed")}
                >
                  Concluídos
                </Button>
                <Button
                  variant={filterStatus === "expired" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("expired")}
                >
                  Expirados
                </Button>
              </div>
            </div>

            {/* Lances Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLances.map((lance) => (
                <div
                  key={lance.id}
                  className="bg-card/20 rounded-xl p-6 border border-primary/30 hover:border-border/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-body font-medium text-foreground">
                          {lance.author}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-foreground" />
                          <span className="text-xs text-foreground">
                            {new Date(lance.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(lance.status)} border`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(lance.status)}
                        {getStatusText(lance.status)}
                      </div>
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-h5 mb-2 text-foreground line-clamp-2">
                        {lance.title}
                      </h3>
                      <p className="text-body text-foreground mb-3 line-clamp-3">
                        {lance.description}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        {lance.category}
                      </Badge>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-foreground" />
                        <div>
                          <div className="text-xs text-foreground">Valor</div>
                          <div className="font-semibold text-foreground">{lance.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-foreground" />
                        <div>
                          <div className="text-xs text-foreground">Juros</div>
                          <div className="font-semibold text-foreground">{lance.interest}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-foreground" />
                        <div>
                          <div className="text-xs text-foreground">Investidores</div>
                          <div className="font-semibold text-foreground">{lance.investors}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-foreground" />
                        <div>
                          <div className="text-xs text-foreground">Dias Restantes</div>
                          <div className="font-semibold text-foreground">{lance.daysLeft}</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-body">
                        <span className="text-foreground font-semibold">
                          Progresso
                        </span>
                        <span className="text-foreground font-semibold">
                          {lance.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-primary h-2 rounded-full relative overflow-hidden"
                          style={{ width: `${lance.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-small text-foreground">
                        <span>{lance.raised}</span>
                        <span>Meta: {lance.goal}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link to={`/borrower/lance/${lance.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Link to={`/borrower/credit-request/${lance.id}`}>
                        <Button className="bg-primary hover:bg-primary/80 transition-colors">
                          Solicitar Crédito
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredLances.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-h4 font-semibold text-foreground mb-2">
                  Nenhum lance encontrado
                </h3>
                <p className="text-body text-foreground mb-6">
                  {filterStatus === "all" 
                    ? "Você ainda não criou nenhum lance. Comece criando seu primeiro pedido de empréstimo!"
                    : `Não há lances com status "${getStatusText(filterStatus)}" no momento.`
                  }
                </p>
                {filterStatus === "all" && (
                  <Button className="bg-primary hover:bg-primary/80 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Lance
                  </Button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BorrowerLances; 