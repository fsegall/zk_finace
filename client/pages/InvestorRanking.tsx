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
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const InvestorRanking = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();

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
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #004EF6 0%, #002168 70.19%, #00022A 87.98%)",
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
                fill="url(#paint0_linear_logo_ranking)"
              />
              <path
                d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                fill="url(#paint1_linear_logo_ranking)"
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
                  id="paint0_linear_logo_ranking"
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
                  id="paint1_linear_logo_ranking"
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
                  className="pl-10 bg-muted border-0 text-foreground placeholder:text-foreground"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    {user?.user_metadata?.avatar_url && (
                      <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-body">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                      <span className="text-small text-muted-foreground">
                        @{user?.email ? user.email.split("@")[0] : "usuario"}
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
                <h1 className="text-h2 font-semibold text-foreground">Top Lances</h1>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="text-body text-foreground">Filtrar</span>
                </div>
              </div>

              {/* Top Lances List */}
              <div className="space-y-4">
                {topLances.map((lance) => (
                  <div
                    key={lance.id}
                    className="bg-card/20 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left side - Project info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-body font-medium text-foreground">
                              {lance.author}
                            </span>
                            <Badge
                              variant="secondary"
                              className="bg-secondary/20 text-secondary flex items-center gap-1"
                            >
                              <Star className="w-3 h-3 fill-current" />
                              {lance.level}
                            </Badge>
                          </div>
                        </div>

                        <h3 className="text-h4 font-semibold mb-2 text-foreground">
                          {lance.title}
                        </h3>

                        <div className="grid grid-cols-3 gap-8 text-body">
                          <div>
                            <div className="text-foreground mb-1">
                              Valor
                            </div>
                            <div className="font-semibold text-foreground">{lance.value}</div>
                          </div>
                          <div>
                            <div className="text-foreground mb-1">
                              Interesse
                            </div>
                            <div className="font-semibold text-foreground">
                              {lance.interest}
                            </div>
                          </div>
                          <div>
                            <div className="text-foreground mb-1">
                              Expira em
                            </div>
                            <div className="font-semibold text-foreground">{lance.expires}</div>
                          </div>
                        </div>
                      </div>

                      {/* Right side - Actions */}
                      <div className="flex items-center gap-4 ml-8">
                        <Button variant="outline" size="sm">
                          Ver detalhes do lance
                        </Button>
                        <Button className="bg-primary hover:bg-primary/80 transition-colors">
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
