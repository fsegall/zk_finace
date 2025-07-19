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
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Z</span>
          </div>
          <span className="text-foreground font-semibold text-lg">FINANCE</span>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Que bom ter você aqui
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              Como você gostaria de
              <br />
              utilizar a ZK Finance?
            </h1>
          </div>

          <div className="space-y-4">
            <Link to="/kyc-verification">
              <Button
                className="w-full h-14 bg-card hover:bg-card/80 text-foreground border border-border"
                variant="outline"
              >
                Quero Solicitar Crédito
              </Button>
            </Link>

            <Link to="/investor/dashboard">
              <Button
                className="w-full h-14 bg-card hover:bg-card/80 text-foreground border border-border"
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
