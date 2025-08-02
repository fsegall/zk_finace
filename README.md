# 🤝 ZKFinance — Plataforma de Financiamento Descentralizada com ZK Proofs

## 🔐 **CONCEITO FUNDAMENTAL: ZK Proofs vs Lógica de Negócio**

### 🎯 **O que é ZK Proof (Zero-Knowledge Proof)?**

**ZK Proof** é uma prova matemática criptográfica que permite verificar uma afirmação sem revelar informações sensíveis. No nosso caso:

#### ✅ **O que a Prova ZK Faz:**
```circom
// Circuito Circom - APENAS matemática
template CreditScoreCheck() {
    signal input score;      // PRIVADO (não revelado)
    signal input threshold;  // PÚBLICO (revelado)
    signal output passed;    // PÚBLICO (0 ou 1)

    component isGreaterEq = GreaterEqThan(16);
    isGreaterEq.in[0] <== score;      // score ≥ threshold?
    isGreaterEq.in[1] <== threshold;
    passed <== isGreaterEq.out;       // resultado: 0 ou 1
}
```

**A prova ZK garante apenas:**
- ✅ **Privacidade**: O score real nunca é revelado
- ✅ **Verificação**: Prova matematicamente que `score ≥ threshold`
- ✅ **Resultado**: Apenas `true` (1) ou `false` (0)

#### ❌ **O que NÃO é ZK Proof:**
- Análise de risco (Excellent, Good, Fair, Poor)
- Breakdown do score (income bonus, employment bonus)
- Recomendações de aprovação
- **Tudo isso é apenas lógica de negócio para UI**

### 🔍 **Como Distinguir:**

| **ZK Proof (Matemática)** | **Lógica de Negócio (UI)** |
|---------------------------|----------------------------|
| `score ≥ threshold` | Risk levels, breakdown, recommendations |
| Circuito Circom | Análise de crédito para exibição |
| Privacidade garantida | Apenas para interface do usuário |
| Verificação na blockchain | Processamento local no frontend |

### 🎯 **Por que isso Importa:**

1. **ZK Proof**: Garante privacidade e verificação matemática
2. **Lógica de Negócio**: Melhora experiência do usuário
3. **Separação**: ZK Proof é imutável, lógica de negócio é flexível

---

Este projeto é uma plataforma moderna que conecta emprestedores a investidores, utilizando contratos inteligentes, provas ZK de análise de crédito e verificação de elegibilidade com preservação de privacidade. Atualmente em desenvolvimento ativo com foco na integração Supabase e funcionalidades core.

## 🔒 **PRIVACIDADE E ARQUITETURA LOCAL - REQUISITO OBRIGATÓRIO ATENDIDO**

### ✅ **Compromisso com a Privacidade dos Dados:**
**NENHUMA CHAMADA EXTERNA É FEITA COM DADOS DOS USUÁRIOS** - Todos os dados sensíveis permanecem 100% locais.

### 🏗️ **Arquitetura Local Implementada:**
- **Algoritmo de Crédito**: Executado localmente (sem APIs externas)
- **Provas ZK**: Geradas localmente com SnarkJS
- **Verificação ZK**: Apenas a prova (sem dados) é enviada para ZKVerify
- **Smart Contracts**: Deploy local e testnet (sem dados sensíveis)

### 📁 **Pasta `server/` - Propósito de Organização:**
A pasta `server/` contém endpoints de API **APENAS PARA ORGANIZAÇÃO MODULAR** do projeto. **NÃO pretendemos expor o servidor e frontend em instâncias separadas** que se comunicam pela internet. Tudo roda localmente para preservar a privacidade.

### 🔐 **Fluxo de Privacidade:**
```
Dados do Usuário → Algoritmo Local → Prova ZK Local → ZKVerify (apenas prova) → Smart Contract
     🔒              🔒                🔒                🔒                      🔒
   SEMPRE LOCAL    SEMPRE LOCAL     SEMPRE LOCAL    APENAS PROVA           SEMPRE LOCAL
```

## 🚀 **NOVA IMPLEMENTAÇÃO 100% CLIENT-SIDE ZK - DESTAQUE!**

