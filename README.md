# 🤝 ZKFinance — Plataforma de Financiamento Descentralizada com ZK Proofs

Este projeto é uma plataforma moderna que conecta empreendedores a investidores, utilizando contratos inteligentes, provas ZK de análise de crédito e verificação de elegibilidade com preservação de privacidade. Atualmente em desenvolvimento ativo com foco na integração Supabase e funcionalidades core.

---

## 🧱 Arquitetura Modular

| Módulo             | Status | Descrição |
|--------------------|--------|-----------|
| [`client/`](client/README_CLIENT.md) | ✅ **Ativo** | Aplicação React com autenticação Supabase, RBAC e UI moderna. Funcionalidades de criação de lances e dashboards implementadas. |
| [`supabase/`](supabase/README_SUPABASE.md) | ✅ **Ativo** | Backend com PostgreSQL, autenticação Web3, RLS e edge functions. Schema completo implementado. |
| [`foundry/`](foundry/README.md) | ✅ **Implementado** | Contratos inteligentes para empréstimos e financiamento. Contrato LoanManager.sol implementado e testado. |
| [`zk-credit/`](zk-credit/README.md) | ✅ **Implementado** | Circuitos Circom e provas ZK para análise de crédito. Circuito credit_score.circom implementado. |
| [`credit-agent/`](credit-agent/README-credit-agent.md) | ✅ **Implementado** | Agente de análise de crédito usando N8N. Workflow funcional hospedado e testado. |

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

---

## 🔁 Fluxo Atual da Plataforma

1. **Cadastro/Autenticação**: Usuário se registra via Supabase Auth
2. **Seleção de Role**: Escolhe entre Empreendedor, Investidor ou Admin
3. **Dashboard Personalizado**: Interface adaptada ao role do usuário
4. **Criação de Lances**: Empreendedores criam solicitações de financiamento
5. **Visualização**: Investidores veem oportunidades disponíveis
6. **Gestão**: Admins controlam usuários e sistema

## 🔁 Fluxo Completo (Módulos Implementados)

1. **Análise de Crédito**: credit-agent (N8N) calcula score do usuário
2. **Geração de Prova ZK**: zk-credit gera prova de que score ≥ threshold
3. **Verificação ZKVerify**: Prova validada na blockchain ZKVerify Volta
4. **Smart Contract**: foundry registra empréstimo validado na blockchain
5. **Financiamento**: Investidores podem financiar via contrato inteligente

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
└── netlify/               # Deploy configuration
```

---

## 🧪 Próximos Passos

### 🔄 Em Desenvolvimento
- [ ] Integração dos módulos implementados com o frontend
- [ ] Sistema de pagamentos e transações
- [ ] Deploy dos contratos em produção
- [ ] Configuração do agente de crédito em produção

### 🔮 Roadmap
- [ ] Deploy em produção
- [ ] Integração com múltiplas blockchains
- [ ] Sistema de reputação
- [ ] Analytics e relatórios
- [ ] API pública para integrações

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
