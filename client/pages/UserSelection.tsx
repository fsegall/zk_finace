import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserSelection = () => {
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

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
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
              fill="url(#paint0_linear_logo_userselection)"
            />
            <path
              d="M7.05114 41.1235V18.5115H104.405C109.602 18.5115 112.592 24.4224 109.511 28.6088L53.9792 104.075C52.747 105.75 53.9426 108.114 56.0217 108.114H103.205L104.262 130.938H16.0969C9.75866 130.938 6.19971 123.641 10.1016 118.646L70.6606 41.1235H7.05114Z"
              fill="url(#paint1_linear_logo_userselection)"
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
                id="paint0_linear_logo_userselection"
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
                id="paint1_linear_logo_userselection"
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
          <div className="space-y-4">
            <p className="text-muted-foreground text-body">
              Que bom ter você aqui
            </p>
            <h1 className="text-h2 text-foreground">
              Como você gostaria de
              <br />
              utilizar a ZK Finance?
            </h1>
          </div>

          <div className="space-y-4">
            <Link to="/kyc-verification">
              <Button
                className="w-full h-14 bg-card hover:bg-accent hover:text-accent-foreground text-foreground transition-colors"
                variant="outline"
              >
                Quero Solicitar Crédito
              </Button>
            </Link>

            <Link to="/investor/dashboard">
              <Button
                className="w-full h-14 bg-card hover:bg-accent hover:text-accent-foreground text-foreground transition-colors"
                variant="outline"
              >
                Quero Investir
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