### 🏆 **Conquista Significativa: Transação ZK 100% Client-Side**

**Status**: ✅ **SUCESSO TOTAL** - Transação real confirmada na blockchain ZKVerify!

#### 📊 **Transação Realizada:**
- **TX Hash**: `0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183`
- **Status**: ✅ **Success** (Finalizada)
- **Block**: 1719350
- **Explorer**: [https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183](https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183)

#### 🎯 **O que foi conquistado:**
- ✅ **Prova ZK gerada no navegador** (sem servidor)
- ✅ **Transação enviada diretamente à blockchain**
- ✅ **Integração perfeita com Subwallet**
- ✅ **Conversão automática de endereços** (Polkadot → Volta)
- ✅ **Arquitetura 100% descentralizada**

#### 📁 **Localização da Implementação:**
```
client/zk-proof/
├── services/embeddedZKVerifyService.ts    # Serviço principal ZK
├── hooks/useEmbeddedZKProof.ts           # Hook React
├── components/EmbeddedZKProofDemo.tsx    # Interface de demonstração
├── assets/                               # Artefatos ZK embutidos
│   ├── wasm-base64.txt                   # Circuito WASM
│   ├── zkey-base64.txt                   # Chave de prova
│   └── vkey-base64.txt                   # Chave de verificação
└── README_ZKPROOF_EN.md                  # Documentação em inglês
```

#### 🚀 **Como testar:**
```bash
cd client
npm install
npm run dev
# Acesse: http://localhost:8080/zk-proof-test
```

---

## 🔄 **FLUXO COMPLETO DE EMPRÉSTIMO - INTEGRAÇÃO TOTAL**

### 🎯 **Arquitetura End-to-End Implementada:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│  API Local  │───▶│ zk-credit   │───▶│  ZKVerify   │───▶│Smart Contract│
│   (React)   │    │  (Node.js)  │    │ (Prova ZK)  │    │ (Blockchain)│    │  (Foundry)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │                   │
       │                   │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Supabase  │◀───│   Viem      │◀───│  SnarkJS    │◀───│  Volta      │◀───│  Sepolia    │
│  (PostgreSQL)│    │ (Web3 Client)│    │ (ZK Proofs) │    │ (Testnet)   │    │ (Testnet)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 🎯 **Fluxo Detalhado:**

1. **👤 Usuário (Borrower)** → Frontend React
2. **📝 Frontend** → API Local (análise de crédito)
3. **🔐 API** → zk-credit (geração de prova ZK)
4. **🔍 zk-credit** → ZKVerify (verificação na blockchain)
5. **📋 ZKVerify** → Smart Contract (criação do empréstimo)
6. **💾 Smart Contract** → Supabase (persistência de dados)
7. **🔄 Supabase** → Frontend (atualização da interface)

### ✅ **Status da Integração:**

- **🔐 ZKVerify**: ✅ Conectividade RPC (13+ peers), provas verificadas
- **📝 Smart Contract**: ✅ Deploy local e Sepolia, testes passando
- **🏗️ Sistema de Roles**: ✅ DDD implementado, RBAC funcional
- **🔗 Ponte Frontend-Contrato**: ✅ Viem + TypeScript integrado
- **💾 Persistência**: ✅ Supabase ↔ Smart Contract sincronizado

### 🧪 **Comandos de Demonstração:**

```bash
# Teste de conectividade ZKVerify
node zk-credit/scripts/test-zkverify-rpc.js

# Teste de provas ZK
node zk-credit/scripts/test-zkverify-proof.js

# Teste de integração completa
node test_integration_complete.js

# Teste do smart contract
cd foundry && forge test -vv
```

---

## 🧱 Arquitetura Modular

### 📦 **Organização dos Package.json**

O projeto segue uma arquitetura modular bem organizada com dependências específicas para cada módulo:

