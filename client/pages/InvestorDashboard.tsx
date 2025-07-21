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
import { useTheme } from "@/contexts/ThemeContext";

const InvestorDashboard = () => {
  const { theme, toggleTheme } = useTheme();


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
      statusColor: "text-success",
      bgColor: "bg-success/10",
    },
    {
      amount: "R$5.262,56",
      change: "1,5%",
      status: "Em Análise",
      statusColor: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      amount: "R$5.262,56",
      change: "1,5%",
      status: "Não Autorizada",
      statusColor: "text-destructive",
      bgColor: "bg-destructive/10",
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
              {/* Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground" />
                <Input
                  placeholder="Buscar"
                  className="pl-10 bg-muted border-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
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
                  <h1 className="text-h2 font-semibold mb-2 text-foreground">Olá, José</h1>
                  <p className="text-body text-foreground">
                    Você ainda não possui um Saldo ativo
                  </p>
                </div>

                {/* Wallet Card */}
                <div className="bg-card/20 rounded-xl p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-h4 font-semibold mb-5 text-foreground">Carteira</h2>
                      <div className="text-h1 font-bold text-foreground">R$ 0,00</div>
                    </div>

                    <div className="flex gap-4">
                      <Link to="/investor/deposit">
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
                          Depositar
                        </Button>
                      </Link>
                      <Link to="/investor/withdraw">
                        <Button variant="outline" className="flex-1">
                          Sacar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Contributions */}
                <div className="bg-card/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-h4 font-semibold text-foreground">Contribuições</h2>
                    <div className="flex items-center gap-2 text-body text-foreground bg-muted px-3 py-1 rounded">
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
                          <div className="font-semibold text-foreground">
                            {contribution.amount}
                          </div>
                          <div className="flex items-center gap-1 text-small text-muted-foreground">
                            <ChevronDown className="w-3 h-3" />
                            <span>{contribution.change}</span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded text-body font-semibold ${contribution.bgColor} ${contribution.statusColor}`}
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
                <div className="bg-card/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-h4 font-semibold text-foreground">
                      Performance de Investimentos
                    </h2>
                    <div className="text-body text-foreground bg-muted px-3 py-1 rounded">
                      APY
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-success/10 to-success/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-body font-semibold text-foreground">
                          TechGrow Software
                        </div>
                        <div className="text-success font-bold">
                          +8.2% APY
                        </div>
                      </div>
                      <div className="text-small text-foreground">
                        Investido: R$15.000 • Retorno: R$1.230
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-info/10 to-info/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-body font-semibold text-foreground">
                          Fresh Eats Cafe
                        </div>
                        <div className="text-info font-bold">
                          +6.5% APY
                        </div>
                      </div>
                      <div className="text-small text-foreground">
                        Investido: R$8.500 • Retorno: R$552
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-body font-semibold text-foreground">
                          Urban Apparel
                        </div>
                        <div className="text-secondary font-bold">
                          +5.8% APY
                        </div>
                      </div>
                      <div className="text-small text-foreground">
                        Investido: R$12.000 • Retorno: R$696
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-foreground">APY Médio Total</span>
                      <span className="font-bold text-primary">6.8%</span>
                    </div>
                    <div className="text-center text-body text-foreground">
                      Total Investido: R$35.500 • Total Retorno: R$2.478
                    </div>
                  </div>

                  <Link to="/investor/investments">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors mt-4">
                      Ver Detalhes dos Investimentos
                    </Button>
                  </Link>
                </div>

                {/* Recent Activities */}
                <div className="bg-card/20 rounded-xl p-6">
                  <h2 className="text-h4 font-semibold mb-4 text-foreground">
                    Atividades Recentes
                  </h2>
                  <div className="text-center text-body text-foreground py-8">
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
