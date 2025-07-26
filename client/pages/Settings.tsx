import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import WalletConnect from "../components/WalletConnect";
import LanguageSwitch from "../components/LanguageSwitch";
import MobileMenu from "../components/MobileMenu";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Lock,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Settings as SettingsIcon,
  CreditCard,
  FileText,
  Globe,
  Smartphone,
  Check,
  X,
} from "lucide-react";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "Maria Cardoso",
    email: "maria.cardoso@email.com",
    phone: "+55 (11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
    cpf: "123.456.789-00",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [type]: value }));
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
        <header className="px-4 sm:px-6 lg:px-20 py-3 sm:py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
            <div className="flex items-center justify-between lg:justify-start gap-4 lg:gap-20">
              {/* Logo */}
              <div className="flex items-center">
                <svg
                  className="h-6 w-auto sm:h-8"
                  viewBox="0 0 442 149"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z"
                    fill="url(#paint0_linear_logo_settings)"
                  />
                  <path
                    d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
                    fill="url(#paint1_linear_logo_settings)"
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
                      id="paint0_linear_logo_settings"
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
                      id="paint1_linear_logo_settings"
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
              <h1 className="text-xl sm:text-h2 font-semibold text-foreground">Configurações</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-3 lg:gap-4">
              {/* Mobile Menu */}
              <MobileMenu />
              
              {/* Mobile Wallet - Always Visible */}
              <div className="lg:hidden">
                <WalletConnect />
              </div>
              
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-6">
                <WalletConnect />
                
                <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    {user?.user_metadata?.avatar_url && (
                      <img src={user.user_metadata.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
                    )}
                    <span className="text-sm">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</span>
                    <span className="text-xs text-foreground hidden xl:block">
                      @{user?.email ? user.email.split("@")[0] : "usuario"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 hover:bg-muted/50 rounded-lg text-foreground transition-colors"
                >
                  <span className="text-sm">Sair</span>
                </button>

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

                <LanguageSwitch />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-20 py-4 sm:py-8">
          <Breadcrumb
            items={[
              { label: "Início", href: "/user-selection" },
              { label: "Dashboard", href: "/borrower/dashboard" },
              { label: "Configurações" },
            ]}
          />

          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/borrower/dashboard"
              className="inline-flex items-center gap-2 text-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Voltar ao Dashboard</span>
            </Link>

            {/* Settings Sections */}
            <div className="space-y-6 sm:space-y-8">
              {/* Profile Settings */}
              <div className="bg-card/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-lg sm:text-h4 font-semibold text-foreground">Perfil</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nome Completo</label>
                    <Input
                      value={profileData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Telefone</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">CPF</label>
                    <Input
                      value={profileData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-foreground">Endereço</label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4 sm:mt-6">
                  <Button className="bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                    Salvar Alterações
                  </Button>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-card/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-lg sm:text-h4 font-semibold text-foreground">Segurança</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Senha Atual</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nova Senha</label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-card/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-lg sm:text-h4 font-semibold text-foreground">Notificações</h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div>
                        <div className="text-sm sm:text-base font-medium text-foreground">Notificações por Email</div>
                        <div className="text-xs sm:text-sm text-foreground">Receber atualizações por email</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("email", !notifications.email)}
                      className={`w-10 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        notifications.email ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                          notifications.email ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div>
                        <div className="text-sm sm:text-base font-medium text-foreground">Notificações por SMS</div>
                        <div className="text-xs sm:text-sm text-foreground">Receber alertas por SMS</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("sms", !notifications.sms)}
                      className={`w-10 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        notifications.sms ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                          notifications.sms ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div>
                        <div className="text-sm sm:text-base font-medium text-foreground">Notificações Push</div>
                        <div className="text-xs sm:text-sm text-foreground">Receber notificações no navegador</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("push", !notifications.push)}
                      className={`w-10 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        notifications.push ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                          notifications.push ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div>
                        <div className="text-sm sm:text-base font-medium text-foreground">Marketing</div>
                        <div className="text-xs sm:text-sm text-foreground">Receber ofertas e novidades</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationChange("marketing", !notifications.marketing)}
                      className={`w-10 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                        notifications.marketing ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                          notifications.marketing ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="bg-card/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h2 className="text-lg sm:text-h4 font-semibold text-foreground">Aparência</h2>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    ) : (
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    )}
                    <div>
                      <div className="text-sm sm:text-base font-medium text-foreground">Tema Escuro</div>
                      <div className="text-xs sm:text-sm text-foreground">Alternar entre tema claro e escuro</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`w-10 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                      theme === 'dark' ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                        theme === 'dark' ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings; 