```
zkfinance/
├── package.json          ← Projeto principal (servidor + scripts)
│   ├── Dependências: Express, CORS, TypeScript, Vite
│   └── Scripts: dev, build:server, start, test, install:all
├── client/
│   └── package.json      ← Frontend React + UI (isolado para Netlify)
│       ├── Dependências: React, Viem, Supabase, shadcn/ui
│       └── Scripts: dev, build, preview
├── zk-credit/
│   └── package.json      ← Módulo ZK específico
│       ├── Dependências: Circom, SnarkJS, ZKVerifyJS
│       └── Scripts: setup, compile, generate, verify
└── foundry/
    └── lib/forge-std/    ← Dependência externa (não modificada)
```

### ✅ **Benefícios da Arquitetura:**
- **Separação clara**: Cada módulo tem suas dependências específicas
- **Sem duplicação**: Dependências organizadas por necessidade
- **Manutenibilidade**: Fácil atualização e gerenciamento
- **Escalabilidade**: Novos módulos podem ser adicionados independentemente
- **Deploy isolado**: Frontend pode ser deployado separadamente (Netlify)
- **Build otimizado**: Sem timeout por dependências pesadas

| Módulo             | Status | Descrição |
|--------------------|--------|-----------|
| [`client/`](client/README_CLIENT.md) | ✅ **Ativo** | Aplicação React com autenticação Supabase, RBAC e UI moderna. **Integração Viem + Smart Contract implementada**. |
| [`client/zk-proof/`](client/zk-proof/README_ZKPROOF_EN.md) | ✅ **NOVO!** | **Implementação 100% client-side ZK** - Transação real confirmada na blockchain! |
| [`supabase/`](supabase/README_SUPABASE.md) | ✅ **Ativo** | Backend com PostgreSQL, autenticação Web3, RLS e edge functions. **Sistema de roles DDD implementado**. |
| [`foundry/`](foundry/README.md) | ✅ **Implementado** | Contratos inteligentes para empréstimos. **LoanManager.sol deployado e testado**. |
| [`zk-credit/`](zk-credit/README.md) | ✅ **Implementado** | Circuitos Circom e provas ZK. **Integração ZKVerify funcionando**. |
| [`credit-agent/`](credit-agent/README-credit-agent.md) | ✅ **Implementado** | **Algoritmo local de análise de crédito** (N8N substituído por privacidade). **Algoritmo interno funcionando**. |

---

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação e RBAC
- **Supabase Auth** com email/password e Google OAuth
- **Role-Based Access Control** (Admin, Lender, Borrower, Moderator, User, Visitor)
- **Wallet Connection** (MetaMask) integrada
- **Perfis de usuário** com dados dinâmicos

### ✅ Interface Moderna
- **Design System** com shadcn/ui e Tailwind CSS
- **Tema Dark/Light** com toggle automático
- **Responsividade** completa para mobile e desktop
- **Contrastes otimizados** para acessibilidade

### ✅ Funcionalidades Core
- **Dashboard do Empreendedor** com criação de lances
- **Dashboard do Investidor** com visualização de oportunidades
- **Dashboard Admin** com controle de usuários
- **Sistema de Lances** (crowdfunding de empréstimos)
- **Formulários multi-step** para criação de lances
- **Navegação completa** entre módulos

### ✅ Backend Integrado
- **Schema completo** com tabelas: profiles, user_roles, loans, investments, documents, transactions, collaterals
- **Row Level Security (RLS)** implementado
- **Triggers e funções** PostgreSQL para automação
- **Migrations** organizadas e versionadas

### ✅ Módulos Especializados
- **credit-agent**: **Algoritmo local** para análise de crédito automatizada (N8N substituído por privacidade)
- **zk-credit**: Circuitos Circom e provas ZK para preservação de privacidade
- **foundry**: Smart contracts para empréstimos e financiamento peer-to-peer
- **client/zk-proof**: **NOVA implementação 100% client-side ZK** com transação real confirmada!

### ✅ Integração ZKVerify
- **Testes de conectividade RPC** com a rede ZKVerify Volta
- **Registro de verification keys** na blockchain
- **Submissão e verificação de provas ZK** em tempo real
- **Scripts de teste** para demonstração e validação
- **NOVA: Implementação 100% client-side** com transação real confirmada!

