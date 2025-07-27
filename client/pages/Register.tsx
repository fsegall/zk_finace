import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Logo } from "../components/Logo";
import DevLoginInstructions from "../components/DevLoginInstructions";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, signupWithPassword, user, loading, error } = useAuth();
  const [formLoading, setFormLoading] = useState(false);

  // Redirect if already logged in
  if (user && !loading) {
    navigate("/user-selection");
  }

  const handleGoogle = async () => {
    setFormLoading(true);
    await loginWithGoogle();
    setFormLoading(false);
    navigate("/user-selection");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    await signupWithPassword(email, password, fullName);
    setFormLoading(false);
    navigate("/user-selection");
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

      <div className="relative z-10 text-center max-w-lg mx-auto px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <Logo size="lg" />
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <DevLoginInstructions />
          <h1 className="text-h2 font-semibold text-foreground">
            {t('auth.register')}
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



          {/* Form */}
          <form className="space-y-3 sm:space-y-4" onSubmit={handleSignup}>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder={t('auth.fullName')}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11 sm:h-12 bg-muted placeholder:text-foreground border-border"
                disabled={formLoading || loading}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder={t('auth.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 sm:h-12 bg-muted placeholder:text-foreground border-border"
                disabled={formLoading || loading}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 sm:h-12 bg-muted placeholder:text-foreground border-border"
                disabled={formLoading || loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
              disabled={formLoading || loading}
            >
              {formLoading || loading ? t('auth.registering') : t('auth.register')}
            </Button>
          </form>

          {error && (
            <div className="text-red-500 text-sm mt-2 px-2">{error}</div>
          )}

          <p className="text-body text-foreground text-sm sm:text-base">
            {t('auth.alreadyHaveAccount')}{" "}
            <Link to="/login" className="text-primary hover:underline">
              {t('auth.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
