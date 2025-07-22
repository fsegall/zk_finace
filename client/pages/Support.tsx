import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Search,
  User,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Video,
  Download,
  Send,
} from "lucide-react";

const Support = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "Como funciona o processo de empréstimo?",
      answer: "O processo é simples: você cadastra seus colaterais, solicita o empréstimo, os investidores fazem lances e você escolhe a melhor proposta. O dinheiro é liberado após a aprovação.",
    },
    {
      question: "Quais documentos são necessários para o KYC?",
      answer: "Você precisa de RG, CPF, comprovante de residência e selfie. Para verificação completa, também pode ser solicitado comprovante de renda.",
    },
    {
      question: "Como são calculados os juros?",
      answer: "Os juros são definidos pelos investidores através de lances. O sistema funciona como um leilão reverso, onde você escolhe a proposta com menor taxa de juros.",
    },
    {
      question: "Posso antecipar o pagamento?",
      answer: "Sim! Você pode quitar o empréstimo antecipadamente com desconto. Entre em contato conosco para calcular o valor da quitação.",
    },
    {
      question: "O que acontece se eu atrasar um pagamento?",
      answer: "Atrasos geram multa e juros. Recomendamos sempre pagar em dia para manter uma boa reputação e conseguir melhores condições futuras.",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      description: "Atendimento 24/7",
      value: "(11) 3000-0000",
      action: "Ligar agora",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Resposta em até 2h",
      value: "suporte@zkfinance.com",
      action: "Enviar email",
    },
    {
      icon: MessageCircle,
      title: "Chat",
      description: "Atendimento online",
      value: "Disponível agora",
      action: "Iniciar chat",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Guia do Usuário",
      description: "Tutorial completo da plataforma",
      type: "PDF",
    },
    {
      icon: Video,
      title: "Vídeos Tutoriais",
      description: "Aprenda com vídeos explicativos",
      type: "Vídeo",
    },
    {
      icon: FileText,
      title: "Termos de Uso",
      description: "Políticas e condições da plataforma",
      type: "PDF",
    },
    {
      icon: Download,
      title: "Aplicativo Mobile",
      description: "Baixe nosso app para Android e iOS",
      type: "App",
    },
  ];

  const filteredFaq = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 lg:px-20 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-20">
              {/* Logo */}
              <div className="flex items-center">
                <svg
                  className="h-8 w-auto"
                  viewBox="0 0 442 149"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z"
                    fill="url(#paint0_linear_logo_support)"
                  />
                  <path
                    d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                    fill="url(#paint1_linear_logo_support)"
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
                      id="paint0_linear_logo_support"
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
                      id="paint1_linear_logo_support"
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

              {/* Title */}
              <h1 className="text-h2 font-semibold text-foreground">Suporte</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
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
        <main className="px-6 lg:px-20 py-8">
          <Breadcrumb
            items={[
              { label: "Início", href: "/user-selection" },
              { label: "Dashboard", href: "/borrower/dashboard" },
              { label: "Suporte" },
            ]}
          />

          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link
              to="/borrower/dashboard"
              className="inline-flex items-center gap-2 text-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>

            {/* Hero Section */}
            <div className="bg-card/20 rounded-xl p-8 mb-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-h3 font-semibold text-foreground mb-2">
                Como podemos ajudar?
              </h2>
              <p className="text-body text-foreground max-w-2xl mx-auto">
                Encontre respostas rápidas para suas dúvidas ou entre em contato com nossa equipe de suporte especializada.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-card/20 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-h5 font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-small text-foreground mb-3">{method.description}</p>
                  <div className="text-body font-medium text-foreground mb-4">{method.value}</div>
                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                    {method.action}
                  </Button>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-card/20 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h3 className="text-h4 font-semibold text-foreground">Perguntas Frequentes</h3>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input
                  placeholder="Buscar nas perguntas frequentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border placeholder:text-foreground"
                />
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFaq.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <button
                      className="w-full p-4 text-left bg-muted/50 hover:bg-muted/70 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-body font-medium text-foreground">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-foreground" />
                        )}
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 bg-background">
                        <p className="text-body text-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-card/20 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-h4 font-semibold text-foreground">Recursos Úteis</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((resource, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <resource.icon className="w-5 h-5 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <h4 className="text-body font-medium text-foreground mb-1">{resource.title}</h4>
                    <p className="text-small text-foreground mb-3">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h3 className="text-h4 font-semibold text-foreground">Enviar Mensagem</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Assunto</label>
                    <Input
                      placeholder="Digite o assunto da sua mensagem"
                      className="h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Mensagem</label>
                    <textarea
                      placeholder="Descreva sua dúvida ou problema..."
                      className="w-full h-32 px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Telefone (opcional)</label>
                    <Input
                      placeholder="(11) 99999-9999"
                      className="h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>
                  <div className="pt-4">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support; 