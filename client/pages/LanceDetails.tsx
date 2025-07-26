import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Image,
  Video,
  Download,
  Edit,
  Trash2,
  Share2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Shield,
  Zap,
  Star,
  Heart,
  MessageCircle,
  Bookmark,
  Flag,
  MoreHorizontal,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Sun,
  Moon,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import WalletConnect from "../components/WalletConnect";
import MobileMenu from "../components/MobileMenu";

const LanceDetails = () => {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - em produção viria da API
  const lance = {
    id: parseInt(id || "1"),
    title: "TechGrow Software Development",
    description: "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos desenvolvendo um software de gestão integrada que vai revolucionar o setor agrícola brasileiro. O sistema incluirá módulos de controle de estoque, gestão financeira, rastreabilidade de produtos e integração com marketplaces.",
    author: "Maria Cardoso",
    authorEmail: "maria.cardoso@techgrow.com",
    authorPhone: "+55 (11) 99999-9999",
    authorLocation: "São Paulo, SP",
    authorWebsite: "https://techgrow.com.br",
    category: "Tech",
    value: "R$50.000,00",
    interest: "5.8% APR",
    expires: "5 dias",
    progress: 65,
    raised: "R$32.000",
    goal: "R$50.000",
    status: "active",
    createdAt: "2024-03-15",
    investors: 12,
    daysLeft: 5,
    minInvestment: "R$100,00",
    maxInvestment: "R$5.000,00",
    totalInvested: "R$32.000,00",
    averageInvestment: "R$2.666,67",
    projectType: "Software Development",
    businessPlan: "Desenvolvimento de software SaaS para gestão agrícola com modelo de assinatura mensal e módulos opcionais.",
    marketAnalysis: "Mercado agrícola brasileiro em crescimento com 5.5 milhões de propriedades rurais, sendo 85% pequenas e médias propriedades que precisam de soluções digitais.",
    competitiveAdvantage: "Primeira solução completa integrando gestão financeira, estoque e rastreabilidade com interface intuitiva para produtores rurais.",
    monthlyRevenue: "R$15.000,00",
    monthlyExpenses: "R$8.500,00",
    profitMargin: "43%",
    breakEvenPoint: "8 meses",
    collateral: {
      type: "Equipamentos",
      value: "R$75.000,00",
      description: "Servidores, computadores e equipamentos de desenvolvimento"
    },
    documents: [
      { name: "Plano de Negócios", type: "pdf", size: "2.3 MB", url: "#" },
      { name: "Projeções Financeiras", type: "xlsx", size: "1.1 MB", url: "#" },
      { name: "Análise de Mercado", type: "pdf", size: "3.2 MB", url: "#" },
      { name: "Documentação Técnica", type: "pdf", size: "4.5 MB", url: "#" }
    ],
    media: [
      { name: "Apresentação do Projeto", type: "video", thumbnail: "/placeholder.svg", url: "#" },
      { name: "Protótipo do Sistema", type: "image", thumbnail: "/placeholder.svg", url: "#" },
      { name: "Equipe de Desenvolvimento", type: "image", thumbnail: "/placeholder.svg", url: "#" }
    ],
    updates: [
      {
        date: "2024-03-20",
        title: "Protótipo finalizado",
        description: "Concluímos o desenvolvimento do protótipo inicial do sistema. Testes internos mostraram excelente performance."
      },
      {
        date: "2024-03-18",
        title: "Parceria confirmada",
        description: "Fechamos parceria com cooperativa agrícola para testes piloto do sistema."
      },
      {
        date: "2024-03-15",
        title: "Lance publicado",
        description: "Lance publicado com sucesso! Começamos a receber investimentos."
      }
    ],
    payments: [
      { month: 1, amount: "R$2.500,00", status: "pending" },
      { month: 2, amount: "R$2.500,00", status: "pending" },
      { month: 3, amount: "R$2.500,00", status: "pending" },
      { month: 4, amount: "R$2.500,00", status: "pending" },
      { month: 5, amount: "R$2.500,00", status: "pending" },
      { month: 6, amount: "R$2.500,00", status: "pending" },
      { month: 7, amount: "R$2.500,00", status: "pending" },
      { month: 8, amount: "R$2.500,00", status: "pending" },
      { month: 9, amount: "R$2.500,00", status: "pending" },
      { month: 10, amount: "R$2.500,00", status: "pending" },
      { month: 11, amount: "R$2.500,00", status: "pending" },
      { month: 12, amount: "R$2.500,00", status: "pending" }
    ]
  };

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

  const breadcrumbItems = [
    { label: "Dashboard", href: "/borrower/dashboard" },
    { label: "Meus Lances", href: "/borrower/lances" },
    { label: lance.title, href: "#" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background gradient blur effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #004EF6 0%, #002168 70.19%, #00022A 87.98%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/borrower/lances">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Voltar
                  </Button>
                </Link>
                <Breadcrumb items={breadcrumbItems} />
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-3 lg:gap-4">
                {/* Mobile Menu */}
                <MobileMenu userType="borrower" />
                
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
                  <Button variant="ghost" size="sm" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <main className="space-y-4 sm:space-y-6">
            {/* Header Card */}
            <Card className="bg-card/20 border-border/50">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0">
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        {lance.category}
                      </Badge>
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
                    <CardTitle className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {lance.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-body text-foreground/80 mb-3 sm:mb-4">
                      {lance.description}
                    </CardDescription>
                    
                    {/* Author Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{lance.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Criado em {new Date(lance.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{lance.daysLeft} dias restantes</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1 sm:mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Overview */}
            <Card className="bg-card/20 border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{lance.progress}%</div>
                    <div className="text-sm text-foreground/70">Progresso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{lance.raised}</div>
                    <div className="text-sm text-foreground/70">Arrecadado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{lance.investors}</div>
                    <div className="text-sm text-foreground/70">Investidores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{lance.daysLeft}</div>
                    <div className="text-sm text-foreground/70">Dias Restantes</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-foreground/70 mb-2">
                    <span>Meta: {lance.goal}</span>
                    <span>{lance.raised} de {lance.goal}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-primary h-3 rounded-full relative overflow-hidden"
                      style={{ width: `${lance.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-card/20 border-border/50 overflow-x-auto">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="project" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Target className="w-4 h-4 mr-2" />
                  Projeto
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financeiro
                </TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="updates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Activity className="w-4 h-4 mr-2" />
                  Atualizações
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Key Metrics */}
                  <Card className="lg:col-span-2 bg-card/20 border-border/50">
                    <CardHeader className="p-4 sm:p-6">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        Métricas Principais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-foreground mb-1">{lance.value}</div>
                          <div className="text-sm text-foreground/70">Valor Total</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-foreground mb-1">{lance.interest}</div>
                          <div className="text-sm text-foreground/70">Taxa de Juros</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-foreground mb-1">{lance.minInvestment}</div>
                          <div className="text-sm text-foreground/70">Invest. Mínimo</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-foreground mb-1">{lance.maxInvestment}</div>
                          <div className="text-sm text-foreground/70">Invest. Máximo</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Author Info */}
                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Sobre o Empreendedor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{lance.author}</div>
                          <div className="text-sm text-foreground/70">{lance.authorLocation}</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-foreground/70" />
                          <span className="text-foreground/70">{lance.authorEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-foreground/70" />
                          <span className="text-foreground/70">{lance.authorPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-foreground/70" />
                          <a href={lance.authorWebsite} className="text-primary hover:underline">
                            {lance.authorWebsite}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Collateral Info */}
                <Card className="bg-card/20 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Garantias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-foreground/70 mb-1">Tipo</div>
                        <div className="font-semibold text-foreground">{lance.collateral.type}</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-foreground/70 mb-1">Valor</div>
                        <div className="font-semibold text-foreground">{lance.collateral.value}</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-sm text-foreground/70 mb-1">Descrição</div>
                        <div className="font-semibold text-foreground">{lance.collateral.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Project Tab */}
              <TabsContent value="project" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle>Plano de Negócios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 leading-relaxed">{lance.businessPlan}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle>Análise de Mercado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 leading-relaxed">{lance.marketAnalysis}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle>Vantagem Competitiva</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 leading-relaxed">{lance.competitiveAdvantage}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle>Projeções</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Receita Mensal</span>
                          <span className="font-semibold text-foreground">{lance.monthlyRevenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Despesas Mensais</span>
                          <span className="font-semibold text-foreground">{lance.monthlyExpenses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Margem de Lucro</span>
                          <span className="font-semibold text-foreground">{lance.profitMargin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Ponto de Equilíbrio</span>
                          <span className="font-semibold text-foreground">{lance.breakEvenPoint}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="space-y-6">
                <Card className="bg-card/20 border-border/50">
                  <CardHeader>
                    <CardTitle>Cronograma de Pagamentos</CardTitle>
                    <CardDescription>
                      Pagamentos mensais de {lance.payments[0].amount} por 12 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lance.payments.map((payment, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-foreground">Mês {payment.month}</span>
                            <Badge variant="outline" className="text-xs">
                              Pendente
                            </Badge>
                          </div>
                          <div className="text-lg font-bold text-foreground">{payment.amount}</div>
                          <div className="text-sm text-foreground/70">Vencimento: {payment.month}/2025</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Documents */}
                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Documentos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {lance.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-foreground/70" />
                              <div>
                                <div className="font-medium text-foreground">{doc.name}</div>
                                <div className="text-sm text-foreground/70">{doc.size}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Media */}
                  <Card className="bg-card/20 border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="w-5 h-5" />
                        Mídia
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {lance.media.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              {item.type === 'video' ? (
                                <Video className="w-5 h-5 text-foreground/70" />
                              ) : (
                                <Image className="w-5 h-5 text-foreground/70" />
                              )}
                              <div>
                                <div className="font-medium text-foreground">{item.name}</div>
                                <div className="text-sm text-foreground/70">{item.type}</div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates" className="space-y-6">
                <Card className="bg-card/20 border-border/50">
                  <CardHeader>
                    <CardTitle>Atualizações do Projeto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {lance.updates.map((update, index) => (
                        <div key={index} className="border-l-2 border-primary/30 pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-foreground/70">
                              {new Date(update.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">{update.title}</h4>
                          <p className="text-foreground/80">{update.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link to={`/borrower/credit-request/${lance.id}`}>
                <Button className="bg-primary hover:bg-primary/80 transition-colors px-6 sm:px-8 w-full sm:w-auto">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Solicitar Crédito
                </Button>
              </Link>
              <Button variant="outline" className="px-6 sm:px-8 w-full sm:w-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar Lance
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LanceDetails; 