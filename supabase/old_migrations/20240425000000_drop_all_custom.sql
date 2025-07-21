-- Apaga triggers e funções customizadas
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
DROP FUNCTION IF EXISTS get_user_roles CASCADE;
DROP FUNCTION IF EXISTS has_role CASCADE;
DROP FUNCTION IF EXISTS has_any_role CASCADE;
DROP FUNCTION IF EXISTS update_wallet_address CASCADE;
DROP FUNCTION IF EXISTS clear_wallet_address CASCADE;

-- Remove policies de todas as tabelas customizadas
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS "%s" ON %I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- Desabilita RLS para evitar bloqueios
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS loans DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS investments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS transactions DISABLE ROW LEVEL SECURITY;

-- Remove índices customizados
DROP INDEX IF EXISTS idx_user_roles_admin;
DROP INDEX IF EXISTS idx_profiles_wallet;
DROP INDEX IF EXISTS idx_loans_creator;
DROP INDEX IF EXISTS idx_investments_loan;
DROP INDEX IF EXISTS idx_investments_investor;
DROP INDEX IF EXISTS idx_transactions_user;
DROP INDEX IF EXISTS idx_transactions_loan;
DROP INDEX IF EXISTS idx_transactions_investment;

-- Remove tabelas customizadas
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS investments CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

-- Remove enum customizado
DROP TYPE IF EXISTS app_role CASCADE; 