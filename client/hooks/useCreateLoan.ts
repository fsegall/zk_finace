import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase/client";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export interface CreateLoanData {
  title: string;
  description: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  category: string;
  risk_score: string;
  deadline: string;
}

export function useCreateLoan() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (loanData: CreateLoanData) => {
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Calcular data de deadline baseada no prazo em meses
      const deadline = new Date();
      deadline.setMonth(deadline.getMonth() + loanData.term_months);

      const { data, error } = await supabase
        .from("loans")
        .insert({
          creator_id: user.id,
          title: loanData.title,
          description: loanData.description,
          amount: loanData.amount,
          interest_rate: loanData.interest_rate,
          term_months: loanData.term_months,
          category: loanData.category,
          risk_score: loanData.risk_score || "medium", // default
          status: "pending", // sempre começa como pending
          deadline: deadline.toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar empréstimo:", error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      // Invalidar cache dos empréstimos do usuário
      queryClient.invalidateQueries({ queryKey: ["myLoans", user?.id] });
      
      // Redirecionar para a lista de lances
      navigate("/borrower/lances");
      
      // Mostrar toast de sucesso (se implementado)
      console.log("Lance criado com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao criar lance:", error);
      // Aqui você pode implementar um toast de erro
    },
  });
} 