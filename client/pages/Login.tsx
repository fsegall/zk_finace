import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #3CFFB1 0%, #002168 70.19%, #00022A 87.98%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 text-center max-w-sm mx-auto px-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-12">
          <svg
            className="h-12 w-auto"
            viewBox="0 0 442 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M183.51 17.6662L137.39 73.6984C136.202 75.1416 136.238 77.2343 137.476 78.6349L183.51 130.726H145.26L104.084 80.8508C101.865 78.1628 101.895 74.2696 104.155 71.6164L150.12 17.6662H183.51Z"
              fill="url(#paint0_linear_logo)"
            />
            <path
              d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
              fill="url(#paint1_linear_logo)"
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
                id="paint0_linear_logo"
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
                id="paint1_linear_logo"
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

        {/* Main Content */}
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Acesse sua conta
          </h1>

          {/* Social Login */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 bg-card hover:bg-card/80 text-foreground border border-border"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              className="w-full h-12 bg-card hover:bg-card/80 text-foreground border border-border"
            >
              <div className="w-5 h-5 mr-2 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              MetaMask
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ou
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-muted border-border"
              />
            </div>

            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-muted border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Esqueci minha Senha
              </Link>
            </div>

            <Link to="/user-selection">
              <Button
                type="button"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Login
              </Button>
            </Link>
          </form>

          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Cadastrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
