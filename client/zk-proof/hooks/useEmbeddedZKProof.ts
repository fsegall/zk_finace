import { useState, useCallback } from 'react';
import { EmbeddedZKVerifyService, EmbeddedProofResult } from '../services/embeddedZKVerifyService';

export const useEmbeddedZKProof = () => {
  const [service, setService] = useState<EmbeddedZKVerifyService | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmbeddedProofResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const zkService = new EmbeddedZKVerifyService();
      await zkService.initialize();
      
      setService(zkService);
      setIsInitialized(true);
      console.log('✅ ZKVerify with embedded files initialized successfully!');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Error initializing ZKVerify:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateProof = useCallback(async (score: number, threshold: number) => {
    if (!service || !isInitialized) {
      setError('Service not initialized');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);
      
      console.log('🚀 Starting ZK proof with embedded files: Score=', score, 'Threshold=', threshold);
      
      const proofResult = await service.generateAndSubmitProof(score, threshold);
      setResult(proofResult);
      
      if (proofResult.success) {
        console.log('✅ ZK proof generated and submitted successfully!');
        console.log('📊 TX Hash:', proofResult.txHash);
        console.log('💰 Fee:', proofResult.fee);
        console.log('🎯 Address:', proofResult.address);
        console.log('📈 Score:', proofResult.score);
        console.log('🎯 Threshold:', proofResult.threshold);
      } else {
        console.error('❌ Failed to generate ZK proof:', proofResult.error);
        setError(proofResult.error || 'Unknown error');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Error generating ZK proof:', err);
    } finally {
      setIsLoading(false);
    }
  }, [service, isInitialized]);

  const reset = useCallback(() => {
    setService(null);
    setIsInitialized(false);
    setIsLoading(false);
    setResult(null);
    setError(null);
  }, []);

  return {
    initialize,
    generateProof,
    reset,
    isInitialized,
    isLoading,
    result,
    error
  };
}; 