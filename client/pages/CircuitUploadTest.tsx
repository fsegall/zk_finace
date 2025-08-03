import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';

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

export default function CircuitUploadTest() {
  const [circuitContent, setCircuitContent] = useState('');
  const [circuitName, setCircuitName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BuildResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCircuitContent(content);
      
      // Auto-detect circuit name from filename
      const name = file.name.replace('.circom', '').replace('.txt', '');
      setCircuitName(name);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!circuitContent.trim() || !circuitName.trim()) {
      setResult({ success: false, error: 'Please provide circuit content and name' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3000/api/circuit/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          circuit: circuitContent,
          circuitName: circuitName,
          version: version
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📁 Circuit Upload & Build Test
          </h1>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                Upload your .circom files or paste circuit code directly. Test the circuit build API!
              </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Drag & drop .circom files or use file picker
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Direct Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Paste circuit code directly in text area
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-600" />
                Download Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-foreground/70">
                Download generated artifacts as files
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Circuit Input</CardTitle>
            <CardDescription>
              Upload a .circom file or paste the circuit code below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div>
              <Label htmlFor="file-upload">Upload Circuit File</Label>
              <div
                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-foreground/60 mb-4" />
                <p className="text-sm text-foreground/70 mb-2">
                  Drag and drop your .circom file here, or
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".circom,.txt"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>

            {/* Circuit Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="circuit-name">Circuit Name</Label>
                <Input
                  id="circuit-name"
                  value={circuitName}
                  onChange={(e) => setCircuitName(e.target.value)}
                  placeholder="e.g., credit_score"
                  className="mt-1 placeholder:text-foreground/50"
                />
              </div>
              <div>
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="e.g., 1.0.0"
                  className="mt-1 placeholder:text-foreground/50"
                />
              </div>
            </div>

            {/* Circuit Content */}
            <div>
              <Label htmlFor="circuit-content">Circuit Code</Label>
              <Textarea
                id="circuit-content"
                value={circuitContent}
                onChange={(e) => setCircuitContent(e.target.value)}
                placeholder="Paste your circuit code here or upload a file above..."
                className="mt-1 min-h-[200px] font-mono text-sm placeholder:text-foreground/50"
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !circuitContent.trim() || !circuitName.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building Circuit...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Build Circuit
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.success ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Build Successful
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Build Failed
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Build ID:</span>
                      <p className="text-foreground/70 font-mono">{result.buildId}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Processing Time:</span>
                      <p className="text-foreground/70">{result.processingTime}ms</p>
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        Success
                      </Badge>
                    </div>
                  </div>

                  {result.artifacts && (
                    <div>
                      <h4 className="font-semibold mb-3">Generated Artifacts</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadArtifact(result.artifacts!.wasmBase64, `${circuitName}-wasm-base64.txt`)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download WASM
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadArtifact(result.artifacts!.zkeyBase64, `${circuitName}-zkey-base64.txt`)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download ZKEY
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadArtifact(result.artifacts!.vkeyBase64, `${circuitName}-vkey-base64.txt`)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download VKEY
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {result.error || 'An unknown error occurred during the build process.'}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Example Circuit */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Example Circuit</CardTitle>
            <CardDescription>
              Use this example to test the build functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm font-mono text-foreground/80 overflow-x-auto">
{`pragma circom 2.2.2;

include "comparators.circom";

template CreditScoreCheck() {
    signal input score;      // private
    signal input threshold;  // public
    signal output passed;    // public

    component isGreaterEq = GreaterEqThan(16);
    isGreaterEq.in[0] <== score;
    isGreaterEq.in[1] <== threshold;
    passed <== isGreaterEq.out;
}

component main = CreditScoreCheck();`}
              </pre>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setCircuitContent(`pragma circom 2.2.2;

include "comparators.circom";

template CreditScoreCheck() {
    signal input score;      // private
    signal input threshold;  // public
    signal output passed;    // public

    component isGreaterEq = GreaterEqThan(16);
    isGreaterEq.in[0] <== score;
    isGreaterEq.in[1] <== threshold;
    passed <== isGreaterEq.out;
}

component main = CreditScoreCheck();`);
                setCircuitName('credit_score');
                setVersion('1.0.0');
              }}
            >
              Load Example
            </Button>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="outline" className="bg-primary/10">
              API: localhost:3000
            </Badge>
            <Badge variant="outline" className="bg-green-500/10">
              Real Build: Active
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10">
              File Upload: Ready
            </Badge>
          </div>
          <p className="text-sm text-foreground/70">
            Easy to test interface to build zk circuits.
          </p>
        </div>
      </main>
    </div>
  );
} 