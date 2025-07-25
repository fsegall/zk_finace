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
  FileText,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Users,
  Activity,
  Zap,
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const InvestmentDetails = () => {
  const { theme, toggleTheme } = useTheme();
  const { investmentId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Simulando dados do investimento baseado no ID
  const investment = {
    id: investmentId || "1",
    title: "TechGrow Software Development",
    description: "Desenvolvimento de software para crescimento de agroindústria com foco em automação de processos e análise de dados para otimização de produção.",
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
    borrower: {
      name: "Maria Cardoso",
      email: "maria.cardoso@techgrow.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo, SP",
      kycStatus: "Verificado",
      creditScore: 750,
    },
    project: {
      goal: 50000,
      raised: 32500,
      investors: 45,
      daysLeft: 95,
      updates: [
        {
          date: "2024-03-15",
          title: "Fase 2 Concluída",
          content: "Implementação do sistema de análise de dados foi concluída com sucesso. Os primeiros resultados mostram uma melhoria de 25% na eficiência.",
          type: "success"
        },
        {
          date: "2024-02-28",
          title: "Aquisição de Equipamentos",
          content: "Novos servidores foram adquiridos para suportar o crescimento do sistema. Instalação programada para próxima semana.",
          type: "info"
        },
        {
          date: "2024-02-15",
          title: "Contratação de Equipe",
          content: "Equipe de desenvolvimento expandida com 3 novos desenvolvedores especializados em IA.",
          type: "success"
        }
      ]
    },
    payments: [
      {
        date: "2024-03-15",
        amount: 102.50,
        status: "Pago",
        type: "Juros"
      },
      {
        date: "2024-02-15",
        amount: 102.50,
        status: "Pago",
        type: "Juros"
      },
      {
        date: "2024-01-15",
        amount: 102.50,
        status: "Pago",
        type: "Juros"
      },
      {
        date: "2024-04-15",
        amount: 102.50,
        status: "Pendente",
        type: "Juros"
      }
    ],
    documents: [
      {
        name: "Contrato de Investimento",
        type: "PDF",
        size: "2.3 MB",
        date: "2024-01-15"
      },
      {
        name: "Relatório Mensal - Março",
        type: "PDF",
        size: "1.8 MB",
        date: "2024-03-15"
      },
      {
        name: "Certificado de Garantia",
        type: "PDF",
        size: "3.1 MB",
        date: "2024-01-15"
      }
    ]
  };

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "bg-green-500/20 text-green-600";
      case "Pendente":
        return "bg-yellow-500/20 text-yellow-600";
      case "Atrasado":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "info":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: Eye },
    { id: "payments", label: "Pagamentos", icon: DollarSign },
    { id: "updates", label: "Atualizações", icon: Activity },
    { id: "documents", label: "Documentos", icon: FileText },
    { id: "borrower", label: "Empreendedor", icon: User },
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

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar p-6">
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
              <Star className="w-4 h-4" />
              Ranking
            </Link>
            <Link
              to="/investor/contributions"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-4 h-4" />
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
          <header className="bg-card/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/investor/investments">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar aos Investimentos
                  </Button>
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <User className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="text-body">José Soares</span>
                      <span className="text-small text-muted-foreground">
                        @josoa1977
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/login">
                  <button className="p-2 hover:bg-muted/50 rounded-lg text-foreground transition-colors">
                    <span className="text-body">Sair</span>
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
                { label: "Dashboard", href: "/investor/dashboard" },
                { label: "Investimentos", href: "/investor/investments" },
                { label: investment.title },
              ]}
            />

            {/* Investment Header */}
            <div className="bg-card/20 rounded-xl p-6 mb-6 border border-border/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Building className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-h2 font-bold text-foreground mb-2">
                      {investment.title}
                    </h1>
                    <p className="text-body text-foreground mb-3 max-w-2xl">
                      {investment.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        {investment.category}
                      </Badge>
                      <Badge variant="outline" className={getRiskColor(investment.risk)}>
                        Risco: {investment.risk}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(investment.status)} border`}
                      >
                        {getStatusText(investment.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-h3 font-bold text-foreground">
                    R$ {investment.amount.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-body text-foreground">Investido</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 bg-muted/50 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Key Metrics */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h2 className="text-h4 font-semibold text-foreground mb-4">
                        Métricas Principais
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-foreground">
                            {investment.apy}%
                          </div>
                          <div className="text-sm text-foreground">APY</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            R$ {investment.return.toLocaleString('pt-BR')}
                          </div>
                          <div className="text-sm text-foreground">Retorno</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-foreground">
                            R$ {investment.monthlyPayment.toLocaleString('pt-BR')}
                          </div>
                          <div className="text-sm text-foreground">Pagamento Mensal</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {investment.progress}%
                          </div>
                          <div className="text-sm text-foreground">Progresso</div>
                        </div>
                      </div>
                    </div>

                    {/* Project Progress */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h2 className="text-h4 font-semibold text-foreground mb-4">
                        Progresso do Projeto
                      </h2>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">Meta do Projeto</span>
                          <span className="font-semibold text-foreground">
                            R$ {investment.project.goal.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-primary h-3 rounded-full relative overflow-hidden"
                            style={{ width: `${(investment.project.raised / investment.project.goal) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-foreground">
                          <span>R$ {investment.project.raised.toLocaleString('pt-BR')} arrecadado</span>
                          <span>{investment.project.investors} investidores</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h2 className="text-h4 font-semibold text-foreground mb-4">
                        Cronograma
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">Início do Projeto</div>
                            <div className="text-sm text-foreground">
                              {new Date(investment.startDate).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">Atual</div>
                            <div className="text-sm text-foreground">
                              {investment.progress}% concluído • {investment.project.daysLeft} dias restantes
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-muted rounded-full"></div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">Fim do Projeto</div>
                            <div className="text-sm text-foreground">
                              {new Date(investment.endDate).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Quick Info */}
                  <div className="space-y-6">
                    {/* Next Payment */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Próximo Pagamento
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground">
                              {new Date(investment.nextPayment).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="text-sm text-foreground">
                              R$ {investment.monthlyPayment.toLocaleString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Timer className="w-5 h-5 text-yellow-600" />
                          <div className="text-sm text-foreground">
                            Em {Math.ceil((new Date(investment.nextPayment).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Collateral */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Garantia
                      </h3>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">
                            {investment.collateral}
                          </div>
                          <div className="text-sm text-foreground">
                            Valor estimado: R$ 75.000
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-card/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Ações
                      </h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar Relatório
                        </Button>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver Projeto Original
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Contatar Empreendedor
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payments" && (
                <div className="bg-card/20 rounded-xl p-6">
                  <h2 className="text-h4 font-semibold text-foreground mb-6">
                    Histórico de Pagamentos
                  </h2>
                  <div className="space-y-4">
                    {investment.payments.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            payment.status === "Pago" ? "bg-green-500/20" : "bg-yellow-500/20"
                          }`}>
                            {payment.status === "Pago" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {payment.type} - {new Date(payment.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="text-sm text-foreground">
                              {payment.status}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            R$ {payment.amount.toLocaleString('pt-BR')}
                          </div>
                          <Badge
                            variant="outline"
                            className={getPaymentStatusColor(payment.status)}
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "updates" && (
                <div className="bg-card/20 rounded-xl p-6">
                  <h2 className="text-h4 font-semibold text-foreground mb-6">
                    Atualizações do Projeto
                  </h2>
                  <div className="space-y-6">
                    {investment.project.updates.map((update, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {getUpdateTypeIcon(update.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">
                              {update.title}
                            </h3>
                            <span className="text-sm text-foreground">
                              {new Date(update.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-foreground">
                            {update.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="bg-card/20 rounded-xl p-6">
                  <h2 className="text-h4 font-semibold text-foreground mb-6">
                    Documentos
                  </h2>
                  <div className="space-y-4">
                    {investment.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground">
                              {doc.name}
                            </div>
                            <div className="text-sm text-foreground">
                              {doc.type} • {doc.size} • {doc.date}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "borrower" && (
                <div className="bg-card/20 rounded-xl p-6">
                  <h2 className="text-h4 font-semibold text-foreground mb-6">
                    Informações do Empreendedor
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Nome</div>
                          <div className="text-foreground">{investment.borrower.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Email</div>
                          <div className="text-foreground">{investment.borrower.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Telefone</div>
                          <div className="text-foreground">{investment.borrower.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">Endereço</div>
                          <div className="text-foreground">{investment.borrower.address}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-foreground">Status KYC</span>
                        </div>
                        <div className="text-foreground">{investment.borrower.kycStatus}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-foreground">Credit Score</span>
                        </div>
                        <div className="text-foreground">{investment.borrower.creditScore}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span className="font-medium text-foreground">Projetos Anteriores</span>
                        </div>
                        <div className="text-foreground">3 projetos concluídos</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails; 