import React from 'react';
import { EmbeddedZKProofDemo } from '../zk-proof/components/EmbeddedZKProofDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Zap, Globe, Shield, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/breadcrumb';
import { Logo } from '../components/Logo';

const ZKProofTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background gradient blur effect - same as Login */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50.1% 88.38% at 46.22% 80.46%, #004EF6 0%, #002168 70.19%, #00022A 87.98%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10">
        {/* Header - similar to dashboard header */}
        <header className="bg-card/50 px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Voltar</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Logo size="md" className="h-8 w-auto" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          <Breadcrumb
            items={[
              { label: "Início", href: "/login" },
              { label: "ZK Proof Test" },
            ]}
          />

          <div className="mt-6 lg:mt-8 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
                ZK Proof Client-Side Test
              </h1>
              <p className="text-lg text-foreground/80 mb-6 lg:mb-8 max-w-2xl mx-auto">
                Test of ZK proof generation and submission directly in the browser using embedded files
              </p>
              
              {/* Features - styled like dashboard badges */}
              <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8">
                <Badge variant="outline" className="flex items-center gap-2 bg-card/50 border-border/50 text-foreground">
                  <Zap className="h-3 w-3" />
                  Real Transaction
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 bg-card/50 border-border/50 text-foreground">
                  <Globe className="h-3 w-3" />
                  Client-Side
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 bg-card/50 border-border/50 text-foreground">
                  <Shield className="h-3 w-3" />
                  Embedded Files
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2 bg-card/50 border-border/50 text-foreground">
                  <CheckCircle className="h-3 w-3" />
                  Real Proof
                </Badge>
              </div>
            </div>

            {/* Warning Card - styled like dashboard cards */}
            <Card className="mb-8 lg:mb-12 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="h-5 w-5" />
                  ⚠️ Real Transaction on Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm lg:text-base">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Real Transaction:</strong> This test executes a real transaction on the ZKVerify Volta Testnet blockchain with a cost of approximately 0.024 tVFY per transaction.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Subwallet Required:</strong> Make sure your Subwallet is connected and has sufficient balance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Embedded ZK Files:</strong> Using embedded .wasm, .zkey and .vkey files in base64 format.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Component */}
            <EmbeddedZKProofDemo />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ZKProofTest; 