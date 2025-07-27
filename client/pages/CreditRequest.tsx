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
  FileText,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Building,
  MapPin,
  Phone,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import MobileMenu from "../components/MobileMenu";
import WalletConnect from "../components/WalletConnect";

const CreditRequest = () => {
  const { theme, toggleTheme } = useTheme();
  const { lanceId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    fullName: "Maria Cardoso",
    cpf: "123.456.789-00",
    email: "maria.cardoso@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    cep: "01234-567",
    
    // Loan data
    loanAmount: "50000",
    purpose: "Expansão de negócio",
    term: "12",
    collateral: "Imóvel residencial",
    
    // Dados financeiros
    monthlyIncome: "15000",
    expenses: "8000",
    otherLoans: "0",
    
    // Documentos
    documents: [],
  });

  // Dados do lance (simulando busca por ID)
  const lanceData = {
    id: lanceId || "1",
    title: "TechGrow Software Development",
    description: "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
    author: "Maria Cardoso",
    category: "Tech",
    value: "R$50.000,00",
    interest: "5.8% APR",
    expires: "5 dias",
    progress: 65,
    raised: "R$32.000",
    goal: "R$50.000",
  };

  const steps = [
    { id: 1, title: "Dados Pessoais", icon: User },
    { id: 2, title: "Dados do Empréstimo", icon: DollarSign },
    { id: 3, title: "Informações Financeiras", icon: CreditCard },
    { id: 4, title: "Documentos", icon: FileText },
    { id: 5, title: "Revisão", icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo
                </label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CPF
                </label>
                <Input
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="bg-muted border-border"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Endereço
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Rua, número, complemento"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cidade
                </label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Sua cidade"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Estado
                </label>
                <Input
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="UF"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CEP
                </label>
                <Input
                  value={formData.cep}
                  onChange={(e) => handleInputChange("cep", e.target.value)}
                  placeholder="00000-000"
                  className="bg-muted border-border"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Valor Solicitado
                </label>
                <Input
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                  type="number"
                  placeholder="0,00"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prazo (meses)
                </label>
                <Input
                  value={formData.term}
                  onChange={(e) => handleInputChange("term", e.target.value)}
                  type="number"
                  placeholder="12"
                  className="bg-muted border-border"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Finalidade do Empréstimo
                </label>
                <Input
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                  placeholder="Descreva a finalidade"
                  className="bg-muted border-border"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Garantia/Collateral
                </label>
                <Input
                  value={formData.collateral}
                  onChange={(e) => handleInputChange("collateral", e.target.value)}
                  placeholder="Tipo de garantia"
                  className="bg-muted border-border"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Renda Mensal
                </label>
                <Input
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                  type="number"
                  placeholder="0,00"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Despesas Mensais
                </label>
                <Input
                  value={formData.expenses}
                  onChange={(e) => handleInputChange("expenses", e.target.value)}
                  type="number"
                  placeholder="0,00"
                  className="bg-muted border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Outros Empréstimos
                </label>
                <Input
                  value={formData.otherLoans}
                  onChange={(e) => handleInputChange("otherLoans", e.target.value)}
                  type="number"
                  placeholder="0,00"
                  className="bg-muted border-border"
                />
              </div>
            </div>
            
            <div className="bg-card/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Análise de Capacidade de Pagamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {parseInt(formData.monthlyIncome) - parseInt(formData.expenses)}
                  </div>
                  <div className="text-sm text-foreground">Renda Disponível</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {Math.round(parseInt(formData.loanAmount) / parseInt(formData.term))}
                  </div>
                  <div className="text-sm text-foreground">Prestação Estimada</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(((parseInt(formData.monthlyIncome) - parseInt(formData.expenses)) / (parseInt(formData.loanAmount) / parseInt(formData.term))) * 100)}%
                  </div>
                  <div className="text-sm text-foreground">Capacidade de Pagamento</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card/20 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Upload de Documentos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    RG ou CNH (Frente e Verso)
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-foreground" />
                    <p className="text-sm text-foreground">Clique para fazer upload</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="rg-upload"
                    />
                    <label htmlFor="rg-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="mt-2">
                        Selecionar Arquivo
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Comprovante de Residência
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-foreground" />
                    <p className="text-sm text-foreground">Clique para fazer upload</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="residence-upload"
                    />
                    <label htmlFor="residence-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="mt-2">
                        Selecionar Arquivo
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Comprovante de Renda
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-foreground" />
                    <p className="text-sm text-foreground">Clique para fazer upload</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="income-upload"
                    />
                    <label htmlFor="income-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="mt-2">
                        Selecionar Arquivo
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Documentos Adicionais
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-foreground" />
                    <p className="text-sm text-foreground">Clique para fazer upload</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="additional-upload"
                    />
                    <label htmlFor="additional-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" className="mt-2">
                        Selecionar Arquivo
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card/20 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                Resumo da Solicitação
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Dados Pessoais</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Nome:</span> {formData.fullName}</div>
                    <div><span className="font-medium">CPF:</span> {formData.cpf}</div>
                    <div><span className="font-medium">Email:</span> {formData.email}</div>
                    <div><span className="font-medium">Telefone:</span> {formData.phone}</div>
                    <div><span className="font-medium">Endereço:</span> {formData.address}</div>
                    <div><span className="font-medium">Cidade:</span> {formData.city} - {formData.state}</div>
                    <div><span className="font-medium">CEP:</span> {formData.cep}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Dados do Empréstimo</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Valor:</span> R$ {parseInt(formData.loanAmount).toLocaleString('pt-BR')}</div>
                    <div><span className="font-medium">Prazo:</span> {formData.term} meses</div>
                    <div><span className="font-medium">Finalidade:</span> {formData.purpose}</div>
                    <div><span className="font-medium">Garantia:</span> {formData.collateral}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-3">Informações Financeiras</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      R$ {parseInt(formData.monthlyIncome).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-foreground">Renda Mensal</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      R$ {parseInt(formData.expenses).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-foreground">Despesas Mensais</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      R$ {parseInt(formData.otherLoans).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-foreground">Outros Empréstimos</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4 sm:p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  Análise ZK Proof
                </h3>
              </div>
              <p className="text-sm text-foreground mb-4">
                Sua solicitação será processada usando tecnologia de prova de conhecimento zero (ZK Proof), 
                garantindo total privacidade dos seus dados pessoais e financeiros.
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Dados criptografados</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Análise automatizada</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Resultado em 24h</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
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
          <header className="bg-card/20 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/borrower/lances">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Voltar aos Lances
                  </Button>
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-3 lg:gap-4">
                {/* Mobile Menu */}
                <MobileMenu userType="borrower" />
                
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
                      <User className="w-4 h-4" />
                      <span className="text-sm">Maria Cardoso</span>
                      <span className="text-xs text-foreground">
                        @maaria_89
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
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 sm:p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "Dashboard", href: "/borrower/dashboard" },
                { label: "Lances", href: "/borrower/lances" },
                { label: "Solicitar Crédito" },
              ]}
            />

            {/* Lance Info Card */}
            <div className="bg-card/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-border/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-h3 font-bold text-foreground mb-1">
                      {lanceData.title}
                    </h2>
                    <p className="text-sm sm:text-body text-foreground mb-2">
                      {lanceData.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        {lanceData.category}
                      </Badge>
                      <span className="text-foreground">por {lanceData.author}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg sm:text-h4 font-bold text-foreground">{lanceData.value}</div>
                  <div className="text-sm sm:text-body text-foreground">{lanceData.interest}</div>
                  <div className="text-xs sm:text-small text-foreground">Expira em {lanceData.expires}</div>
                </div>
              </div>
            </div>

            {/* Steps Progress */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                <h1 className="text-xl sm:text-h1 font-bold text-foreground">
                  Solicitar Crédito
                </h1>
                <div className="text-sm sm:text-body text-foreground">
                  Passo {currentStep} de {steps.length}
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border text-foreground"
                    }`}>
                      {currentStep > step.id ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-xs sm:text-sm font-medium ${
                        currentStep >= step.id ? "text-foreground" : "text-foreground/60"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 sm:w-12 lg:w-16 h-1 rounded-full ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-card/20 rounded-xl p-4 sm:p-6 lg:p-8 border border-border/50">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link to="/borrower/lances">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancelar
                  </Button>
                </Link>
                
                {currentStep < steps.length ? (
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/80 w-full sm:w-auto">
                    Próximo
                  </Button>
                ) : (
                  <Button className="bg-primary hover:bg-primary/80 w-full sm:w-auto">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreditRequest; 