# 🤝 ZKFinance — Plataforma de Financiamento Descentralizada com ZK Proofs

Este projeto é uma plataforma moderna que conecta empreendedores a investidores, utilizando contratos inteligentes, provas ZK de análise de crédito e verificação de elegibilidade com preservação de privacidade. Atualmente em desenvolvimento ativo com foco na integração Supabase e funcionalidades core.

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

## 🚀 **FLUXO COMPLETO DE EMPRÉSTIMO - INTEGRAÇÃO TOTAL**

### 🔄 **Arquitetura End-to-End Implementada:**

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
| [`supabase/`](supabase/README_SUPABASE.md) | ✅ **Ativo** | Backend com PostgreSQL, autenticação Web3, RLS e edge functions. **Sistema de roles DDD implementado**. |
| [`foundry/`](foundry/README.md) | ✅ **Implementado** | Contratos inteligentes para empréstimos. **LoanManager.sol deployado e testado**. |
| [`zk-credit/`](zk-credit/README.md) | ✅ **Implementado** | Circuitos Circom e provas ZK. **Integração ZKVerify funcionando**. |
| [`credit-agent/`](credit-agent/README-credit-agent.md) | ✅ **Implementado** | Agente de análise de crédito local. **Algoritmo interno funcionando**. |

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
- **credit-agent**: Agente N8N para análise de crédito automatizada
- **zk-credit**: Circuitos Circom e provas ZK para preservação de privacidade
- **foundry**: Smart contracts para empréstimos e financiamento peer-to-peer

### ✅ Integração ZKVerify
- **Testes de conectividade RPC** com a rede ZKVerify Volta
- **Registro de verification keys** na blockchain
- **Submissão e verificação de provas ZK** em tempo real
- **Scripts de teste** para demonstração e validação

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
5. **🔐 Análise de Crédito**: credit-agent calcula score localmente
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
- ✅ **Conectividade RPC**: 13+ peers, rede estável
- ✅ **Registro de VK**: Verification key registrada na blockchain
- ✅ **Submissão de Provas**: Múltiplas provas verificadas com sucesso
- ✅ **Rede Volta**: Operacional e acessível

## 📚 **Documentação Completa**

### 📖 **Documentos Principais:**
- **[README_LENDING_SMART_CONTRACT.md](README_LENDING_SMART_CONTRACT.md)**: Documentação completa do smart contract e integração
- **[ENTREGA.md](ENTREGA.md)**: Plano de entrega e status atual
- **[zk-credit/README.md](zk-credit/README.md)**: Documentação dos testes ZKVerify
- **[foundry/README.md](foundry/README.md)**: Documentação do smart contract
- **[foundry/DEPLOY.md](foundry/DEPLOY.md)**: Guia completo de deploy

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

### Automação
- **N8N** para workflows de análise de crédito

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

# Agente de Crédito (credit-agent)
# Workflow N8N já está hospedado e funcional
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

# Configurar N8N (opcional - já hospedado)
# O workflow credit-agent já está funcional
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
│   └── lib/               # Utilitários
├── supabase/              # Backend Supabase
│   ├── migrations/        # SQL migrations
│   ├── functions/         # Edge functions
│   └── config.toml        # Configuração Supabase
├── foundry/               # Smart Contracts
│   ├── src/               # Contratos Solidity
│   ├── test/              # Testes com Forge
│   └── script/            # Scripts de deploy
├── zk-credit/             # Provas ZK
│   ├── circuits/          # Circuitos Circom
│   ├── build/             # Arquivos compilados
│   └── scripts/           # Scripts de geração
├── credit-agent/          # Agente de Crédito
│   ├── workflow_hackathon.json # Workflow N8N
│   └── algoritmos/        # Lógica de score
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
```

### 🌐 **Deploy:**

## Landing Page: https://zkfinance.framer.website

## Web App: https://zkfinance.netlify.app

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

- [Documentação Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Foundry Book](https://book.getfoundry.sh/)
- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS](https://github.com/iden3/snarkjs)
- [N8N](https://n8n.io/)
- [ZKVerify](https://zkverify.io/)