### ✅ Smart Contract e Integração Blockchain
- **Contrato LoanManager** deployado local e em Sepolia
- **Integração Viem** para interação com smart contracts
- **Ponte Frontend-Contrato** com TypeScript
- **Sincronização Supabase** ↔ Smart Contract
- **Hook useLoanIntegration** para React

### ✅ Sistema de Roles e DDD
- **Domain Driven Design** implementado
- **Role-Based Access Control** (RBAC) funcional
- **Entidades de domínio** bem estruturadas
- **Persistência robusta** com PostgreSQL

---

## 🔁 Fluxo Completo da Plataforma (INTEGRAÇÃO TOTAL)

### 🎯 **Fluxo End-to-End Implementado:**

1. **👤 Cadastro/Autenticação**: Usuário se registra via Supabase Auth
2. **🏷️ Seleção de Role**: Escolhe entre Borrower, Investor ou Admin
3. **📊 Dashboard Personalizado**: Interface adaptada ao role do usuário
4. **📝 Criação de Empréstimo**: Borrower submete dados de crédito
5. **🔐 Análise de Crédito**: **algoritmo local** calcula score (N8N substituído por privacidade)
6. **🔒 Geração de Prova ZK**: zk-credit gera prova de que score ≥ threshold
7. **🔍 Verificação ZKVerify**: Prova validada na blockchain ZKVerify Volta
8. **📋 Smart Contract**: foundry registra empréstimo validado na blockchain
9. **💾 Persistência**: Dados sincronizados com Supabase via Viem
10. **💰 Financiamento**: Investors podem financiar via contrato inteligente
11. **🔄 Atualização**: Interface atualizada em tempo real

### ✅ **Status da Integração:**
- **Frontend ↔ API**: ✅ React + Node.js integrados
- **API ↔ zk-credit**: ✅ Geração de provas ZK funcionando
- **zk-credit ↔ ZKVerify**: ✅ Verificação na blockchain ativa
- **ZKVerify ↔ Smart Contract**: ✅ Criação de empréstimos validados
- **Smart Contract ↔ Supabase**: ✅ Persistência bidirecional
- **Supabase ↔ Frontend**: ✅ Atualização em tempo real
- **NOVA: Client-side ZK**: ✅ **Transação real confirmada na blockchain!**

### 🏆 **SUCESSOS CONFIRMADOS:**

#### 🚀 **Smart Contract LoanManager - Deploy Sepolia:**
- **✅ Status**: Deployado e verificado com sucesso
- **📅 Data**: 25 de Julho de 2025 às 23:05:53 (UTC-3)
- **🔗 Etherscan**: https://sepolia.etherscan.io/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13
- **🔗 Sourcify**: https://sepolia.sourcify.dev/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13
- **💰 Custo**: 0.000001624967444464 ETH (extremamente baixo)
- **⛽ Gas**: 1,581,286 gas

#### 🔐 **ZKVerify Integration - 100% Funcional:**
- **✅ Status**: Todos os testes passaram com sucesso
- **📅 Data**: 26 de Julho de 2025 às 03:12:07 UTC
- **🔗 Transação**: https://zkverify-testnet.subscan.io/extrinsic/0x8b190dff059ac4b9c39449c2a37ec904ad8419554b6b3f50cd1f6463307e8977
- **📊 Score**: 805 (threshold: 705) - **PROVA VÁLIDA!**
- **💰 Taxa**: 0.02393157714 tVFY
- **🔧 Rede**: ZKVerify Volta Testnet operacional

#### 🏆 **NOVA: Implementação 100% Client-Side ZK - SUCESSO HISTÓRICO:**
- **✅ Status**: **TRANSAÇÃO ZK 100% CLIENT-SIDE CONFIRMADA!**
- **📅 Data**: 29 de Julho de 2025 às 01:02:12 (UTC)
- **🔗 Transação**: `0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183`
- **🔗 Explorer**: [https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183](https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183)
- **📊 Block**: 1719350
- **💰 Fee**: 0.02393157714 tVFY
- **🎯 Conquista**: Prova ZK gerada no navegador e enviada diretamente à blockchain!

## 🧪 Testes de Integração ZKVerify

