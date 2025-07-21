-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  loan_id uuid,
  uploader_id uuid,
  document_type text NOT NULL,
  file_path text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documents_pkey PRIMARY KEY (id),
  CONSTRAINT documents_uploader_id_fkey FOREIGN KEY (uploader_id) REFERENCES auth.users(id),
  CONSTRAINT documents_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loans(id)
);
CREATE TABLE public.investments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  loan_id uuid,
  investor_id uuid,
  amount numeric NOT NULL,
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT investments_pkey PRIMARY KEY (id),
  CONSTRAINT investments_investor_id_fkey FOREIGN KEY (investor_id) REFERENCES auth.users(id),
  CONSTRAINT investments_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loans(id)
);
CREATE TABLE public.loans (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  creator_id uuid,
  title text NOT NULL,
  description text,
  amount numeric NOT NULL,
  interest_rate numeric NOT NULL,
  term_months integer NOT NULL,
  category text NOT NULL,
  risk_score text NOT NULL,
  status text DEFAULT 'pending'::text,
  deadline timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT loans_pkey PRIMARY KEY (id),
  CONSTRAINT loans_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES auth.users(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  full_name text,
  wallet_address text,
  is_onboarded boolean DEFAULT false,
  role_selection text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  loan_id uuid,
  investment_id uuid,
  amount numeric NOT NULL,
  transaction_type text NOT NULL,
  status text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_investment_id_fkey FOREIGN KEY (investment_id) REFERENCES public.investments(id),
  CONSTRAINT transactions_loan_id_fkey FOREIGN KEY (loan_id) REFERENCES public.loans(id),
  CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  role USER-DEFINED NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);