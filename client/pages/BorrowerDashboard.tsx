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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const BorrowerDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: TrendingUp, label: "Lances", active: false },
    { icon: Wallet, label: "Carteira", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  const lances = [
    {
      id: 1,
      title: "TechGrow Software Development",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Tech",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
      progress: 65,
      raised: "R$32.000",
      goal: "R$50.000",
    },
    {
      id: 2,
      title: "Fresh Eats Cafe Expansion",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Tech",
      value: "R$78.560,00",
      interest: "6.3% APR",
      expires: "10 dias",
      progress: 35,
      raised: "R$20.000",
      goal: "R$50.000",
    },
    {
      id: 3,
      title: "Urban Apparel Manufacturing",
      description:
        "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
      author: "Maria Cardoso",
      category: "Tech",
      value: "R$6.423,00",
      interest: "3.7% APR",
      expires: "28 dias",
      progress: 65,
      raised: "R$1.000",
      goal: "R$50.000",
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

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar border-r border-sidebar-border p-6">
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
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-4 h-4" />
              Lances
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Wallet className="w-4 h-4" />
              Carteira
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>
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
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg">
              <div className="w-4 h-4 rounded-full border border-sidebar-foreground flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
              Suporte
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar"
                  className="pl-10 bg-muted border-0"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-muted rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Maria Cardoso</span>
                    <span className="text-xs text-muted-foreground">
                      @maaria_89
                    </span>
                  </div>
                </div>

                <Link to="/user-selection">
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <span className="text-sm">Sair</span>
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

          {/* Dashboard Content */}
          <main className="p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "KYC Verificação", href: "/kyc-verification" },
                { label: "Dashboard" },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Stats and Criar Lance */}
              <div className="lg:col-span-1 space-y-6">
                {/* Create New Lance */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">Criar novo lance</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 bg-gradient-to-r from-primary to-cyan-400 rounded-full"></div>
                      <div className="h-1 flex-1 bg-muted rounded-full"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Nível 1</span>
                        <span className="text-xs text-muted-foreground">
                          Ver conquistas
                        </span>
                      </div>
                      <div className="w-full h-16 bg-gradient-to-r from-cyan-400 to-primary rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">★</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-semibold">6.56</div>
                    <div className="text-sm text-muted-foreground">
                      ZK Score
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-semibold">13</div>
                    <div className="text-sm text-muted-foreground">
                      Lances Postados
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-semibold">R$300k</div>
                    <div className="text-sm text-muted-foreground">
                      Total Arrecadados
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column - Credit Progress */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl p-6 border border-border h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">
                      Crédito Assegurado até a Data
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Meta: R$300.000</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Progresso da Meta de Aporte Total
                        </span>
                        <span className="font-semibold">67%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-primary to-cyan-400 h-4 rounded-full relative overflow-hidden"
                          style={{ width: "67%" }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>R$0</span>
                        <span>R$300.000</span>
                      </div>
                    </div>

                    {/* Current Amount */}
                    <div className="bg-gradient-to-r from-primary/10 to-cyan-400/10 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        R$200.000
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Crédito Assegurado Atual
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">R$50.000</div>
                        <div className="text-xs text-muted-foreground">
                          Jan 2024
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-semibold">R$75.000</div>
                        <div className="text-xs text-muted-foreground">
                          Fev 2024
                        </div>
                      </div>
                      <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="font-semibold text-primary">
                          R$75.000
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Mar 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Collateral */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 border border-border h-full">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">
                      Colaterais Cadastrados
                    </h2>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted px-2 py-1 rounded text-sm font-semibold">
                          Eletrônico
                        </div>
                        <div className="flex-1">
                          <div className="text-sm opacity-80">
                            Mackbook Apple 16 Pro...
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            R$52.454,32
                          </div>
                          <div className="text-xs text-muted-foreground">
                            14/02/2025
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted px-2 py-1 rounded text-sm font-semibold">
                          Casa
                        </div>
                        <div className="flex-1">
                          <div className="text-sm opacity-80">
                            Guarda Roupa Madeira...
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            R$52.454,32
                          </div>
                          <div className="text-xs text-muted-foreground">
                            14/02/2025
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">Valor Total</span>
                      <span className="font-bold">R$100.000,00</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Cadastrar Colateral
                  </Button>
                </div>
              </div>
            </div>

            {/* Meus Lances Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Meus Lances</h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="text-muted-foreground">Filtrar</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lances.map((lance) => (
                  <div
                    key={lance.id}
                    className="bg-card rounded-xl p-6 border border-border"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">
                          {lance.author}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        {lance.category}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {lance.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {lance.description}
                        </p>
                        <Button variant="outline" size="sm" className="text-xs">
                          ver detalhes do lance
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Valor</div>
                          <div className="font-semibold">{lance.value}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Interesse</div>
                          <div className="font-semibold">{lance.interest}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Expira em</div>
                          <div className="font-semibold">{lance.expires}</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground font-semibold">
                            Progresso
                          </span>
                          <span className="text-muted-foreground font-semibold">
                            {lance.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-primary h-2 rounded-full"
                            style={{ width: `${lance.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{lance.raised}</span>
                          <span>Objetivo: {lance.goal}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Solicitar Crédito
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
