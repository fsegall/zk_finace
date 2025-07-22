# 🎯 Milestones de Integração dos Módulos

Este documento define os próximos passos para integrar os módulos implementados (`credit-agent`, `zk-credit`, `foundry`) com o frontend atual, criando um fluxo completo end-to-end.

---

## 📋 Visão Geral

Atualmente temos:
- ✅ **Frontend**: React + Supabase + RBAC funcionando
- ✅ **credit-agent**: Workflow N8N funcional e hospedado
- ✅ **zk-credit**: Circuitos Circom implementados
- ✅ **foundry**: Smart contracts implementados e testados

**Objetivo**: Unir todos os módulos em um processo integrado de solicitação e financiamento de empréstimos.

---

## 🚀 Milestone 1: Integração com credit-agent

### Objetivo
Conectar o frontend ao webhook N8N para análise automatizada de crédito.

### Tarefas
- [x] **Criar hook `useCreditAnalysis`**
  - Função para chamar webhook: `https://webhook.n8n.alifa.com.br/webhook/credit-analysis`
  - Tratamento de resposta: `{ score, threshold, passed }`
  - Estados de loading e error
  - ✅ **Implementado**: `client/hooks/useCreditAnalysis.ts`

- [x] **Integrar no formulário de criação de lance**
  - Adicionar botão "Analisar Crédito" em `/borrower/create-lance`
  - Exibir score calculado (opcional - para demonstração)
  - Validar se `passed = true` antes de permitir criação
  - ✅ **Implementado**: Integração completa no `CreateLance.tsx`

- [ ] **Armazenar resultado no Supabase**
  - Criar tabela `credit_analyses` se necessário
  - Salvar score e resultado da análise
  - Relacionar com o usuário e lance

### Arquivos a modificar
- `client/hooks/useCreditAnalysis.ts` (novo)
- `client/pages/CreateLance.tsx`
- `supabase/migrations/` (se necessário nova tabela)

---

## 🔐 Milestone 2: Integração com zk-credit

### Objetivo
Implementar geração de provas ZK no frontend para preservação de privacidade.

### Tarefas
- [ ] **Instalar dependências ZK**
  - `snarkjs` para geração de provas
  - Arquivos `.wasm` e `.zkey` do circuito compilado
  - Configurar import dinâmico dos arquivos

- [ ] **Criar hook `useZKProof`**
  - Função para gerar prova com `snarkjs.groth16.fullProve()`
  - Input: `{ score, threshold }` do credit-agent
  - Output: `{ proof, publicSignals }`

- [ ] **Integrar no fluxo de criação**
  - Gerar prova após análise de crédito bem-sucedida
  - Enviar prova para verificação (Edge Function ou ZKVerify)
  - Validar resultado antes de prosseguir

- [ ] **Implementar verificação**
  - Edge Function no Supabase para verificar prova
  - Ou integração direta com ZKVerify
  - Retornar `{ valid: true/false }`

### Arquivos a modificar
- `client/hooks/useZKProof.ts` (novo)
- `client/pages/CreateLance.tsx`
- `supabase/edge-functions/zkverify/verifyCreditProof.ts`
- `package.json` (dependências)

---

## ⚖️ Milestone 3: Integração com foundry

### Objetivo
Conectar ao contrato LoanManager via Viem para registro na blockchain.

### Tarefas
- [ ] **Instalar e configurar Viem**
  - `viem` e `wagmi` para interação Web3
  - Configurar provider para Sepolia testnet
  - Configurar wallet connection (MetaMask)

- [ ] **Criar hook `useLoanContract`**
  - Função para chamar `createLoanRequest()` no contrato
  - Input: dados do lance + resultado da verificação ZK
  - Tratamento de transação e gas

- [ ] **Integrar no fluxo final**
  - Chamar contrato após verificação ZK bem-sucedida
  - Exibir status da transação
  - Salvar hash da transação no Supabase

