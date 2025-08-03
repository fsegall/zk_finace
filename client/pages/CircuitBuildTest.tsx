import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import CircuitBuildDemo from '@/zk-proof-api/components/CircuitBuildDemo';
import { Logo } from '@/components/Logo';

export default function CircuitBuildTest() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Logo size="md" className="h-8 w-auto" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🔧 Circuit Build API Test
          </h1>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Teste a API de build de circuitos ZK. Esta funcionalidade é independente do MVP de provas ZK client-side.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Independente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Não interfere no MVP de provas ZK existente
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                Modo Simulação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Build simulado sem circom real (por enquanto)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                API Server
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Comunica com servidor na porta 3000
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 bg-yellow-500/10 border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-600">
            <strong>⚠️ Modo Simulação:</strong> Esta é uma demonstração da API. O build real de circuitos será implementado posteriormente.
            O MVP de provas ZK client-side continua funcionando normalmente em <Link to="/zk-proof-test" className="underline">/zk-proof-test</Link>.
          </AlertDescription>
        </Alert>

        {/* Demo Component */}
        <CircuitBuildDemo />

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="outline" className="bg-primary/10">
              API: localhost:3000
            </Badge>
            <Badge variant="outline" className="bg-green-500/10">
              MVP ZK: Funcionando
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10">
              Build API: Teste
            </Badge>
          </div>
          <p className="text-sm text-foreground/70">
            Esta funcionalidade demonstra como integrar uma API de build de circuitos com o sistema ZK existente.
          </p>
        </div>
      </main>
    </div>
  );
} 