import { useAuth } from "../contexts/AuthContext";

// Possible roles: "admin", "moderator", "user", "lender", "borrower", "visitor"
export function useRBAC() {
  const { roles } = useAuth();

  // Generic helpers
  const isAdmin = roles.includes("admin");
  const isBorrower = roles.includes("borrower");
  const isLender = roles.includes("lender");

  // Generic permissions
  const canViewLoans = isAdmin || isLender || isBorrower;
  const canEditLoan = isAdmin || isBorrower;
  const canCreateLoan = isAdmin || isBorrower;
  const canInvest = isAdmin || isLender;

  // Pronto para adicionar regras mais granulares depois
  return {
    isAdmin,
    isBorrower,
    isLender,
    canViewLoans,
    canEditLoan,
    canCreateLoan,
    canInvest,
    // ...add more as needed
  };
} 