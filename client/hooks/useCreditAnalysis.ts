import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

interface CreditAnalysisRequest {
  user_id?: string;
  email?: string;
  // Optional data for more accurate analysis
  income?: number;
  employment_years?: number;
  has_property?: boolean;
  has_debt?: boolean;
  payment_defaults?: number;
}

// Interface atualizada para o novo payload completo
interface CreditAnalysisResponse {
  requestId: string;
  timestamp: string;
  modelVersion: string;
  workflowVersion: string;
  environment: string;
  userProfile: {
    incomeRange: string;
    employmentStability: string;
    hasProperty: boolean;
    hasDebt: boolean;
    riskLevel: string;
  };
  analysis: {
    score: number;
    threshold: number;
    passed: boolean;
    category: string;
    message: string;
    suggestedLimit: number;
    confidence: number;
  };
  recommendations: {
    immediate: string[];
    longTerm: string[];
    nextReview: string;
  };
  technical: {
    processingTime: number;
    algorithm: string;
    dataPoints: number;
    validation: string;
  };
}

interface CreditAnalysisError {
  message: string;
  details?: any;
}

// Endpoint local do Express (em vez do n8n)
const LOCAL_CREDIT_ENDPOINT = 'http://localhost:3002/api/credit-analysis';

export const useCreditAnalysis = () => {
  const { user } = useAuth();

  const creditAnalysisMutation = useMutation<
    CreditAnalysisResponse,
    CreditAnalysisError,
    CreditAnalysisRequest
  >({
    mutationFn: async (requestData: CreditAnalysisRequest) => {
      try {
        // Preparar dados para envio (formato esperado pelo Express)
        const payload = {
          income: requestData.income || 5000,
          employment_years: requestData.employment_years || 2,
          has_property: requestData.has_property || false,
          has_debt: requestData.has_debt || false,
          payment_defaults: requestData.payment_defaults || 0,
        };

        console.log('🔍 Enviando análise de crédito local:', payload);

        const response = await fetch(LOCAL_CREDIT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': `frontend-${Date.now()}`,
            'X-User-ID': user?.id || 'anonymous',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Erro na análise de crédito: ${response.status} ${response.statusText}`);
        }

        const data: CreditAnalysisResponse = await response.json();
        
        console.log('✅ Análise de crédito local concluída:', data);
        
        return data;
      } catch (error) {
        console.error('❌ Erro na análise de crédito local:', error);
        throw {
          message: error instanceof Error ? error.message : 'Erro desconhecido na análise de crédito',
          details: error,
        };
      }
    },
    onSuccess: (data) => {
      console.log('🎉 Análise de crédito local bem-sucedida:', data);
    },
    onError: (error) => {
      console.error('💥 Falha na análise de crédito local:', error);
    },
  });

  return {
    analyzeCredit: creditAnalysisMutation.mutate,
    analyzeCreditAsync: creditAnalysisMutation.mutateAsync,
    isLoading: creditAnalysisMutation.isPending,
    isError: creditAnalysisMutation.isError,
    error: creditAnalysisMutation.error,
    data: creditAnalysisMutation.data,
    reset: creditAnalysisMutation.reset,
  };
};

  // Hook for credit analysis with mock data (for development/testing)
export const useMockCreditAnalysis = () => {
  const mockAnalysisMutation = useMutation<
    CreditAnalysisResponse,
    CreditAnalysisError,
    CreditAnalysisRequest
  >({
    mutationFn: async (requestData: CreditAnalysisRequest) => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate score calculation based on data
      let score = 500; // Score base
      
      if (requestData.income && requestData.income > 5000) score += 100;
      if (requestData.employment_years && requestData.employment_years > 2) score += 50;
      if (requestData.has_property === true) score += 70;
      if (requestData.has_debt === true) score -= 80;
      if (requestData.payment_defaults && requestData.payment_defaults > 0) score -= 100;
      
      // Garantir que o score esteja dentro dos limites (300-850)
      score = Math.max(300, Math.min(850, score));
      
      const threshold = 650;
      const passed = score >= threshold;

      // Return complete payload compatible with new format
      return {
        requestId: `mock-${Date.now()}`,
        timestamp: new Date().toISOString(),
        modelVersion: "1.0.0",
        workflowVersion: "2.0.0",
        environment: "development",
        userProfile: {
          incomeRange: requestData.income && requestData.income > 8000 ? "high" : "medium",
          employmentStability: requestData.employment_years && requestData.employment_years > 3 ? "stable" : "moderate",
          hasProperty: requestData.has_property || false,
          hasDebt: requestData.has_debt || false,
          riskLevel: score > 700 ? "low" : score > 500 ? "medium" : "high",
        },
        analysis: {
          score,
          threshold,
          passed,
          category: score >= 800 ? "Excellent" : score >= 700 ? "Good" : score >= 600 ? "Fair" : "Poor",
          message: passed 
            ? `Parabéns! Seu score de crédito é ${score}. Você está aprovado para financiamento.`
            : `Seu score de crédito é ${score}. Infelizmente não foi aprovado no momento.`,
          suggestedLimit: passed ? score * 100 : 0,
          confidence: 0.95,
        },
        recommendations: {
          immediate: passed 
            ? ["Aproveite o financiamento aprovado", "Mantenha pagamentos em dia"]
            : ["Revise seu histórico de pagamentos", "Considere melhorar sua renda"],
          longTerm: passed
            ? ["Construa reserva de emergência", "Diversifique investimentos"]
            : ["Construa histórico de crédito positivo", "Reduza dívidas existentes"],
          nextReview: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        technical: {
          processingTime: 0,
          algorithm: "zkfinance-credit-v1",
          dataPoints: 5,
          validation: "passed",
        },
      };
    },
  });

  return {
    analyzeCredit: mockAnalysisMutation.mutate,
    analyzeCreditAsync: mockAnalysisMutation.mutateAsync,
    isLoading: mockAnalysisMutation.isPending,
    isError: mockAnalysisMutation.isError,
    error: mockAnalysisMutation.error,
    data: mockAnalysisMutation.data,
    reset: mockAnalysisMutation.reset,
  };
}; 