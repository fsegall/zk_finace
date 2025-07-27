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
  
  // Check if we're in development mode with mock user
  const isDevelopment = import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const isMockUser = user?.id === 'mock-user-id';

  return useQuery({
    queryKey: ["myLoans", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<LoanWithDetails[]> => {
      // In development with mock user, return mock data
      if (isDevelopment && isMockUser) {
        return [
          {
            id: "mock-loan-1",
            title: "TechGrow Software Development",
            description: "Esse projeto é para implementar o crescimento das sementes na minha agroindústria, pelo qual estamos...",
            amount: 50000,
            interest_rate: 5.8,
            term_months: 24,
            category: "Tech",
            risk_score: "Baixo",
            status: "active",
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: "2024-03-15T10:00:00Z",
            updated_at: "2024-03-15T10:00:00Z",
            author: "Developer User",
            value: "R$ 50.000,00",
            interest: "5.8% APR",
            expires: "5 dias",
            progress: 65,
            raised: "R$ 32.500,00",
            goal: "R$ 50.000,00",
            investors: 12,
            daysLeft: 5,
          },
          {
            id: "mock-loan-2",
            title: "Fresh Eats Cafe Expansion",
            description: "Expansão de cafeteria com foco em produtos orgânicos",
            amount: 25000,
            interest_rate: 6.3,
            term_months: 18,
            category: "Food",
            risk_score: "Médio",
            status: "active",
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: "2024-03-10T14:30:00Z",
            updated_at: "2024-03-10T14:30:00Z",
            author: "Developer User",
            value: "R$ 25.000,00",
            interest: "6.3% APR",
            expires: "10 dias",
            progress: 35,
            raised: "R$ 8.750,00",
            goal: "R$ 25.000,00",
            investors: 8,
            daysLeft: 10,
          },
        ];
      }

      // Fetch user loans from Supabase
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