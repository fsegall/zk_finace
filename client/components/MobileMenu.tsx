import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useRBAC } from "../hooks/useRBAC";
import { useLanguage } from "../contexts/LanguageContext";
import { useMenu } from "../contexts/MenuContext";
import LanguageSwitch from "./LanguageSwitch";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  Home,
  TrendingUp,
  Wallet,
  BarChart3,
  Trophy,
  HelpCircle,
} from "lucide-react";

interface MobileMenuProps {
  userType?: 'borrower' | 'investor' | 'admin';
}

const MobileMenu = ({ userType }: MobileMenuProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const { isAdmin, isLender, isBorrower } = useRBAC();
  const { t } = useLanguage();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMenu();

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const getNavigationItems = () => {
    if (userType === 'borrower' || isBorrower) {
      return [
        { icon: Home, label: 'Dashboard', href: '/borrower/dashboard' },
        { icon: TrendingUp, label: 'Lances', href: '/borrower/lances' },
        { icon: Wallet, label: 'Carteira', href: '/borrower/wallet' },
        { icon: Settings, label: 'Configurações', href: '/borrower/settings' },
      ];
    } else if (userType === 'investor' || isLender) {
      return [
        { icon: Home, label: t('dashboard.title'), href: '/investor/dashboard' },
        { icon: TrendingUp, label: t('dashboard.investments'), href: '/investor/investments' },
        { icon: BarChart3, label: t('dashboard.contributions'), href: '/investor/contributions' },
        { icon: Trophy, label: t('dashboard.ranking'), href: '/investor/ranking' },
        { icon: Settings, label: t('dashboard.settings'), href: '/investor/settings' },
      ];
    } else if (isAdmin) {
      return [
        { icon: Home, label: 'Admin Dashboard', href: '/admin' },
        { icon: Settings, label: 'Configurações', href: '/admin/settings' },
      ];
    }
    return [];
  };

  return (
    <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <Dialog.Trigger asChild>
        <button
          className="lg:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed right-0 top-0 h-full w-80 max-w-[85vw] z-50"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  type: "spring", 
                  damping: 25, 
                  stiffness: 200,
                  duration: 0.3 
                }}
              >
                <div className="h-full bg-background border-l border-border shadow-xl">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <motion.div 
                      className="flex items-center justify-between p-4 border-b border-border"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        {user?.user_metadata?.avatar_url && (
                          <motion.img
                            src={user.user_metadata.avatar_url}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {profile?.full_name || user?.user_metadata?.full_name || user?.email || "Usuário"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @{user?.email ? user.email.split("@")[0] : "usuario"}
                          </p>
                        </div>
                      </div>
                      <Dialog.Close asChild>
                        <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </Dialog.Close>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                      {getNavigationItems().map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    {/* Actions */}
                    <motion.div 
                      className="p-4 border-t border-border space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Language Switch */}
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <LanguageSwitch />
                      </motion.div>

                      {/* Theme Toggle */}
                      <motion.button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {theme === 'dark' ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                      </motion.button>

                      {/* Notifications */}
                      <motion.button 
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Bell className="w-4 h-4" />
                        Notificações
                      </motion.button>

                      {/* Logout */}
                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted text-destructive"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut className="w-4 h-4" />
                        {t('auth.logout') || 'Sair'}
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default MobileMenu; 