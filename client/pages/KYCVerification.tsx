import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Edit,
  FileText,
  Camera,
  CheckCircle,
  Info,
  Scan,
  BarChart3,
  Sun,
  Moon,
  Bell,
  User,
} from "lucide-react";

const KYCVerification = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
    cep: "",
    state: "",
    city: "",
    address: "",
    number: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const kycSteps = [
    {
      title: "KYC Verificação",
      steps: [
        {
          icon: Edit,
          label: "Informações Pessoais",
          completed: currentStep > 0,
          active: currentStep === 0,
        },
        { 
          icon: FileText, 
          label: "Verificação ID", 
          completed: currentStep > 1,
          active: currentStep === 1,
        },
        { 
          icon: Camera, 
          label: "Selfie", 
          completed: currentStep > 2,
          active: currentStep === 2,
        },
        { 
          icon: CheckCircle, 
          label: "Review", 
          completed: currentStep > 3,
          active: currentStep === 3,
        },
      ],
    },
    {
      title: "Dados de Crédito",
      steps: [
        { 
          icon: Info, 
          label: "Informações Gerais", 
          completed: currentStep > 4,
          active: currentStep === 4,
        },
        { 
          icon: Scan, 
          label: "Scanear Garantia", 
          completed: currentStep > 5,
          active: currentStep === 5,
        },
        { 
          icon: BarChart3, 
          label: "Análise", 
          completed: currentStep > 6,
          active: currentStep === 6,
        },
      ],
    },
  ];

  const stepTitles = [
    "Informações Pessoais",
    "Verificação ID",
    "Selfie",
    "Review",
    "Informações Gerais",
    "Scanear Garantia",
    "Análise"
  ];

  const stepDescriptions = [
    "Preencha os espaços com suas informações pessoais",
    "Faça upload dos documentos de identificação",
    "Tire uma selfie para verificação facial",
    "Revise todas as informações antes de prosseguir",
    "Informe seus dados financeiros e de crédito",
    "Escaneie ou fotografe seus bens como garantia",
    "Processamento ZK e geração de score de crédito"
  ];

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
                  fill="url(#paint0_linear_logo_kyc)"
                />
                <path
                  d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                  fill="url(#paint1_linear_logo_kyc)"
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
                    id="paint0_linear_logo_kyc"
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
                    id="paint1_linear_logo_kyc"
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
            <h1 className="text-h2 font-semibold">Solicitação de Crédito</h1>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-body">Maria Cardoso</span>
                <span className="text-small text-muted-foreground">
                  @maaria_89
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
        <div className="flex min-h-[calc(100vh-117px)]">
          {/* Sidebar - Process Steps */}
                        <div className="w-80 px-20 py-10">
            <div className="w-60 space-y-10">
              {kycSteps.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section Title */}
                  <div className="bg-muted/50 rounded-lg px-5 py-3 mb-5 text-center">
                    <h3 className="font-bold text-h5 text-foreground">{section.title}</h3>
                  </div>

                  {/* Steps */}
                  <div className="space-y-5">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <div className="flex items-center justify-end gap-3">
                          <span
                            className={`text-small font-bold ${
                              step.active ? "text-foreground" : "text-foreground opacity-60"
                            }`}
                          >
                            {step.label}
                          </span>
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-primary"
                                : step.active
                                  ? "bg-primary"
                                  : "bg-white/10"
                            }`}
                          >
                            <step.icon
                              className={`w-4 h-4 ${
                                step.completed || step.active
                                  ? "text-primary-foreground"
                                  : "text-foreground opacity-60"
                              }`}
                            />
                          </div>
                        </div>
                        {stepIndex < section.steps.length - 1 && (
                          <div className="flex justify-end pr-4 py-2">
                            <div className="w-0.5 h-7 bg-muted/30"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-20 py-10">
            <div className="max-w-xl mx-auto">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/user-selection" },
                  { label: "KYC Verificação" },
                ]}
              />

              {/* Form Header */}
              <div className="mb-9 space-y-5">
                <div className="text-xs text-foreground opacity-80">
                  Passo {currentStep + 1}/7
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-medium text-foreground">
                    {stepTitles[currentStep]}
                  </h2>
                  <p className="text-sm text-foreground">
                    {stepDescriptions[currentStep]}
                  </p>
                </div>
              </div>

              {/* Step Content */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Input
                      placeholder="Nome completo"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="CPF"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                    <Input
                      placeholder="Data de nascimento"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-2">
                      <Input
                        placeholder="CEP"
                        value={formData.cep}
                        onChange={(e) => handleInputChange("cep", e.target.value)}
                        className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Estado"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                      />
                    </div>
                  </div>

                  <Input
                    placeholder="Cidade"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                  />

                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-3">
                      <Input
                        placeholder="Endereço"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                      />
                    </div>
                    <Input
                      placeholder="Número"
                      value={formData.number}
                      onChange={(e) =>
                        handleInputChange("number", e.target.value)
                      }
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-muted">
                    <div className="text-center space-y-4">
                      <FileText className="w-12 h-12 mx-auto text-foreground opacity-60" />
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Upload de Documentos
                        </h3>
                        <p className="text-sm text-foreground opacity-80 mb-4">
                          Faça upload dos seguintes documentos:
                        </p>
                        <ul className="text-sm text-foreground opacity-80 space-y-2 mb-6">
                          <li>• RG ou CNH (frente e verso)</li>
                          <li>• CPF</li>
                          <li>• Comprovante de residência</li>
                        </ul>
                      </div>
                      <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-muted">
                    <div className="text-center space-y-4">
                      <Camera className="w-12 h-12 mx-auto text-foreground opacity-60" />
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Verificação Facial
                        </h3>
                        <p className="text-sm text-foreground opacity-80 mb-4">
                          Tire uma selfie para verificação de identidade
                        </p>
                      </div>
                      <div className="w-48 h-48 bg-muted/50 rounded-lg mx-auto flex items-center justify-center">
                        <Camera className="w-16 h-16 text-foreground opacity-40" />
                      </div>
                      <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                        Tirar Selfie
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-foreground mb-4">
                      Revisão das Informações
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-foreground opacity-80">Nome</label>
                          <p className="text-foreground font-medium">{formData.fullName || "Não informado"}</p>
                        </div>
                        <div>
                          <label className="text-sm text-foreground opacity-80">CPF</label>
                          <p className="text-foreground font-medium">{formData.cpf || "Não informado"}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-foreground opacity-80">Endereço</label>
                        <p className="text-foreground font-medium">
                          {formData.address ? `${formData.address}, ${formData.number} - ${formData.city}, ${formData.state}` : "Não informado"}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-muted">
                        <p className="text-sm text-foreground opacity-80">
                          ✓ Documentos enviados<br/>
                          ✓ Selfie capturada<br/>
                          ✓ Informações verificadas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      placeholder="Renda mensal"
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                    <Input
                      placeholder="Profissão"
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                    <Input
                      placeholder="Empresa"
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                    <Input
                      placeholder="Telefone"
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                    <Input
                      placeholder="Email"
                      className="h-12 bg-muted/50 border-border placeholder:text-foreground text-foreground"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-muted">
                    <div className="text-center space-y-4">
                      <Scan className="w-12 h-12 mx-auto text-foreground opacity-60" />
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Garantias e Colaterais
                        </h3>
                        <p className="text-sm text-foreground opacity-80 mb-4">
                          Escaneie ou fotografe seus bens como garantia:
                        </p>
                        <ul className="text-sm text-foreground opacity-80 space-y-2 mb-6">
                          <li>• Veículos</li>
                          <li>• Imóveis</li>
                          <li>• Eletrônicos</li>
                          <li>• Outros bens de valor</li>
                        </ul>
                      </div>
                      <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                        Escanear Garantias
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-muted/30 rounded-lg p-6">
                    <div className="text-center space-y-4">
                      <BarChart3 className="w-12 h-12 mx-auto text-foreground opacity-60" />
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Análise com Prova ZK em Andamento
                        </h3>
                        <p className="text-sm text-foreground opacity-80 mb-4">
                          Estamos processando seus dados através de nossa tecnologia ZK Finance.
                          Este processo pode levar até 24 horas.
                        </p>
                        
                        {/* ZK Proof Section */}
                        <div className="bg-primary/10 rounded-lg p-4 mb-4 border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-primary">Prova ZK de Score de Crédito</span>
                          </div>
                          <p className="text-xs text-foreground opacity-80 text-left">
                            Seus dados financeiros e pessoais são processados por algoritmos de IA 
                            sem serem armazenados. Apenas o score final é gerado através de prova 
                            zero-knowledge, garantindo total privacidade.
                          </p>
                        </div>

                        {/* Privacy Notice */}
                        <div className="bg-success/10 rounded-lg p-4 mb-4 border border-success/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm font-medium text-success">Privacidade Garantida</span>
                          </div>
                          <ul className="text-xs text-foreground opacity-80 text-left space-y-1">
                            <li>• Dados pessoais não são armazenados</li>
                            <li>• Processamento via algoritmo ZK</li>
                            <li>• Score gerado por IA sem retenção de dados</li>
                            <li>• Conformidade com LGPD</li>
                          </ul>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-gradient-to-r from-primary to-cyan-400 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                        </div>
                        <p className="text-xs text-foreground opacity-60">
                          Processando prova ZK... 60%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-20">
                {currentStep === 0 ? (
                  <Link to="/login" className="w-40">
                    <Button
                      variant="outline"
                      className="w-full h-12 border-border bg-transparent text-foreground hover:bg-muted/50"
                    >
                      Voltar
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="w-40 h-12 border-border bg-transparent text-foreground hover:bg-muted/50"
                  >
                    Anterior
                  </Button>
                )}
                
                {currentStep === 6 ? (
                  <Link to="/borrower/dashboard" className="w-40">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                      Finalizar
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={handleNextStep}
                    className="w-40 h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
                  >
                    Próximo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
