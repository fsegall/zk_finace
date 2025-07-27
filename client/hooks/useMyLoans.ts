import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase/client";
import { useAuth } from "../contexts/AuthContext";

export interface LoanWithDetails {
  id: string;
  title: string;
  description: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  category: string;
  risk_score: string;
  status: string;
  deadline: string;
  created_at: string;
  updated_at: string;
  // Campos calculados
  author: string;
  value: string;
  interest: string;
  expires: string;
  progress: number;
  raised: string;
  goal: string;
  investors: number;
  daysLeft: number;
}

export function useMyLoans() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["myLoans", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<LoanWithDetails[]> => {
              // Fetch user loans
      const { data: loans, error: loansError } = await supabase
        .from("loans")
        .select("*")
        .eq("creator_id", user?.id)
        .order("created_at", { ascending: false });

      if (loansError) throw loansError;
      if (!loans) return [];

              // For each loan, fetch investments and creator data
      const loansWithDetails = await Promise.all(
        loans.map(async (loan) => {
                      // Fetch investments for this loan
          const { data: investments, error: investmentsError } = await supabase
            .from("investments")
            .select("amount, investor_id")
            .eq("loan_id", loan.id);

          if (investmentsError) throw investmentsError;

          // Buscar dados do criador
          const { data: creator, error: creatorError } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", loan.creator_id)
            .single();

          if (creatorError) throw creatorError;

          // Calcular valores
          const totalInvested = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0;
          const progress = loan.amount > 0 ? Math.round((totalInvested / loan.amount) * 100) : 0;
          const investors = investments?.length || 0;

          // Calcular dias restantes
          const deadline = new Date(loan.deadline);
          const now = new Date();
          const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

          // Formatar valores
          const formatCurrency = (value: number) => {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value);
          };

          const formatInterest = (rate: number) => {
            return `${rate.toFixed(1)}% APR`;
          };

          const formatExpires = (days: number) => {
            if (days === 0) return "0 dias";
            if (days === 1) return "1 dia";
            return `${days} dias`;
          };

          return {
            ...loan,
            author: creator?.full_name || "Usuário",
            value: formatCurrency(loan.amount),
            interest: formatInterest(loan.interest_rate),
            expires: formatExpires(daysLeft),
            progress,
            raised: formatCurrency(totalInvested),
            goal: formatCurrency(loan.amount),
            investors,
            daysLeft,
          };
        })
      );

      return loansWithDetails;
    },
  });
} 