### Scripts Disponíveis
```bash
# Teste de conectividade RPC
node zk-credit/scripts/test-zkverify-rpc.js

# Registro de verification key (uma vez só)
node zk-credit/scripts/register-circuit.js

# Teste de submissão de provas (múltiplas vezes)
node zk-credit/scripts/test-zkverify-proof.js

# Build dos artefatos ZK
bash zk-credit/scripts/setup.sh
```

### Status dos Testes
- ✅ **Conectividade RPC**: 14+ peers, rede estável
- ✅ **Registro de VK**: Verification key registrada na blockchain
- ✅ **Submissão de Provas**: **PROVA SUBMETIDA E FINALIZADA COM SUCESSO!**
- ✅ **Rede Volta**: Operacional e acessível
- ✅ **Transação Confirmada**: https://zkverify-testnet.subscan.io/extrinsic/0x8b190dff059ac4b9c39449c2a37ec904ad8419554b6b3f50cd1f6463307e8977
- ✅ **NOVA: Client-side ZK**: **Transação real confirmada na blockchain!**

## 📚 **Documentação Completa**

### 📖 **Documentos Principais:**
- **[README_LENDING_SMART_CONTRACT.md](README_LENDING_SMART_CONTRACT.md)**: Documentação completa do smart contract e integração
- **[ENTREGA.md](ENTREGA.md)**: Plano de entrega e status atual
- **[zk-credit/README.md](zk-credit/README.md)**: Documentação dos testes ZKVerify
- **[foundry/README.md](foundry/README.md)**: Documentação do smart contract
- **[foundry/DEPLOY.md](foundry/DEPLOY.md)**: Guia completo de deploy
- **[client/zk-proof/README_ZKPROOF_EN.md](client/zk-proof/README_ZKPROOF_EN.md)**: **NOVA implementação 100% client-side ZK**

### 🧪 **Scripts de Teste:**
- **`test_integration_complete.js`**: Teste de integração end-to-end
- **`zk-credit/scripts/test-zkverify-rpc.js`**: Teste de conectividade
- **`zk-credit/scripts/test-zkverify-proof.js`**: Teste de provas ZK
- **`foundry/test/LoanManager.t.sol`**: Testes do smart contract

---

## 🛠️ Stack Atual

### Frontend
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **React Router DOM** para navegação
- **React Query** para gerenciamento de estado
- **shadcn/ui** para componentes
- **Tailwind CSS** para estilização

### Backend
- **Supabase** (PostgreSQL, Auth, RLS)
- **TypeScript** para type safety
- **Edge Functions** (preparado para ZK)

### Blockchain & ZK
- **Foundry** para desenvolvimento de smart contracts
- **Solidity** para contratos inteligentes
- **Circom** para circuitos ZK
- **SnarkJS** para geração e verificação de provas
- **ZKVerify** para verificação de provas
- **NOVA: zkverifyjs** para integração client-side

### Análise de Crédito
- **Algoritmo local** (N8N substituído por privacidade)
- **Processamento 100% local** sem APIs externas

### Desenvolvimento
- **ESLint** para linting
- **Prettier** para formatação
- **HMR** para desenvolvimento rápido

---

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build

# Supabase
supabase start       # Inicia Supabase local
supabase db push     # Aplica migrations
supabase functions deploy # Deploy edge functions

# Smart Contracts (Foundry)
cd foundry
forge test           # Executa testes
forge script script/DeployLoan.s.sol --rpc-url $SEPOLIA_RPC --private-key $KEY --broadcast

# Provas ZK (zk-credit)
cd zk-credit
npm run setup        # Setup inicial
npm run compile      # Compila circuitos
npm run generate     # Gera provas
npm run verify       # Verifica provas

# NOVA: Client-side ZK
cd client/zk-proof
# Acesse: http://localhost:8080/zk-proof-test
```

---

## 🔧 Configuração

### 1. Instalação
```bash
git clone <repository>
cd zkfinance_ui
npm install
```

### 2. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Supabase
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Blockchain (Foundry)
SEPOLIA_RPC_URL=sua_url_rpc_sepolia
PRIVATE_KEY=sua_chave_privada

# ZKVerify (opcional)
ZKVERIFY_API_KEY=sua_chave_api_zkverify
```

