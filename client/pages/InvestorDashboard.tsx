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

  const collateralItems = [
    {
      type: "Eletrônico",
      description: "Mackbook Apple 16 Pro...",
      value: "R$52.454,32",
      date: "14/02/2025",
    },
    {
      type: "Eletrodoméstico",
      description: "Geladeira Brastemp",
      value: "R$52.454,32",
      date: "14/02/2025",
    },
    {
      type: "Casa",
      description: "Guarda Roupa Madeira Maçi",
      value: "R$52.454,32",
      date: "14/02/2025",
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
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                Z
              </span>
            </div>
            <span className="text-sidebar-foreground font-semibold">
              FINANCE
            </span>
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
                {/* Collateral Section */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold">
                      Colaterais Cadastrados
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {collateralItems.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-muted px-2 py-1 rounded text-sm font-semibold">
                            {item.type}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm opacity-80">
                              {item.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">
                              {item.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold">Valor Total de bens</span>
                      <span className="font-bold">R$100.000,00</span>
                      <button className="text-sm text-muted-foreground hover:text-foreground">
                        Ver todos
                      </button>
                    </div>
                  </div>

                  <Button className="w-64 bg-primary text-primary-foreground hover:bg-primary/90">
                    Cadastrar Colateral
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
