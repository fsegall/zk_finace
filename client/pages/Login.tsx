import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Logo } from "../components/Logo";
import LanguageSwitch from "../components/LanguageSwitch";
import DevLoginInstructions from "../components/DevLoginInstructions";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithPassword, user, loading, error } = useAuth();
  const [formLoading, setFormLoading] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    navigate("/user-selection");
  }

  const handleGoogle = async () => {
    setFormLoading(true);
    await loginWithGoogle();
    setFormLoading(false);
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    await loginWithPassword(email, password);
    setFormLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #004EF6 0%, #002168 70.19%, #00022A 87.98%)",
          filter: "blur(120px)",
        }}
      />

      {/* Language Switch - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitch />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <Logo size="lg" />
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <DevLoginInstructions />
          <h1 className="text-h2 text-foreground">
            {t('auth.login')}
          </h1>

          {/* Social Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-11 sm:h-12 bg-card/20 hover:bg-accent hover:text-accent-foreground text-foreground transition-colors"
              onClick={handleGoogle}
              disabled={formLoading || loading}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="h-11 sm:h-12 bg-card/20 hover:bg-accent hover:text-accent-foreground text-foreground transition-colors opacity-50 cursor-not-allowed"
              disabled={true}
              title={t('auth.comingSoon')}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground/70">
                {t('auth.or')}
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-3 sm:space-y-4" onSubmit={handlePassword}>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 sm:h-12 bg-muted border-border placeholder:text-foreground/50"
                disabled={formLoading || loading}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12 bg-muted border-border pr-10 placeholder:text-foreground/50"
                disabled={formLoading || loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground p-1 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-small text-foreground/70 hover:text-foreground text-sm transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
              disabled={formLoading || loading}
            >
              {formLoading || loading ? t('auth.entering') : t('auth.login')}
            </Button>
          </form>

          {error && (
            <div className="bg-red-950/20 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Test Pages Section - Only in Development */}
          {import.meta.env.DEV && (
            <div className="space-y-2">
              <div className="text-center">
                <span className="text-xs text-foreground/80 bg-muted/50 px-2 py-1 rounded">
                  🧪 {t('auth.testPages')}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/zk-proof-test">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 focus:bg-accent focus:text-accent-foreground focus:border-accent-foreground/20 text-sm transition-all duration-200"
                  >
                    🔐 ZK Proof Test
                  </Button>
                </Link>
                <Link to="/circuit-upload-test">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 focus:bg-accent focus:text-accent-foreground focus:border-accent-foreground/20 text-sm transition-all duration-200"
                  >
                    📁 Circuit Upload
                  </Button>
                </Link>
                <Link to="/new-zk-system-test">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 focus:bg-accent focus:text-accent-foreground focus:border-accent-foreground/20 text-sm transition-all duration-200"
                  >
                    🧪 New ZK System
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <p className="text-body text-foreground/80 text-sm sm:text-base">
            {t('auth.dontHaveAccount')}{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              {t('auth.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
