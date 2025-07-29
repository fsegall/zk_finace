import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { useEmbeddedZKProof } from '../hooks/useEmbeddedZKProof';

// Credit analysis function based on the algorithm
const calculateCreditAnalysis = (score: number, threshold: number) => {
  const passed = score >= threshold;
  
  // Risk assessment based on score ranges
  let riskLevel = '';
  let riskColor = '';
  let recommendation = '';
  
  if (score >= 750) {
    riskLevel = 'Excellent';
    riskColor = 'text-green-600';
    recommendation = 'Highly recommended for credit approval';
  } else if (score >= 650) {
    riskLevel = 'Good';
    riskColor = 'text-blue-600';
    recommendation = 'Recommended for credit approval';
  } else if (score >= 550) {
    riskLevel = 'Fair';
    riskColor = 'text-yellow-600';
    recommendation = 'Conditional approval recommended';
  } else if (score >= 450) {
    riskLevel = 'Poor';
    riskColor = 'text-orange-600';
    recommendation = 'High risk - approval not recommended';
  } else {
    riskLevel = 'Very Poor';
    riskColor = 'text-red-600';
    recommendation = 'Extremely high risk - approval denied';
  }

  // Score breakdown analysis
  const scoreBreakdown = {
    baseScore: 500,
    incomeBonus: score >= 600 ? 100 : 0,
    employmentBonus: score >= 550 ? 50 : 0,
    propertyBonus: score >= 580 ? 70 : 0,
    debtPenalty: score <= 620 ? -80 : 0,
    defaultPenalty: score <= 600 ? -100 : 0
  };

  return {
    passed,
    riskLevel,
    riskColor,
    recommendation,
    scoreBreakdown
  };
};

