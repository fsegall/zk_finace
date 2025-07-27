import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useRBAC } from "../hooks/useRBAC";
import { useMenu } from "../contexts/MenuContext";
import LanguageSwitch from "../components/LanguageSwitch";
import WalletConnect from "../components/WalletConnect";
import MobileMenu from "../components/MobileMenu";
import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";
import { Sun, Moon, Users, TrendingUp, DollarSign, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { t } = useLanguage();
  const { isAdmin } = useRBAC();
  const { isMobileMenuOpen } = useMenu();

  const handleLogout = async () => {
    await logout();
  };

  // Mock data para cards
  const stats = [
    { icon: Users, label: "Usuários", value: 128 },
    { icon: TrendingUp, label: "Empréstimos Ativos", value: 42 },
    { icon: DollarSign, label: "Investimentos", value: "R$ 1.200.000" },
    { icon: Settings, label: "Ajustes Pendentes", value: 3 },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-xl lg:text-2xl font-bold mb-4">Acesso restrito</h1>
          <p className="text-sm lg:text-base">Você não tem permissão para acessar este painel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:flex w-full lg:w-64 bg-sidebar p-4 lg:p-6 flex-col">
        <div className="flex items-center mb-6 lg:mb-8">
          <Logo size="md" />
        </div>
        <nav className="space-y-2 flex-1">
          <Link to="/admin" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-sidebar-accent text-sidebar-accent-foreground">
            <Settings className="w-4 h-4" />
            Painel Admin
          </Link>
          {/* Future sections: Users, Loans, Investments, Settings... */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0 mb-6 lg:mb-8">
          <div className="flex items-center gap-3 lg:gap-4">
            {user?.user_metadata?.avatar_url && (
              <img src={user.user_metadata.avatar_url} alt="avatar" className="w-8 lg:w-10 h-8 lg:h-10 rounded-full" />
            )}
            <div>
              <div className="font-semibold text-base lg:text-lg">{profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}</div>
              <div className="text-xs lg:text-sm text-muted-foreground">{user?.email}</div>
            </div>
            <span className="ml-2 px-2 py-0.5 rounded bg-primary text-primary-foreground text-xs">Admin</span>
          </div>
          
          {/* Mobile Menu and Actions */}
          <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-4">
            {/* Mobile Menu */}
            <MobileMenu userType="admin" />
            
            {/* Mobile Wallet - Always Visible */}
            <div className="lg:hidden">
              <WalletConnect />
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSwitch />
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-muted/50 rounded-lg text-foreground transition-colors"
              >
                <span className="text-sm">{t('auth.logout')}</span>
              </button>
              <button onClick={toggleTheme} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-card/20 rounded-xl p-4 lg:p-6 flex items-center gap-3 lg:gap-4">
              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 lg:w-6 h-5 lg:h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm lg:text-base font-semibold text-foreground">{stat.label}</div>
                <div className="text-lg lg:text-xl font-bold text-foreground">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for future administrative sections */}
        <div className="bg-card/20 rounded-xl p-6 lg:p-8 text-center text-muted-foreground">
          <h2 className="text-lg lg:text-xl font-semibold mb-2 text-foreground">Bem-vindo ao Painel Administrativo</h2>
          <p className="text-sm lg:text-base">Aqui você poderá gerenciar usuários, empréstimos, investimentos e configurações do sistema.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 