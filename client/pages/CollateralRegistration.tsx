import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  ArrowLeft,
  Upload,
  Camera,
  FileText,
  DollarSign,
  Calendar,
  MapPin,
  User,
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react";

const CollateralRegistration = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    model: "",
    description: "",
    estimatedValue: "",
    purchaseDate: "",
    condition: "",
    location: "",
    serialNumber: "",
    invoice: null,
    photos: [],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const collateralTypes = [
    "Eletrônico",
    "Eletrodoméstico",
    "Veículo",
    "Casa",
    "Móveis",
    "Joias",
    "Outros",
  ];

  const conditionOptions = [
    "Novo",
    "Seminovo",
    "Usado - Excelente",
    "Usado - Bom",
    "Usado - Regular",
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
                    fill="url(#paint0_linear_logo_collateral)"
                  />
                  <path
                    d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                    fill="url(#paint1_linear_logo_collateral)"
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
                      id="paint0_linear_logo_collateral"
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
                      id="paint1_linear_logo_collateral"
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
              <h1 className="text-h2 font-semibold">Cadastrar Colateral</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg">
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

              <Link to="/user-selection">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-body">Sair</span>
                </button>
              </Link>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                {isDarkMode ? (
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
              { label: "Cadastrar Colateral" },
            ]}
          />

          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/borrower/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>

            {/* Form */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="mb-8">
                <h2 className="text-h2 font-semibold mb-2">
                  Cadastrar Novo Colateral
                </h2>
                <p className="text-body text-muted-foreground">
                  Preencha as informações do bem que será usado como garantia
                  para seu empréstimo.
                </p>
              </div>

              <form className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Informações Básicas
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Tipo de Colateral *
                      </label>
                      <select
                        className="w-full h-12 px-3 bg-muted border border-border rounded-lg text-foreground"
                        value={formData.type}
                        onChange={(e) =>
                          handleInputChange("type", e.target.value)
                        }
                      >
                        <option value="">Selecione o tipo</option>
                        {collateralTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marca</label>
                      <Input
                        placeholder="Ex: Apple, Samsung, Toyota"
                        value={formData.brand}
                        onChange={(e) =>
                          handleInputChange("brand", e.target.value)
                        }
                        className="h-12 bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Modelo</label>
                      <Input
                        placeholder="Ex: iPhone 14 Pro, Galaxy S23"
                        value={formData.model}
                        onChange={(e) =>
                          handleInputChange("model", e.target.value)
                        }
                        className="h-12 bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Número de Série
                      </label>
                      <Input
                        placeholder="Número de série ou identifica��ão"
                        value={formData.serialNumber}
                        onChange={(e) =>
                          handleInputChange("serialNumber", e.target.value)
                        }
                        className="h-12 bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Descrição *</label>
                      <textarea
                        placeholder="Descreva detalhadamente o item, incluindo características específicas"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        className="w-full h-24 px-3 py-2 bg-muted border border-border rounded-lg text-foreground resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Value and Condition */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Valor e Estado
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Valor Estimado *
                      </label>
                      <Input
                        placeholder="R$ 0,00"
                        value={formData.estimatedValue}
                        onChange={(e) =>
                          handleInputChange("estimatedValue", e.target.value)
                        }
                        className="h-12 bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Data de Compra
                      </label>
                      <Input
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) =>
                          handleInputChange("purchaseDate", e.target.value)
                        }
                        className="h-12 bg-muted border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Estado de Conservação *
                      </label>
                      <select
                        className="w-full h-12 px-3 bg-muted border border-border rounded-lg text-foreground"
                        value={formData.condition}
                        onChange={(e) =>
                          handleInputChange("condition", e.target.value)
                        }
                      >
                        <option value="">Selecione o estado</option>
                        {conditionOptions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Localização
                  </h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Onde o bem está localizado *
                    </label>
                    <Input
                      placeholder="Endereço completo onde o bem se encontra"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="h-12 bg-muted border-border"
                    />
                  </div>
                </div>

                {/* Documents and Photos */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Documentação
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Photos Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Fotos do Item *
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Adicione fotos do item de diferentes ângulos
                        </p>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Escolher Fotos
                        </Button>
                      </div>
                    </div>

                    {/* Invoice Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Nota Fiscal / Comprovante
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Anexe a nota fiscal ou comprovante de compra
                        </p>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Escolher Arquivo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <Link to="/borrower/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full h-12">
                      Cancelar
                    </Button>
                  </Link>
                  <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Cadastrar Colateral
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollateralRegistration;
