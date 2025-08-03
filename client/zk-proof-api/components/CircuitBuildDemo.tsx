import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, AlertCircle, Download, Code } from 'lucide-react';
import { circuitBuildService, CircuitBuildService } from '../services/circuitBuildService';

interface BuildResult {
  success: boolean;
  buildId?: string;
  artifacts?: {
    wasmBase64: string;
    zkeyBase64: string;
    vkeyBase64: string;
  };
  error?: string;
  processingTime?: number;
}

export default function CircuitBuildDemo() {
  const [circuit, setCircuit] = useState(CircuitBuildService.getCreditScoreCircuit());
  const [circuitName, setCircuitName] = useState('credit_score');
  const [version, setVersion] = useState('1.0.0');
  const [isBuilding, setIsBuilding] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [buildResult, setBuildResult] = useState<BuildResult | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [serviceHealth, setServiceHealth] = useState<any>(null);

  const handleBuild = async () => {
    setIsBuilding(true);
    setBuildResult(null);
    
    try {
      const result = await circuitBuildService.buildCircuit({
        circuit: circuit.trim(),
        circuitName,
        version
      });

      setBuildResult({
        success: result.success,
        buildId: result.buildId,
        artifacts: result.artifacts,
        error: result.error,
        processingTime: result.metadata?.processingTime
      });

    } catch (error) {
      setBuildResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsBuilding(false);
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationResult(null);
    
    try {
      const result = await circuitBuildService.validateCircuit({
        circuit: circuit.trim()
      });

      setValidationResult(result);

    } catch (error) {
      setValidationResult({
        success: false,
        validation: {
          isValid: false,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          warnings: []
        }
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleCheckHealth = async () => {
    try {
      const health = await circuitBuildService.getHealth();
      setServiceHealth(health);
    } catch (error) {
      setServiceHealth({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const handleLoadExample = () => {
    setCircuit(CircuitBuildService.getExampleCircuit());
    setCircuitName('example_circuit');
  };

  const handleLoadCreditScore = () => {
    setCircuit(CircuitBuildService.getCreditScoreCircuit());
    setCircuitName('credit_score');
  };

  const downloadArtifact = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          🔧 Circuit Build Service
        </h1>
        <p className="text-muted-foreground">
          Build ZK circuits and get base64 artifacts for client-side use
        </p>
      </div>

      {/* Service Health */}
      <Card className="bg-card/50 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={handleCheckHealth} variant="outline" size="sm">
              Check Health
            </Button>
            {serviceHealth && (
              <div className="flex items-center gap-2">
                <Badge variant={serviceHealth.error ? "destructive" : "default"}>
                  {serviceHealth.error ? "Offline" : "Online"}
                </Badge>
                {serviceHealth.service && (
                  <span className="text-sm text-muted-foreground">
                    {serviceHealth.service} v{serviceHealth.version}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Circuit Input */}
      <Card className="bg-card/50 border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Circuit Source
          </CardTitle>
          <CardDescription>
            Enter your Circom circuit code or use examples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Circuit Name and Version */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="circuitName">Circuit Name</Label>
              <Input
                id="circuitName"
                value={circuitName}
                onChange={(e) => setCircuitName(e.target.value)}
                placeholder="my_circuit"
                className="bg-background/80 border-0"
              />
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="1.0.0"
                className="bg-background/80 border-0"
              />
            </div>
          </div>

          {/* Example Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleLoadExample} variant="outline" size="sm">
              Load Example
            </Button>
            <Button onClick={handleLoadCreditScore} variant="outline" size="sm">
              Load Credit Score
            </Button>
          </div>

          {/* Circuit Code */}
          <div>
            <Label htmlFor="circuit">Circuit Code (.circom)</Label>
            <Textarea
              id="circuit"
              value={circuit}
              onChange={(e) => setCircuit(e.target.value)}
              placeholder="Enter your Circom circuit code..."
              className="min-h-[300px] font-mono text-sm bg-background/80 border-0"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleValidate} 
              disabled={isValidating || isBuilding}
              variant="outline"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validate
                </>
              )}
            </Button>
            <Button 
              onClick={handleBuild} 
              disabled={isBuilding || isValidating}
            >
              {isBuilding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Building...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Build Circuit
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation Result */}
      {validationResult && (
        <Card className="bg-card/50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Validation Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={validationResult.validation.isValid ? "default" : "destructive"}>
                  {validationResult.validation.isValid ? "Valid" : "Invalid"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {validationResult.timestamp}
                </span>
              </div>
              
              {validationResult.validation.errors.length > 0 && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Errors:</strong>
                    <ul className="mt-1 list-disc list-inside">
                      {validationResult.validation.errors.map((error: string, index: number) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              {validationResult.validation.warnings.length > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Warnings:</strong>
                    <ul className="mt-1 list-disc list-inside">
                      {validationResult.validation.warnings.map((warning: string, index: number) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Build Result */}
      {buildResult && (
        <Card className="bg-card/50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {buildResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              Build Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {buildResult.success ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card/50 p-3 rounded">
                      <div className="text-sm text-blue-500 font-medium">Build ID</div>
                      <div className="text-sm font-mono">{buildResult.buildId}</div>
                    </div>
                    <div className="bg-card/50 p-3 rounded">
                      <div className="text-sm text-blue-500 font-medium">Processing Time</div>
                      <div className="text-sm">{buildResult.processingTime}ms</div>
                    </div>
                    <div className="bg-card/50 p-3 rounded">
                      <div className="text-sm text-blue-500 font-medium">Artifacts</div>
                      <div className="text-sm">WASM, ZKEY, VKEY</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Download Artifacts:</h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => downloadArtifact(buildResult.artifacts!.wasmBase64, 'circuit.wasm.base64')}
                        variant="outline"
                        size="sm"
                      >
                        Download WASM
                      </Button>
                      <Button
                        onClick={() => downloadArtifact(buildResult.artifacts!.zkeyBase64, 'circuit.zkey.base64')}
                        variant="outline"
                        size="sm"
                      >
                        Download ZKEY
                      </Button>
                      <Button
                        onClick={() => downloadArtifact(buildResult.artifacts!.vkeyBase64, 'circuit.vkey.base64')}
                        variant="outline"
                        size="sm"
                      >
                        Download VKEY
                      </Button>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Circuit built successfully! You can now use these base64 artifacts in your client-side ZK proof generation.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Build failed:</strong> {buildResult.error}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 