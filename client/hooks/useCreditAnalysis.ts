import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

interface CreditAnalysisRequest {
  user_id?: string;
  email?: string;
  // Dados opcionais para análise mais precisa
  income?: number;
  employment_years?: number;
  has_property?: boolean;
  has_debt?: boolean;
  payment_defaults?: number;
}

interface CreditAnalysisResponse {
  score: number;
  threshold: number;
  passed: boolean;
}

interface CreditAnalysisError {
  message: string;
  details?: any;
}

const CREDIT_AGENT_WEBHOOK = 'https://fsegall-personal.app.n8n.cloud/webhook/credit-analysis';

export const useCreditAnalysis = () => {
  const { user } = useAuth();

  const creditAnalysisMutation = useMutation<
    CreditAnalysisResponse,
    CreditAnalysisError,
    CreditAnalysisRequest
  >({
    mutationFn: async (requestData: CreditAnalysisRequest) => {
      try {
        // Preparar dados para envio
        const payload = {
          user_id: user?.id || requestData.user_id,
          email: user?.email || requestData.email,
          // Dados opcionais para análise mais precisa
          income: requestData.income,
          employment_years: requestData.employment_years,
          has_property: requestData.has_property,
          has_debt: requestData.has_debt,
          payment_defaults: requestData.payment_defaults,
        };

        console.log('Enviando análise de crédito:', payload);

        const response = await fetch(CREDIT_AGENT_WEBHOOK, {
          method: 'POST', // Mudando para POST para enviar dados no body
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), // Enviar dados no body
        });

        if (!response.ok) {
          throw new Error(`Erro na análise de crédito: ${response.status} ${response.statusText}`);
        }

        const data: CreditAnalysisResponse = await response.json();
        
        console.log('Análise de crédito concluída:', data);
        
        return data;
      } catch (error) {
        console.error('Erro na análise de crédito:', error);
        throw {
          message: error instanceof Error ? error.message : 'Erro desconhecido na análise de crédito',
          details: error,
        };
      }
    },
    onSuccess: (data) => {
      console.log('Análise de crédito bem-sucedida:', data);
    },
    onError: (error) => {
      console.error('Falha na análise de crédito:', error);
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

// Hook para análise de crédito com dados mock (para desenvolvimento/teste)
export const useMockCreditAnalysis = () => {
  const mockAnalysisMutation = useMutation<
    CreditAnalysisResponse,
    CreditAnalysisError,
    CreditAnalysisRequest
  >({
    mutationFn: async (requestData: CreditAnalysisRequest) => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular cálculo de score baseado nos dados
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

      return {
        score,
        threshold,
        passed,
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