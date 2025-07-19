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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const InvestorDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Star, label: "Ranking", active: false },
    { icon: TrendingUp, label: "Lances Contribuídos", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  const contributions = [
    {
      amount: "R$5.262,56",
      change: "1,5%",
      status: "Aprovada",
      statusColor: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      amount: "R$5.262,56",
      change: "1,5%",
      status: "Em Análise",
      statusColor: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      amount: "R$5.262,56",
      change: "1,5%",
      status: "Não Autorizada",
      statusColor: "text-red-400",
      bgColor: "bg-red-400/10",
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <Home className="w-4 h-4 text-primary" />
              Dashboard
            </Link>
            <Link
              to="/investor/ranking"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Star className="w-4 h-4" />
              Ranking
            </Link>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <TrendingUp className="w-4 h-4" />
              Lances Contribuídos
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>
          </nav>

          {/* Support */}
          <div className="mt-auto pt-8">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg">
              <HelpCircle className="w-4 h-4" />
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
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <User className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="text-sm">José Soares</span>
                      <span className="text-xs text-muted-foreground">
                        @josoa1977
                      </span>
                    </div>
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
                { label: "Dashboard" },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Welcome Section */}
                <div className="px-5">
                  <h1 className="text-2xl font-semibold mb-2">Olá, José</h1>
                  <p className="text-muted-foreground">
                    Você ainda não possui um Saldo ativo
                  </p>
                </div>

                {/* Wallet Card */}
                <div className="bg-card rounded-xl p-8 border border-border">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-5">Carteira</h2>
                      <div className="text-4xl font-bold">R$ 0,00</div>
                    </div>

                    <div className="flex gap-4">
                      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        Depositar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Sacar
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Contributions */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Contribuições</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded">
                      <span>Últimos 7 dias</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {contributions.map((contribution, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">
                            {contribution.amount}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <ChevronDown className="w-3 h-3" />
                            <span>{contribution.change}</span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded text-sm font-semibold ${contribution.bgColor} ${contribution.statusColor}`}
                        >
                          {contribution.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Investment Performance Section */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">
                      Performance de Investimentos
                    </h2>
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded">
                      APY
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">
                          TechGrow Software
                        </div>
                        <div className="text-green-600 dark:text-green-400 font-bold">
                          +8.2% APY
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Investido: R$15.000 • Retorno: R$1.230
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">
                          Fresh Eats Cafe
                        </div>
                        <div className="text-blue-600 dark:text-blue-400 font-bold">
                          +6.5% APY
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Investido: R$8.500 • Retorno: R$552
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">
                          Urban Apparel
                        </div>
                        <div className="text-purple-600 dark:text-purple-400 font-bold">
                          +5.8% APY
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Investido: R$12.000 • Retorno: R$696
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold">APY Médio Total</span>
                      <span className="font-bold text-primary">6.8%</span>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Total Investido: R$35.500 • Total Retorno: R$2.478
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                    Ver Detalhes dos Investimentos
                  </Button>
                </div>

                {/* Recent Activities */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="text-xl font-semibold mb-4">
                    Atividades Recentes
                  </h2>
                  <div className="text-center text-muted-foreground py-8">
                    Nenhuma atividade recente
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