### 3. Banco de Dados
```bash
# Aplicar migrations
supabase db push
```

### 4. Módulos Especializados
```bash
# Instalar Foundry (se necessário)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Instalar dependências ZK
cd zk-credit
npm install

# NOVA: Testar implementação client-side ZK
cd client
npm run dev
# Acesse: http://localhost:8080/zk-proof-test
```

---

## 📁 Estrutura do Projeto

```
zkfinance_ui/
├── client/                 # Frontend React
│   ├── components/         # Componentes UI
│   ├── pages/             # Páginas da aplicação
│   ├── hooks/             # Custom hooks (useAuth, useRBAC, etc)
│   ├── contexts/          # Context providers
│   ├── lib/               # Utilitários
│   └── zk-proof/          # 🆕 NOVA: Implementação 100% client-side ZK
│       ├── services/      # Serviço ZK principal
│       ├── hooks/         # Hook React para ZK
│       ├── components/    # Interface de demonstração
│       └── assets/        # Artefatos ZK embutidos
├── supabase/              # Backend Supabase
│   ├── migrations/        # SQL migrations
│   ├── functions/         # Edge functions
│   └── config.toml        # Configuração Supabase
├── foundry/               # Smart Contracts
│   ├── src/               # Contratos Solidity
│   ├── test/              # Testes com Forge
│   └── script/            # Scripts de deploy
├── zk-credit/             # Provas ZK (backend)
│   ├── circuits/          # Circuitos Circom
│   ├── build/             # Arquivos compilados
│   └── scripts/           # Scripts de geração
├── credit-agent/          # Agente de Crédito
│   ├── algoritmo_score.js # 🆕 Algoritmo local (N8N substituído)
│   └── workflow.json      # Workflow de análise
├── shared/                # Tipos compartilhados
├── server/                # API Local (Node.js)
└── netlify.toml           # Configuração deploy cliente (Netlify)
```

---

## 🎉 **STATUS FINAL: PRONTO PARA APRESENTAÇÃO!**

### ✅ **Todas as Integrações Implementadas:**

- **🔐 ZKVerify**: ✅ Conectividade e provas funcionando
- **📝 Smart Contract**: ✅ Deploy e testes passando
- **🏗️ Sistema de Roles**: ✅ DDD e RBAC implementados
- **🔗 Frontend-Contrato**: ✅ Viem + TypeScript integrado
- **💾 Persistência**: ✅ Supabase ↔ Blockchain sincronizado
- **📚 Documentação**: ✅ Completa e atualizada
- **🆕 Client-side ZK**: ✅ **TRANSAÇÃO REAL CONFIRMADA!**

### 🚀 **DEPLOY SUCESSO - CONTRATO LOANMANAGER**

#### 📋 **Detalhes do Contrato:**
- **Nome**: `LoanManager`
- **Endereço**: `0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13`
- **Rede**: Sepolia Testnet (Chain ID: 11155111)
- **Status**: ✅ **DEPLOYADO E VERIFICADO**

#### 🔗 **Links do Contrato:**
- **Etherscan**: https://sepolia.etherscan.io/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13
- **Sourcify**: https://sepolia.sourcify.dev/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13

#### 📅 **Informações do Deploy:**
- **Data**: 25 de Julho de 2025
- **Hora**: 23:05:53 (UTC-3)
- **Custo**: 0.000001624967444464 ETH (muito baixo)
- **Gas**: 1,581,286 gas

### 🔐 **INTEGRAÇÃO ZKVERIFY - 100% FUNCIONAL**

#### ✅ **Status dos Testes:**
- **Conectividade RPC**: ✅ 14+ peers ativos
- **Geração de Provas ZK**: ✅ SnarkJS funcionando perfeitamente
- **Submissão de Provas**: ✅ **PROVA SUBMETIDA E FINALIZADA!**

#### 🔗 **Transação de Sucesso:**
- **Block Hash**: `0x2a6d4e840c2fdeb67db6f62c3620269b023c3d8d81a858aa2ce31dd85b827907`
- **Transaction Hash**: `0x8b190dff059ac4b9c39449c2a37ec904ad8419554b6b3f50cd1f6463307e8977`
- **Test ID**: `1753499524455-9b3c8db76f3d7f0d`
- **Score**: 805, Threshold: 705
- **Taxa**: 0.02393157714 tVFY

