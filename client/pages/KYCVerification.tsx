import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit,
  FileText,
  Camera,
  CheckCircle,
  Info,
  Scan,
  BarChart3,
} from "lucide-react";

const KYCVerification = () => {
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

  const kycSteps = [
    {
      title: "KYC Verificação",
      steps: [
        {
          icon: Edit,
          label: "Informações Pessoais",
          completed: true,
          active: true,
        },
        { icon: FileText, label: "Verificação ID", completed: false },
        { icon: Camera, label: "Selfie", completed: false },
        { icon: CheckCircle, label: "Review", completed: false },
      ],
    },
    {
      title: "Dados de Crédito",
      steps: [
        { icon: Info, label: "Informações Gerais", completed: false },
        { icon: Scan, label: "Scanear Garantia", completed: false },
        { icon: BarChart3, label: "Análise", completed: false },
      ],
    },
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
        <header className="px-6 lg:px-20 py-5 border-b border-border/10">
          <div className="flex items-center gap-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  Z
                </span>
              </div>
              <span className="text-foreground font-semibold">FINANCE</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold">Solicitação de Crédito</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex min-h-[calc(100vh-117px)]">
          {/* Sidebar - Process Steps */}
          <div className="w-80 border-r border-border/5 px-20 py-10">
            <div className="w-60 space-y-10">
              {kycSteps.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section Title */}
                  <div className="bg-white/5 rounded-lg px-5 py-3 mb-5 text-center">
                    <h3 className="font-bold text-base">{section.title}</h3>
                  </div>

                  {/* Steps */}
                  <div className="space-y-5">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex}>
                        <div className="flex items-center justify-end gap-3">
                          <span
                            className={`text-xs font-bold ${
                              step.active ? "text-white" : "text-white/80"
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
                                  ? "text-white"
                                  : "text-white/30"
                              }`}
                            />
                          </div>
                        </div>
                        {stepIndex < section.steps.length - 1 && (
                          <div className="flex justify-end pr-4 py-2">
                            <div className="w-0.5 h-7 bg-white/8"></div>
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
              {/* Form Header */}
              <div className="mb-9 space-y-5">
                <div className="text-xs text-muted-foreground opacity-80">
                  Passo 1/4
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-medium">
                    Verifique sua Identidade
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Preencha os espaços com suas informações pessoais
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Input
                    placeholder="Nome completo"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                  />
                  <Input
                    placeholder="Data de nascimento"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                  />
                </div>

                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-2">
                    <Input
                      placeholder="CEP"
                      value={formData.cep}
                      onChange={(e) => handleInputChange("cep", e.target.value)}
                      className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      placeholder="Estado"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                    />
                  </div>
                </div>

                <Input
                  placeholder="Cidade"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                />

                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-3">
                    <Input
                      placeholder="Endereço"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                    />
                  </div>
                  <Input
                    placeholder="Número"
                    value={formData.number}
                    onChange={(e) =>
                      handleInputChange("number", e.target.value)
                    }
                    className="h-12 bg-gradient-to-r from-white/5 to-transparent border-white/10"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-20">
                <Link to="/user-selection" className="w-40">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-white/10 bg-transparent text-white hover:bg-white/5"
                  >
                    Voltar
                  </Button>
                </Link>
                <div className="w-40">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Avançar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
