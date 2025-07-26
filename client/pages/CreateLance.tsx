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
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useCreateLoan } from "../hooks/useCreateLoan";
import { useCreditAnalysis, useMockCreditAnalysis } from "../hooks/useCreditAnalysis";
import WalletConnect from "../components/WalletConnect";
import MobileMenu from "../components/MobileMenu";

const CreateLance = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const createLoanMutation = useCreateLoan();
  
  // Hook para análise de crédito
  const creditAnalysis = useCreditAnalysis(); // N8N configurado e ativo
  
  const [currentStep, setCurrentStep] = useState(1);
  const [creditAnalysisCompleted, setCreditAnalysisCompleted] = useState(false);
  const [formData, setFormData] = useState({
    // Informações básicas
    title: "",
    description: "",
    category: "",
    goal: "",
    interest: "",
    term: "",
    
    // Detalhes do projeto
    projectType: "",
    businessPlan: "",
    marketAnalysis: "",
    competitiveAdvantage: "",
    
    // Informações financeiras
    monthlyRevenue: "",
    expenses: "",
    profitMargin: "",
    breakEvenPoint: "",
    
    // Garantias e colaterais
    collateralType: "",
    collateralValue: "",
    collateralDescription: "",
    
    // Documentos e mídia
    documents: [],
    images: [],
    videos: [],
    
    // Configurações do lance
    minInvestment: "",
    maxInvestment: "",
    earlyBirdBonus: "",
    referralBonus: "",
  });

  const steps = [
    { id: 1, title: "Informações Básicas", icon: FileText },
    { id: 2, title: "Detalhes do Projeto", icon: Building },
    { id: 3, title: "Informações Financeiras", icon: DollarSign },
    { id: 4, title: "Garantias", icon: Shield },
    { id: 5, title: "Mídia e Documentos", icon: Upload },
    { id: 6, title: "Configurações", icon: Settings },
    { id: 7, title: "Revisão", icon: CheckCircle },
  ];

  const categories = [
    "Tech",
    "Food",
    "Fashion",
    "Energy",
    "Agriculture",
    "Marketing",
    "Education",
    "Health",
    "Real Estate",
    "Transportation",
    "Entertainment",
    "Other",
  ];

  const projectTypes = [
    "Expansão de Negócio",
    "Novo Produto/Serviço",
    "Aquisição de Equipamentos",
    "Marketing e Publicidade",
    "Pesquisa e Desenvolvimento",
    "Infraestrutura",
    "Capital de Giro",
    "Outro",
  ];

  const collateralTypes = [
    "Imóvel Residencial",
    "Imóvel Comercial",
    "Veículo",
    "Equipamentos",
    "Maquinário",
    "Eletrônicos",
    "Joias",
    "Outro",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type as keyof typeof prev] as File[], ...files]
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

  const handleCreditAnalysis = async () => {
    try {
      // Dados para análise de crédito (baseados no formulário)
      const creditData = {
        income: formData.monthlyRevenue ? parseFloat(formData.monthlyRevenue) : undefined,
        employment_years: 3, // Valor padrão - pode ser adicionado ao formulário
        has_property: formData.collateralType === "imóvel",
        has_debt: false, // Valor padrão - pode ser adicionado ao formulário
        payment_defaults: 0, // Valor padrão - pode ser adicionado ao formulário
      };

      const result = await creditAnalysis.analyzeCreditAsync(creditData);
      
      if (result.analysis.passed) {
        setCreditAnalysisCompleted(true);
        
        let zkInfo = '';
        if (result.zkProof?.zkVerifySubmission) {
          const zk = result.zkProof.zkVerifySubmission;
          zkInfo = `\n🔐 Prova ZK: ${zk.success ? '✅ Enviada para ZKVerify' : '❌ Erro'}`;
          if (zk.transactionHash) {
            zkInfo += `\n📄 TX Hash: ${zk.transactionHash}`;
          }
        }
        
        alert(`✅ Análise de crédito aprovada!\n\n📊 Score: ${result.analysis.score} (${result.analysis.category})\n🎯 Threshold: ${result.analysis.threshold}\n💰 Limite sugerido: R$ ${result.analysis.suggestedLimit.toLocaleString()}\n\n💡 ${result.analysis.message}${zkInfo}`);
      } else {
        alert(`❌ Análise de crédito reprovada.\n\n📊 Score: ${result.analysis.score} (${result.analysis.category})\n🎯 Threshold: ${result.analysis.threshold}\n\n💡 ${result.analysis.message}\n\n📋 Recomendações:\n${result.recommendations.immediate.join('\n')}`);
      }
    } catch (error) {
      console.error("Erro na análise de crédito:", error);
      alert("Erro na análise de crédito. Tente novamente.");
    }
  };

  const handleSubmit = async () => {
    try {
      // Validar campos obrigatórios
      if (!formData.title || !formData.description || !formData.category || 
          !formData.goal || !formData.interest || !formData.term) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Verificar se a análise de crédito foi aprovada
      if (!creditAnalysisCompleted) {
        alert("É necessário realizar e aprovar a análise de crédito antes de criar o lance.");
        return;
      }

      // Preparar dados para o banco
      const loanData = {
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.goal),
        interest_rate: parseFloat(formData.interest),
        term_months: parseInt(formData.term),
        category: formData.category,
        risk_score: "medium", // default para MVP
        deadline: new Date().toISOString(), // será calculado no hook
      };

      // Criar o lance
      await createLoanMutation.mutateAsync(loanData);
    } catch (error) {
      console.error("Erro ao criar lance:", error);
      alert("Erro ao criar lance. Tente novamente.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Título do Lance *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: TechGrow Software Development"
                className="bg-muted border-border placeholder:text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição Detalhada *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva seu projeto, objetivos, mercado-alvo, etc..."
                rows={6}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-foreground resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria *
                </label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="w-full bg-muted border-border">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Meta de Arrecadação (R$) *
                </label>
                <Input
                  type="number"
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  placeholder="50000"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Taxa de Juros Anual (%) *
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.interest}
                  onChange={(e) => handleInputChange("interest", e.target.value)}
                  placeholder="8.5"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prazo do Empréstimo (meses) *
                </label>
                <Input
                  type="number"
                  value={formData.term}
                  onChange={(e) => handleInputChange("term", e.target.value)}
                  placeholder="12"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo de Projeto *
              </label>
              <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                <SelectTrigger className="w-full bg-muted border-border">
                  <SelectValue placeholder="Selecione o tipo de projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Plano de Negócios *
              </label>
              <textarea
                value={formData.businessPlan}
                onChange={(e) => handleInputChange("businessPlan", e.target.value)}
                placeholder="Descreva seu plano de negócios, estratégia de execução, cronograma..."
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-foreground resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Análise de Mercado
              </label>
              <textarea
                value={formData.marketAnalysis}
                onChange={(e) => handleInputChange("marketAnalysis", e.target.value)}
                placeholder="Descreva o mercado-alvo, concorrência, oportunidades..."
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-foreground resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vantagem Competitiva
              </label>
              <textarea
                value={formData.competitiveAdvantage}
                onChange={(e) => handleInputChange("competitiveAdvantage", e.target.value)}
                placeholder="O que torna seu projeto único? Quais são suas vantagens?"
                rows={3}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-foreground resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Receita Mensal Atual (R$)
                </label>
                <Input
                  type="number"
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                  placeholder="15000"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Despesas Mensais (R$)
                </label>
                <Input
                  type="number"
                  value={formData.expenses}
                  onChange={(e) => handleInputChange("expenses", e.target.value)}
                  placeholder="8000"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Margem de Lucro (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.profitMargin}
                  onChange={(e) => handleInputChange("profitMargin", e.target.value)}
                  placeholder="25.5"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ponto de Equilíbrio (meses)
                </label>
                <Input
                  type="number"
                  value={formData.breakEvenPoint}
                  onChange={(e) => handleInputChange("breakEvenPoint", e.target.value)}
                  placeholder="8"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>
            </div>

            {/* Projeções Financeiras */}
            <div className="bg-card/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Projeções Financeiras
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    R$ {formData.monthlyRevenue ? parseInt(formData.monthlyRevenue).toLocaleString('pt-BR') : '0'}
                  </div>
                  <div className="text-sm text-foreground">Receita Mensal</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formData.profitMargin ? `${formData.profitMargin}%` : '0%'}
                  </div>
                  <div className="text-sm text-foreground">Margem de Lucro</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formData.breakEvenPoint ? `${formData.breakEvenPoint} meses` : '0 meses'}
                  </div>
                  <div className="text-sm text-foreground">Ponto de Equilíbrio</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Garantia *
                </label>
                <Select value={formData.collateralType} onValueChange={(value) => handleInputChange("collateralType", value)}>
                  <SelectTrigger className="w-full bg-muted border-border">
                    <SelectValue placeholder="Selecione o tipo de garantia" />
                  </SelectTrigger>
                  <SelectContent>
                    {collateralTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Valor da Garantia (R$) *
                </label>
                <Input
                  type="number"
                  value={formData.collateralValue}
                  onChange={(e) => handleInputChange("collateralValue", e.target.value)}
                  placeholder="75000"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição da Garantia *
              </label>
              <textarea
                value={formData.collateralDescription}
                onChange={(e) => handleInputChange("collateralDescription", e.target.value)}
                placeholder="Descreva detalhadamente a garantia oferecida..."
                rows={4}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-foreground resize-none"
              />
            </div>

            {/* Resumo da Garantia */}
            {formData.collateralType && formData.collateralValue && (
              <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Resumo da Garantia
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-foreground mb-1">Tipo:</div>
                    <div className="font-medium text-foreground">{formData.collateralType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground mb-1">Valor:</div>
                    <div className="font-medium text-foreground">
                      R$ {parseInt(formData.collateralValue).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-foreground mb-1">Descrição:</div>
                  <div className="text-foreground">{formData.collateralDescription}</div>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Seção de Análise de Crédito */}
            <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Análise de Crédito
                </h3>
              </div>
              
              {!creditAnalysisCompleted ? (
                <div className="space-y-4">
                  <p className="text-sm text-foreground/80">
                    Antes de criar seu lance, é necessário realizar uma análise de crédito para verificar sua elegibilidade.
                  </p>
                  
                  <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                    <h4 className="font-medium text-foreground mb-2">Critérios de Análise:</h4>
                    <ul className="text-sm text-foreground/80 space-y-1">
                      <li>• Renda mensal (se informada)</li>
                      <li>• Tempo de emprego</li>
                      <li>• Posse de imóvel</li>
                      <li>• Histórico de dívidas</li>
                      <li>• Inadimplências</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={handleCreditAnalysis}
                      disabled={creditAnalysis.isLoading}
                      size="sm"
                      className="bg-primary hover:bg-primary/80"
                    >
                      {creditAnalysis.isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Realizar Análise
                        </>
                      )}
                    </Button>
                    
                    {creditAnalysis.isError && (
                      <span className="text-sm text-red-500">
                        Erro na análise. Tente novamente.
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Análise de Crédito Aprovada!</span>
                  </div>
                  
                  {creditAnalysis.data && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-foreground/60">Score:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {creditAnalysis.data.score}
                        </span>
                      </div>
                      <div>
                        <span className="text-foreground/60">Threshold:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {creditAnalysis.data.threshold}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-foreground/80">
                    Sua análise foi aprovada! Agora você pode prosseguir com a criação do lance.
                  </p>
                </div>
              )}
            </div>

            {/* Upload de Imagens */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Imagens do Projeto
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Image className="w-8 h-8 mx-auto mb-2 text-foreground" />
                <p className="text-sm text-foreground mb-2">Clique para fazer upload de imagens</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, "images")}
                  className="hidden"
                  id="images-upload"
                />
                <label htmlFor="images-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm">
                    Selecionar Imagens
                  </Button>
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-foreground mb-2">
                    {formData.images.length} imagem(ns) selecionada(s)
                  </div>
                </div>
              )}
            </div>

            {/* Upload de Vídeos */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vídeos do Projeto
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Video className="w-8 h-8 mx-auto mb-2 text-foreground" />
                <p className="text-sm text-foreground mb-2">Clique para fazer upload de vídeos</p>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileUpload(e, "videos")}
                  className="hidden"
                  id="videos-upload"
                />
                <label htmlFor="videos-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm">
                    Selecionar Vídeos
                  </Button>
                </label>
              </div>
              {formData.videos.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-foreground mb-2">
                    {formData.videos.length} vídeo(s) selecionado(s)
                  </div>
                </div>
              )}
            </div>

            {/* Upload de Documentos */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Documentos
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <FileText className="w-8 h-8 mx-auto mb-2 text-foreground" />
                <p className="text-sm text-foreground mb-2">Clique para fazer upload de documentos</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload(e, "documents")}
                  className="hidden"
                  id="documents-upload"
                />
                <label htmlFor="documents-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm">
                    Selecionar Documentos
                  </Button>
                </label>
              </div>
              {formData.documents.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-foreground mb-2">
                    {formData.documents.length} documento(s) selecionado(s)
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Investimento Mínimo (R$)
                </label>
                <Input
                  type="number"
                  value={formData.minInvestment}
                  onChange={(e) => handleInputChange("minInvestment", e.target.value)}
                  placeholder="100"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Investimento Máximo (R$)
                </label>
                <Input
                  type="number"
                  value={formData.maxInvestment}
                  onChange={(e) => handleInputChange("maxInvestment", e.target.value)}
                  placeholder="5000"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bônus Early Bird (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.earlyBirdBonus}
                  onChange={(e) => handleInputChange("earlyBirdBonus", e.target.value)}
                  placeholder="1.0"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bônus de Indicação (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.referralBonus}
                  onChange={(e) => handleInputChange("referralBonus", e.target.value)}
                  placeholder="0.5"
                  className="bg-muted border-border placeholder:text-foreground"
                />
              </div>
            </div>

            {/* Configurações Avançadas */}
            <div className="bg-card/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Configurações Avançadas
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Análise ZK Proof</div>
                    <div className="text-sm text-foreground">Análise automatizada de crédito</div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-600 border-green-500/30">
                    Ativado
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Verificação KYC</div>
                    <div className="text-sm text-foreground">Verificação de identidade</div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-600 border-green-500/30">
                    Obrigatório
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Garantia Múltipla</div>
                    <div className="text-sm text-foreground">Permitir múltiplas garantias</div>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-600 border-blue-500/30">
                    Opcional
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {/* Resumo Geral */}
            <div className="bg-card/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Resumo do Lance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Informações Básicas</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Título:</span> {formData.title}</div>
                    <div><span className="font-medium">Categoria:</span> {formData.category}</div>
                    <div><span className="font-medium">Meta:</span> R$ {parseInt(formData.goal).toLocaleString('pt-BR')}</div>
                    <div><span className="font-medium">Juros:</span> {formData.interest}% ao ano</div>
                    <div><span className="font-medium">Prazo:</span> {formData.term} meses</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Projeto</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Tipo:</span> {formData.projectType}</div>
                    <div><span className="font-medium">Receita Mensal:</span> R$ {parseInt(formData.monthlyRevenue).toLocaleString('pt-BR')}</div>
                    <div><span className="font-medium">Margem:</span> {formData.profitMargin}%</div>
                    <div><span className="font-medium">Garantia:</span> {formData.collateralType}</div>
                    <div><span className="font-medium">Valor Garantia:</span> R$ {parseInt(formData.collateralValue).toLocaleString('pt-BR')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Análise ZK Proof */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Análise ZK Proof
                </h3>
              </div>
              <p className="text-sm text-foreground mb-4">
                Seu lance será analisado usando tecnologia de prova de conhecimento zero (ZK Proof), 
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

            {/* Termos e Condições */}
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Termos e Condições
              </h3>
              <div className="space-y-3 text-sm text-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Concordo com os termos de uso da plataforma</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Confirmo que todas as informações são verdadeiras</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Autorizo a análise de crédito via ZK Proof</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Entendo que o lance será revisado antes da aprovação</span>
                </div>
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
                  <WalletConnect />
                  
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
                { label: "Criar Lance" },
              ]}
            />

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-h2 sm:text-h1 font-bold text-foreground mb-2">
                Criar Novo Lance
              </h1>
              <p className="text-sm sm:text-body text-foreground">
                Preencha as informações para criar seu pedido de empréstimo
              </p>
            </div>

            {/* Steps Progress */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-sm sm:text-body text-foreground">
                  Passo {currentStep} de {steps.length}
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted text-muted-foreground"
                    }`}>
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </span>
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
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              
              <div className="flex items-center gap-4">
                <Link to="/borrower/lances">
                  <Button variant="outline">
                    Cancelar
                  </Button>
                </Link>
                
                {currentStep < steps.length ? (
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/80">
                    Próximo
                  </Button>
                ) : (
                  <>
                    {/* Botão de Análise de Crédito */}
                    {!creditAnalysisCompleted && (
                      <Button 
                        onClick={handleCreditAnalysis}
                        disabled={creditAnalysis.isLoading}
                        variant="outline"
                        className="mr-2"
                      >
                        {creditAnalysis.isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                            Analisando...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Analisar Crédito
                          </>
                        )}
                      </Button>
                    )}
                    
                    {/* Status da Análise */}
                    {creditAnalysisCompleted && (
                      <Badge variant="default" className="mr-2 bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Crédito Aprovado
                      </Badge>
                    )}
                    
                    {/* Botão Criar Lance */}
                    <Button 
                      onClick={handleSubmit}
                      disabled={createLoanMutation.isPending || !creditAnalysisCompleted}
                      className="bg-primary hover:bg-primary/80"
                    >
                      {createLoanMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Criando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Criar Lance
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateLance; 