#### 🔗 **Link da Transação no ZKVerify:**
https://zkverify-testnet.subscan.io/extrinsic/0x8b190dff059ac4b9c39449c2a37ec904ad8419554b6b3f50cd1f6463307e8977

### 🏆 **NOVA: IMPLEMENTAÇÃO 100% CLIENT-SIDE ZK - SUCESSO HISTÓRICO!**

#### ✅ **Transação ZK 100% Client-Side:**
- **Status**: ✅ **SUCESSO TOTAL - TRANSAÇÃO CONFIRMADA!**
- **TX Hash**: `0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183`
- **Block**: 1719350
- **Explorer**: [https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183](https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183)
- **Conquista**: **Transação ZK gerada no navegador e enviada diretamente à blockchain!**

### 🚀 **Comandos para Demonstração:**

```bash
# 1. Teste de conectividade ZKVerify
node zk-credit/scripts/test-zkverify-rpc.js

# 2. Teste de provas ZK
node zk-credit/scripts/test-zkverify-proof.js

# 3. Teste de integração completa
node test_integration_complete.js

# 4. Teste do smart contract
cd foundry && forge test -vv

# 5. 🆕 NOVA: Teste da implementação client-side ZK
cd client && npm run dev
# Acesse: http://localhost:8080/zk-proof-test
```

### 🌐 **Deploy:**

## Landing Page: https://zkfinance.framer.website

## Web App: https://zkfinance.netlify.app

## Production domain: https://zkfinance.com.br - **Em configuração (ainda não acessível)**

```bash
# Build do cliente para produção
cd client
npm run build

# Deploy no Netlify (apenas frontend)
# O arquivo netlify.toml já está configurado

# Deploy do Smart Contract na Sepolia
cd foundry
./scripts/deploy_sepolia.sh
```

### 🎯 **Fluxo Completo Funcionando:**

```
Frontend → API → zk-credit → ZKVerify → Smart Contract → Supabase → Frontend
```

**🆕 NOVA: Client-side ZK funcionando independentemente!**

**🏆 PROJETO ZKFINANCE 100% PRONTO PARA APRESENTAÇÃO AOS DONOS DA EMPRESA! 🚀**

---

## 🧪 Próximos Passos

Veja o [ENTREGA.md](ENTREGA.md) para detalhes sobre o cronograma e próximos passos.

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

Desenvolvido por **Felipe Segall**, **Fêlix Rock Rodrigues**, **Paulo Marinato**, **Laura Eckert** com foco em soluções de impacto social e privacidade usando tecnologias Web3 e ZK Proofs.

---

## 🔗 Links Úteis

### 🌐 **Aplicação:**
- **Web App**: https://zkfinance.netlify.app
- **Landing Page**: https://zkfinance.framer.website
- **Domínio Principal**: https://zkfinance.com.br - **Em configuração (ainda não acessível)**

### 🔗 **Blockchain & Smart Contracts:**
- **Etherscan Sepolia**: https://sepolia.etherscan.io/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13
- **Sourcify**: https://sepolia.sourcify.dev/address/0xE745DF76c8AbEf6ce158aee5fba1734ABd91CA13

### 🔐 **ZKVerify Integration:**
- **Transação de Sucesso**: https://zkverify-testnet.subscan.io/extrinsic/0x8b190dff059ac4b9c39449c2a37ec904ad8419554b6b3f50cd1f6463307e8977
- **🆕 NOVA: Client-side ZK**: https://zkverify-testnet.subscan.io/extrinsic/0xf345bcd404f1540a730d1def639f17db78e982c8591e5639a200e6cb4b221183
- **ZKVerify Website**: https://zkverify.io/

### 📚 **Documentação:**
- [Documentação Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Foundry Book](https://book.getfoundry.sh/)
- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS](https://github.com/iden3/snarkjs)
- [zkverifyjs](https://docs.zkverify.io/)
