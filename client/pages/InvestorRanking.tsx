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
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const InvestorRanking = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Star, label: "Ranking", active: true },
    { icon: TrendingUp, label: "Lances Contribuídos", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  const topLances = [
    {
      id: 1,
      title: "TechGrow Software Development",
      author: "Maria Cardoso",
      level: "Nível 1",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
    },
    {
      id: 2,
      title: "TechGrow Software Development",
      author: "Maria Cardoso",
      level: "Nível 1",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
    },
    {
      id: 3,
      title: "TechGrow Software Development",
      author: "Maria Cardoso",
      level: "Nível 1",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
    },
    {
      id: 4,
      title: "TechGrow Software Development",
      author: "Maria Cardoso",
      level: "Nível 1",
      value: "R$50.000,00",
      interest: "5.8% APR",
      expires: "5 dias",
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/investor/ranking"
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors bg-sidebar-accent text-sidebar-accent-foreground`}
            >
              <Star className="w-4 h-4 text-primary" />
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
                      <span className="text-sm">Maria Cardoso</span>
                      <span className="text-xs text-muted-foreground">
                        @maaria_89
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
            <div className="max-w-4xl mx-auto">
              <Breadcrumb
                items={[
                  { label: "Início", href: "/user-selection" },
                  { label: "Dashboard", href: "/investor/dashboard" },
                  { label: "Ranking" },
                ]}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Top Lances</h1>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="text-muted-foreground">Filtrar</span>
                </div>
              </div>

              {/* Top Lances List */}
              <div className="space-y-4">
                {topLances.map((lance) => (
                  <div
                    key={lance.id}
                    className="bg-card rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left side - Project info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">
                              {lance.author}
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700 flex items-center gap-1"
                            >
                              <Star className="w-3 h-3 fill-current" />
                              {lance.level}
                            </Badge>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-2">
                          {lance.title}
                        </h3>

                        <div className="grid grid-cols-3 gap-8 text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Valor
                            </div>
                            <div className="font-semibold">{lance.value}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Interesse
                            </div>
                            <div className="font-semibold">
                              {lance.interest}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Expira em
                            </div>
                            <div className="font-semibold">{lance.expires}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right side - Actions */}
                      <div className="flex items-center gap-4 ml-8">
                        <Button variant="outline" size="sm">
                          Ver detalhes do lance
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90">
                          Investir
                        </Button>
                      </div>
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

export default InvestorRanking;
