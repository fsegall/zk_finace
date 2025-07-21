-- Migration: Adiciona tabela de colaterais associada a loans
BEGIN;

CREATE TABLE collaterals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    loan_id UUID REFERENCES loans(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    description TEXT,
    value NUMERIC,
    document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para facilitar buscas por loan
CREATE INDEX IF NOT EXISTS idx_collaterals_loan_id ON collaterals(loan_id);

-- RLS: permitir acesso apenas a usuários autenticados
ALTER TABLE collaterals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users"
    ON collaterals
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

COMMIT; 