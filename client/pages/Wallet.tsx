import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  User,
  Search,
  Bell,
  Sun,
  Moon,
  CreditCard,
  PieChart,
  FileText,
} from "lucide-react";

const Wallet = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();

  const walletData = {
    saldoDevedor: "R$ 45.000,00",
    prazoPagamento: "18 meses",
    credores: [
      { nome: "João Silva", valor: "R$ 15.000,00", status: "Ativo" },
      { nome: "Maria Santos", valor: "R$ 20.000,00", status: "Ativo" },
      { nome: "Pedro Costa", valor: "R$ 10.000,00", status: "Ativo" },
    ],
    mesesRestantes: 12,
    montanteQuitacaoImediata: "R$ 42.000,00",
    montanteTotalFinal: "R$ 52.500,00",
    proximoVencimento: "15/04/2024",
    valorParcela: "R$ 2.500,00",
  };

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
                    fill="url(#paint0_linear_logo_wallet)"
                  />
                  <path
                    d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                    fill="url(#paint1_linear_logo_wallet)"
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
                      id="paint0_linear_logo_wallet"
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
                      id="paint1_linear_logo_wallet"
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
              <h1 className="text-h2 font-semibold text-foreground">Carteira</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                  {user?.user_metadata?.avatar_url && (
                    <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                  )}
                  <span className="text-body">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                  <span className="text-small text-foreground">
                    @{user?.email ? user.email.split("@")[0] : "usuario"}
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
        <main className="px-6 lg:px-20 py-8">
          <Breadcrumb
            items={[
              { label: "Início", href: "/user-selection" },
              { label: "Dashboard", href: "/borrower/dashboard" },
              { label: "Carteira" },
            ]}
          />

          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link
              to="/borrower/dashboard"
              className="inline-flex items-center gap-2 text-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>

            {/* Main Wallet Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Saldo Devedor */}
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-semibold text-foreground">Saldo Devedor</h3>
                    <p className="text-body text-foreground">Valor total em aberto</p>
                  </div>
                </div>
                <div className="text-h2 font-bold text-foreground mb-2">
                  {walletData.saldoDevedor}
                </div>
                <div className="flex items-center gap-2 text-small text-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Atualizado hoje</span>
                </div>
              </div>

              {/* Prazo de Pagamento */}
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-semibold text-foreground">Prazo de Pagamento</h3>
                    <p className="text-body text-foreground">Tempo restante</p>
                  </div>
                </div>
                <div className="text-h2 font-bold text-foreground mb-2">
                  {walletData.prazoPagamento}
                </div>
                <div className="flex items-center gap-2 text-small text-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{walletData.mesesRestantes} meses restantes</span>
                </div>
              </div>

              {/* Próximo Vencimento */}
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-h5 font-semibold text-foreground">Próximo Vencimento</h3>
                    <p className="text-body text-foreground">Próxima parcela</p>
                  </div>
                </div>
                <div className="text-h2 font-bold text-foreground mb-2">
                  {walletData.proximoVencimento}
                </div>
                <div className="flex items-center gap-2 text-small text-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>{walletData.valorParcela}</span>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credores */}
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-h4 font-semibold text-foreground">Credores</h3>
                </div>
                <div className="space-y-4">
                  {walletData.credores.map((credor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-body font-medium text-foreground">{credor.nome}</div>
                          <div className="text-small text-foreground">{credor.valor}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        {credor.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quitação e Totais */}
              <div className="bg-card/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-6 h-6 text-primary" />
                  <h3 className="text-h4 font-semibold text-foreground">Quitação e Totais</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body font-medium text-foreground">Quitação Imediata</span>
                      <span className="text-h5 font-bold text-foreground">{walletData.montanteQuitacaoImediata}</span>
                    </div>
                    <p className="text-small text-foreground">Valor para quitar todo o débito hoje</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body font-medium text-foreground">Total Final</span>
                      <span className="text-h5 font-bold text-foreground">{walletData.montanteTotalFinal}</span>
                    </div>
                    <p className="text-small text-foreground">Montante total após juros no final do contrato</p>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body font-medium text-primary">Economia na Quitação</span>
                      <span className="text-h5 font-bold text-primary">R$ 10.500,00</span>
                    </div>
                    <p className="text-small text-foreground">Diferença entre quitação imediata e total final</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="flex-1 h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                Solicitar Extrato
              </Button>
              <Button variant="outline" className="flex-1 h-12">
                <DollarSign className="w-4 h-4 mr-2" />
                Negociar Quitação
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet; 