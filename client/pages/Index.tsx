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
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: TrendingUp, label: "Lances", active: false },
    { icon: Wallet, label: "Carteira", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  const collateralItems = [
    {
      type: "Eletrônico",
      description: "Macbook Apple 16 Po...",
      value: "R$2.454,32",
      status: "Aprovado",
    },
    {
      type: "Eletrodoméstico",
      description: "Geladeira Brastemp...",
      value: "R$2.454,32",
      status: "Aprovado",
    },
    {
      type: "Casa",
      description: "Quarto Roupa Madeira M...",
      value: "R$2.454,32",
      status: "Aprovado",
    },
  ];

  const creditRequests = [
    { amount: "R$5.202,86", status: "Aprovada", statusColor: "text-green-400" },
    {
      amount: "R$5.202,86",
      status: "Em Análise",
      statusColor: "text-yellow-400",
    },
    {
      amount: "R$5.202,86",
      status: "Não Autorizada",
      statusColor: "text-red-400",
    },
  ];

  const recentActivities = [
    { user: "Matheus da Silva", action: "Contribui no Lance", time: "Agora" },
    {
      user: "Debora Carvalho",
      action: "Contribui no Lance",
      time: "15/05/2023",
    },
    {
      user: "Felipe Cavalcanti",
      action: "Contribui no Lance",
      time: "15/05/2023",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
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
                fill="url(#paint0_linear_logo_index)"
              />
              <path
                d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                fill="url(#paint1_linear_logo_index)"
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
                  id="paint0_linear_logo_index"
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
                  id="paint1_linear_logo_index"
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
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Support */}
          <div className="mt-auto pt-8">
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
                      @maria.c.M
                    </span>
                  </div>
                </div>

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Welcome Section */}
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Olá, Maria</h1>
                  <p className="text-muted-foreground">
                    Você ainda não possui um crédito ativo
                  </p>
                </div>

                {/* Wallet Card */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Carteira</h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {showBalance ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="text-3xl font-bold mb-6">
                    {showBalance ? "R$ 0,00" : "R$ ****"}
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Solicitar Crédito
                    </Button>
                    <Button variant="outline">Sacar</Button>
                  </div>
                </div>

                {/* Credit Requests */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">
                      Solicitações de Crédito
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Últimos 7 dias</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {creditRequests.map((request, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3"
                      >
                        <span className="font-medium text-base">
                          {request.amount}
                        </span>
                        <span
                          className={`text-sm font-medium ${request.statusColor}`}
                        >
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Collateral Section */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">
                      Colaterais Cadastrados
                    </h2>
                    <button className="text-sm text-primary hover:underline">
                      Ver todos
                    </button>
                  </div>

                  <div className="space-y-3">
                    {collateralItems.map((item, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium">
                            {item.value}
                          </span>
                          <span className="text-xs text-green-400">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Valor Total de bens
                      </span>
                      <span className="font-bold">R$100.000,00</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    Cadastrar Colateral
                  </Button>
                </div>

                {/* Recent Activities */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Atividades Recentes</h2>
                    <button className="text-sm text-primary hover:underline">
                      Ver todas
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">
                            {activity.user}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.action}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {activity.time}
                        </div>
                      </div>
                    ))}
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

export default Dashboard;
