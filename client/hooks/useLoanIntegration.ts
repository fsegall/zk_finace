import { useState } from 'react';
import { loanIntegrationService, LoanData, IntegrationResult } from '../services/LoanIntegrationService';
import { useAuth } from '../contexts/AuthContext';

export const useLoanIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, walletAddress } = useAuth();

  const createLoan = async (loanData: LoanData): Promise<IntegrationResult | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await loanIntegrationService.createLoan(
        loanData,
        walletAddress || '0x0000000000000000000000000000000000000000',
        user.id
      );

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao criar empréstimo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fundLoan = async (
    loanId: number,
    amount: number
  ): Promise<{ contractTx: { hash: string }, dbRecord: any } | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await loanIntegrationService.fundLoan(
        loanId,
        amount,
        walletAddress || '0x0000000000000000000000000000000000000000',
        user.id
      );

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao financiar empréstimo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const repayLoan = async (
    loanId: number
  ): Promise<{ contractTx: { hash: string }, dbRecord: any } | null> => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await loanIntegrationService.repayLoan(
        loanId,
        walletAddress || '0x0000000000000000000000000000000000000000'
      );

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao reembolsar empréstimo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getLoanFromContract = async (loanId: number) => {
    try {
      return await loanIntegrationService.getLoanFromContract(loanId);
    } catch (err) {
      console.error('Erro ao obter empréstimo do contrato:', err);
      return null;
    }
  };

  const getLoanCount = async (): Promise<number> => {
    try {
      return await loanIntegrationService.getLoanCount();
    } catch (err) {
      console.error('Erro ao obter contagem de empréstimos:', err);
      return 0;
    }
  };

  return {
    createLoan,
    fundLoan,
    repayLoan,
    getLoanFromContract,
    getLoanCount,
    loading,
    error,
    clearError: () => setError(null)
  };
}; 