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
  ArrowLeft,
  CreditCard,
  Building,
  QrCode,
  Copy,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Wallet,
  Landmark,
  Smartphone,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import WalletConnect from "../components/WalletConnect";

const InvestorWithdraw = () => {
  const { theme, toggleTheme } = useTheme();
  const [amount, setAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("pix");
  const [step, setStep] = useState(1);
  const [bankAccount, setBankAccount] = useState({
    bank: "",
    agency: "",
    account: "",
    type: "checking",
  });

  const withdrawMethods = [
    {
      id: "pix",
      name: "PIX",
      icon: QrCode,
      description: "Transferência instantânea",
      fee: "Grátis",
      time: "Imediato",
      minAmount: 10,
    },
    {
      id: "bank-transfer",
      name: "Transferência Bancária",
      icon: Landmark,
      description: "Transferência tradicional",
      fee: "R$ 5,00",
      time: "1-2 dias úteis",
      minAmount: 50,
    },
  ];

  const availableBalance = 15000; // Simulando saldo disponível

  const handleWithdraw = () => {
    if (amount && parseFloat(amount) > 0 && parseFloat(amount) <= availableBalance) {
      setStep(2);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Home className="w-4 h-4" />
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
              <div className="flex items-center gap-4">
                <Link to="/investor/dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Dashboard
                  </Button>
                </Link>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <WalletConnect />
                
                <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

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

          {/* Main Content */}
          <main className="p-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/user-selection" },
                { label: "Dashboard", href: "/investor/dashboard" },
                { label: "Sacar" },
              ]}
            />

            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-h1 font-bold text-foreground mb-2">
                  Sacar Fundos
                </h1>
                <p className="text-body text-foreground">
                  Transfira seus fundos para sua conta bancária
                </p>
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  {/* Balance Card */}
                  <div className="bg-card/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-h4 font-semibold text-foreground">
                        Saldo Disponível
                      </h2>
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      R$ {availableBalance.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-foreground">
                      Fundos disponíveis para saque
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="bg-card/20 rounded-xl p-6">
                    <h2 className="text-h4 font-semibold text-foreground mb-4">
                      Valor do Saque
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Valor (R$)
                        </label>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0,00"
                          className="text-2xl font-bold text-center bg-muted border-border"
                        />
                      </div>
                      
                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        {[100, 500, 1000, 2000, 5000, availableBalance].map((value) => (
                          <Button
                            key={value}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(value.toString())}
                            className="text-sm"
                          >
                            {value === availableBalance ? "Tudo" : `R$ ${value.toLocaleString('pt-BR')}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Withdraw Methods */}
                  <div className="bg-card/20 rounded-xl p-6">
                    <h2 className="text-h4 font-semibold text-foreground mb-4">
                      Método de Saque
                    </h2>
                    <div className="space-y-3">
                      {withdrawMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            withdrawMethod === method.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setWithdrawMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                withdrawMethod === method.id
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}>
                                <method.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">
                                  {method.name}
                                </div>
                                <div className="text-sm text-foreground">
                                  {method.description}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-foreground">
                                Taxa: {method.fee}
                              </div>
                              <div className="text-xs text-foreground">
                                {method.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bank Account Info (for bank transfer) */}
                  {withdrawMethod === "bank-transfer" && (
                    <div className="bg-card/20 rounded-xl p-6">
                      <h2 className="text-h4 font-semibold text-foreground mb-4">
                        Dados Bancários
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Banco
                          </label>
                          <Input
                            value={bankAccount.bank}
                            onChange={(e) => setBankAccount({...bankAccount, bank: e.target.value})}
                            placeholder="Nome do banco"
                            className="bg-muted border-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Agência
                          </label>
                          <Input
                            value={bankAccount.agency}
                            onChange={(e) => setBankAccount({...bankAccount, agency: e.target.value})}
                            placeholder="0000"
                            className="bg-muted border-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Conta
                          </label>
                          <Input
                            value={bankAccount.account}
                            onChange={(e) => setBankAccount({...bankAccount, account: e.target.value})}
                            placeholder="00000-0"
                            className="bg-muted border-border"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Tipo de Conta
                          </label>
                          <Select value={bankAccount.type} onValueChange={(value) => setBankAccount({...bankAccount, type: value})}>
                            <SelectTrigger className="w-full bg-muted border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking">Conta Corrente</SelectItem>
                              <SelectItem value="savings">Conta Poupança</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {amount && parseFloat(amount) > 0 && (
                    <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Resumo do Saque
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-foreground">Valor solicitado:</span>
                          <span className="font-semibold text-foreground">
                            R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Taxa:</span>
                          <span className="font-semibold text-foreground">
                            {withdrawMethods.find(m => m.id === withdrawMethod)?.fee}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-primary/20">
                          <span>Valor recebido:</span>
                          <span>
                            R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={handleWithdraw}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > availableBalance}
                    className="w-full bg-primary hover:bg-primary/80 transition-colors"
                    size="lg"
                  >
                    Solicitar Saque
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Confirmation */}
                  <div className="bg-card/20 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Saque Solicitado com Sucesso!
                    </h3>
                    <p className="text-sm text-foreground mb-6">
                      Sua solicitação foi processada e está sendo analisada
                    </p>
                    
                    <div className="bg-muted rounded-lg p-4 mb-6">
                      <div className="text-sm text-foreground mb-2">Valor do saque:</div>
                      <div className="text-2xl font-bold text-foreground">
                        R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="bg-card/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Status do Saque
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Solicitação Recebida</div>
                          <div className="text-sm text-foreground">Agora</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Em Processamento</div>
                          <div className="text-sm text-foreground">
                            {withdrawMethod === "pix" ? "Até 5 minutos" : "1-2 dias úteis"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted text-foreground rounded-full flex items-center justify-center">
                          <Landmark className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">Transferência Realizada</div>
                          <div className="text-sm text-foreground">Fundos creditados na conta</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-warning/10 rounded-xl p-6 border border-warning/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-warning" />
                      <h3 className="font-semibold text-foreground">Segurança</h3>
                    </div>
                    <p className="text-sm text-foreground">
                      Por segurança, saques acima de R$ 10.000 podem levar até 24h para serem processados.
                      Você receberá uma notificação quando o saque for concluído.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Link to="/investor/dashboard" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Voltar ao Dashboard
                      </Button>
                    </Link>
                    <Button className="flex-1 bg-primary hover:bg-primary/80">
                      Ver Histórico
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorWithdraw; 