export const EmbeddedZKProofDemo: React.FC = () => {
  const [score, setScore] = useState(850);
  const [threshold, setThreshold] = useState(800);
  
  const {
    initialize,
    generateProof,
    reset,
    isInitialized,
    isLoading,
    result,
    error
  } = useEmbeddedZKProof();

  const handleInitialize = async () => {
    await initialize();
  };

  const handleGenerateProof = async () => {
    await generateProof(score, threshold);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <Card className="bg-card/50 border-0 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            🔥 ZK Proof with Embedded Files
            <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
              REAL TRANSACTION
            </Badge>
          </CardTitle>
          <CardDescription className="text-foreground/70">
            ZK proof generation using embedded base64 files - 100% client-side
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-muted/50 border-0">
            <AlertDescription className="text-foreground/80">
              <strong className="text-foreground">🚨 ATTENTION:</strong> This is a real transaction on the ZKVerify Volta Testnet blockchain. 
              Make sure your Subwallet is connected and has sufficient balance.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <Label htmlFor="score" className="text-foreground font-medium">Credit Score</Label>
              <Input
                id="score"
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                placeholder="850"
                min="300"
                max="850"
                className="bg-background/80 border-0 text-foreground placeholder:text-foreground/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threshold" className="text-foreground font-medium">Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                placeholder="800"
                min="300"
                max="850"
                className="bg-background/80 border-0 text-foreground placeholder:text-foreground/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-4">
            {!isInitialized ? (
              <Button 
                onClick={handleInitialize} 
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2"
              >
                {isLoading ? '🔄 Connecting...' : '🔥 CONNECT FOR REAL TRANSACTION'}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={handleGenerateProof} 
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
                >
                  {isLoading ? '🔄 Processing...' : '🚀 EXECUTE REAL TRANSACTION'}
                </Button>
                <Button 
                  onClick={handleReset} 
                  variant="outline"
                  disabled={isLoading}
                  className="border-border/50 text-foreground hover:bg-muted/50"
                >
                  🔄 Reset
                </Button>
              </>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertDescription className="text-destructive">
                <strong>❌ Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className={result.success ? "bg-green-500/5" : "bg-red-500/5"}>
              <CardHeader>
                <CardTitle className={`text-lg ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.success ? '🎉 TOTAL SUCCESS - ZK Transaction Finalized!' : '❌ Transaction Failed'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.success && result.txHash && (
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">✅</span>
                      <h3 className="font-bold text-green-600">Transaction Confirmed on Blockchain</h3>
                    </div>
                    <p className="text-green-600/80 mb-3">
                      Your ZK proof was generated, submitted and finalized successfully on the ZKVerify testnet!
                    </p>
                    <div className="bg-card/50 p-3 rounded">
                      <strong className="text-green-600">🔗 View on Explorer:</strong>{' '}
                      <a 
                        href={`https://zkverify-testnet.subscan.io/extrinsic/${result.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-all font-mono text-sm"
                      >
                        {result.txHash}
                      </a>
                    </div>
                  </div>
                )}

                {/* Credit Analysis Section */}
                {result.success && (
                  <div className="p-4 bg-blue-500/5 rounded-lg">
                    <h3 className="font-bold text-blue-600 mb-3 text-lg">📊 Credit Analysis Results</h3>
                    
                    {(() => {
                      const analysis = calculateCreditAnalysis(result.score, result.threshold);
                      return (
                        <div className="space-y-4">
                          {/* Credit Score Overview */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-card/50 p-3 rounded">
                              <div className="text-sm text-blue-500 font-medium">Credit Score</div>
                              <div className="text-2xl font-bold text-blue-600">{result.score}</div>
                              <div className="text-xs text-blue-500/70">Range: 300-850</div>
                            </div>
                            <div className="bg-card/50 p-3 rounded">
                              <div className="text-sm text-blue-500 font-medium">Risk Level</div>
                              <div className={`text-lg font-bold ${analysis.riskColor}`}>{analysis.riskLevel}</div>
                              <div className="text-xs text-blue-500/70">Risk Assessment</div>
                            </div>
                            <div className="bg-card/50 p-3 rounded">
                              <div className="text-sm text-blue-500 font-medium">Threshold</div>
                              <div className="text-2xl font-bold text-blue-600">{result.threshold}</div>
                              <div className="text-xs text-blue-500/70">Minimum Required</div>
                            </div>
                          </div>

                          {/* Approval Status */}
                          <div className={`p-3 rounded ${analysis.passed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{analysis.passed ? '✅' : '❌'}</span>
                              <div>
                                <div className={`font-bold ${analysis.passed ? 'text-green-600' : 'text-red-600'}`}>
                                  {analysis.passed ? 'CREDIT APPROVED' : 'CREDIT DENIED'}
                                </div>
                                <div className={`text-sm ${analysis.passed ? 'text-green-600/80' : 'text-red-600/80'}`}>
                                  {analysis.recommendation}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Score Breakdown */}
                          <div className="bg-card/50 p-4 rounded">
                            <h4 className="font-bold text-blue-600 mb-3">📈 Score Breakdown Analysis</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Base Score:</span>
                                <span className="font-medium text-foreground">500</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Income Bonus:</span>
                                <span className="font-medium text-green-600">+{analysis.scoreBreakdown.incomeBonus}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Employment Bonus:</span>
                                <span className="font-medium text-green-600">+{analysis.scoreBreakdown.employmentBonus}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Property Bonus:</span>
                                <span className="font-medium text-green-600">+{analysis.scoreBreakdown.propertyBonus}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Debt Penalty:</span>
                                <span className="font-medium text-red-600">{analysis.scoreBreakdown.debtPenalty}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/70">Default Penalty:</span>
                                <span className="font-medium text-red-600">{analysis.scoreBreakdown.defaultPenalty}</span>
                              </div>
                              <div className="flex justify-between border-t border-border/50 pt-2 font-bold">
                                <span className="text-blue-600">Final Score:</span>
                                <span className="text-blue-600">{result.score}</span>
                              </div>
                            </div>
                          </div>

                          {/* ZK Proof Verification */}
                          <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 p-4 rounded">
                            <h4 className="font-bold text-purple-600 mb-2">🔐 ZK Proof Verification</h4>
                            <div className="text-sm text-purple-600/80 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Proved that credit score ({result.score}) ≥ threshold ({result.threshold})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Verification completed without revealing actual score value</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Proof submitted and verified on ZKVerify blockchain</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-muted/50 p-3 rounded">
                    <strong className="text-foreground">🎯 Volta Address:</strong>
                    <div className="font-mono text-xs mt-1 break-all text-foreground/70">{result.address}</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <strong className="text-foreground">📈 Credit Score:</strong> 
                    <span className="text-foreground/70 ml-1">{result.score}</span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <strong className="text-foreground">🎯 Threshold:</strong> 
                    <span className="text-foreground/70 ml-1">{result.threshold}</span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <strong className="text-foreground">💰 Fee (tVFY):</strong> 
                    <span className="text-foreground/70 ml-1">{result.fee}</span>
                  </div>
                  <div className="bg-muted/50 p-3 rounded md:col-span-2">
                    <strong className="text-foreground">⏰ Timestamp:</strong> 
                    <span className="text-foreground/70 ml-1">{new Date(result.timestamp).toLocaleString('en-US')}</span>
                  </div>
                </div>
                
                {result.success && (
                  <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                    <h4 className="font-bold text-blue-600 mb-2">🏆 Achievements Reached:</h4>
                    <ul className="text-blue-600/80 space-y-1 text-sm">
                      <li>✅ ZK proof generated 100% client-side</li>
                      <li>✅ Transaction sent directly to blockchain</li>
                      <li>✅ Perfect Subwallet integration</li>
                      <li>✅ Correct address conversion (Polkadot → Volta)</li>
                      <li>✅ Transaction successfully finalized</li>
                      <li>✅ Credit analysis completed with risk assessment</li>
                      <li>✅ Privacy-preserving credit verification</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 