- [ ] **Implementar leitura do contrato**
  - Função para ler lances registrados na blockchain
  - Sincronizar com dados do Supabase
  - Exibir status on-chain

### Arquivos a modificar
- `client/hooks/useLoanContract.ts` (novo)
- `client/contexts/AuthContext.tsx` (wallet connection)
- `client/pages/CreateLance.tsx`
- `client/pages/BorrowerLances.tsx`
- `package.json` (dependências)

---

## 🔄 Milestone 4: Fluxo Completo End-to-End

### Objetivo
Unir todos os módulos em um processo integrado e testado.

### Tarefas
- [ ] **Criar fluxo unificado**
  - Sequência: credit-agent → zk-credit → foundry → Supabase
  - Tratamento de erros em cada etapa
  - Rollback em caso de falha

- [ ] **Implementar dashboard de status**
  - Página para acompanhar progresso do lance
  - Status de cada etapa: análise, prova, contrato
  - Links para transações na blockchain

- [ ] **Testes end-to-end**
  - Teste completo do fluxo
  - Validação de dados em cada etapa
  - Teste de cenários de erro

- [ ] **Documentação do fluxo**
  - Diagrama do processo completo
  - Documentação técnica de integração
  - Guia de troubleshooting

### Arquivos a modificar
- `client/pages/LanceStatus.tsx` (novo)
- `client/hooks/useLanceFlow.ts` (novo)
- Documentação atualizada

---

## 🧪 Milestone 5: Funcionalidades Avançadas

### Objetivo
Implementar funcionalidades complementares para MVP completo.

### Tarefas
- [ ] **Sistema de financiamento**
  - Interface para investidores financiarem lances
  - Integração com função `fundLoan()` do contrato
  - Atualização de progresso em tempo real

- [ ] **Sistema de reembolso**
  - Interface para empreendedores quitarem empréstimos
  - Integração com função `repayLoan()` do contrato
  - Cálculo automático de juros

- [ ] **Notificações e alertas**
  - Notificações de mudanças de status
  - Alertas de prazos e vencimentos
  - Integração com email/SMS

- [ ] **Analytics e relatórios**
  - Dashboard com métricas de uso
  - Relatórios de performance
  - Exportação de dados

---

## 📊 Priorização

### Fase 1 (MVP Core)
1. **Milestone 1**: Integração credit-agent
2. **Milestone 2**: Integração zk-credit
3. **Milestone 3**: Integração foundry

### Fase 2 (Fluxo Completo)
4. **Milestone 4**: Fluxo end-to-end
5. **Milestone 5**: Funcionalidades avançadas

---

## 🔧 Configuração Técnica

### Dependências a adicionar
```json
{
  "dependencies": {
    "snarkjs": "^0.7.0",
    "viem": "^2.0.0",
    "wagmi": "^2.0.0",
    "@wagmi/core": "^2.0.0"
  }
}
```

### Variáveis de ambiente
```env
# ZK
ZKVERIFY_API_KEY=sua_chave_api

# Blockchain
SEPOLIA_RPC_URL=sua_url_rpc
CONTRACT_ADDRESS=0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e

# Credit Agent
CREDIT_AGENT_WEBHOOK=https://webhook.n8n.alifa.com.br/webhook/credit-analysis
```

---

## 📈 Métricas de Sucesso

- [ ] Fluxo completo funcionando sem erros
- [ ] Tempo de processamento < 30 segundos
- [ ] Taxa de sucesso > 95%
- [ ] Interface responsiva e intuitiva
- [ ] Documentação completa e atualizada

---

## 🎯 Próximos Passos

1. **Iniciar com Milestone 1** (credit-agent)
2. **Testar cada integração isoladamente**
3. **Implementar tratamento de erros robusto**
4. **Documentar progresso neste arquivo**

---

> **Nota**: Este documento será atualizado conforme o progresso da integração. Cada milestone deve ser marcada como ✅ quando concluída. 