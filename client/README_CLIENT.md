# 🖥️ Módulo `client/` — Interface React + Supabase

Este módulo é a interface principal do usuário para a plataforma ZKFinance. Ele permite que empreendedores solicitem financiamento através de lances, investidores visualizem oportunidades e todos interajam com o sistema de forma integrada com Supabase e RBAC.

---

## ⚙️ Tecnologias Utilizadas

- [React 18](https://reactjs.org/) com TypeScript
- [Vite](https://vitejs.dev/) para build e desenvolvimento
- [React Router DOM](https://reactrouter.com/) para navegação
- [React Query](https://tanstack.com/query/latest) para gerenciamento de estado
- [ShadCN/UI](https://ui.shadcn.dev/) para design system
- [Supabase JS SDK](https://supabase.com/docs/guides/api) para autenticação e banco
- [TailwindCSS](https://tailwindcss.com/) para estilização
- **Futuro**: Integração com Viem para Web3 e ZKVerify para provas

---

## 📁 Estrutura

```
client/
├── components/          # Componentes UI (shadcn/ui)
│   └── ui/             # Componentes base (Button, Input, etc)
├── pages/              # Páginas da aplicação
│   ├── Login.tsx       # Autenticação
│   ├── Register.tsx    # Cadastro
│   ├── UserSelection.tsx # Seleção de role
│   ├── BorrowerDashboard.tsx # Dashboard do empreendedor
│   ├── InvestorDashboard.tsx # Dashboard do investidor
│   ├── AdminDashboard.tsx # Dashboard administrativo
│   ├── BorrowerLances.tsx # Lista de lances do empreendedor
│   ├── CreateLance.tsx # Criação de novo lance
│   └── ...             # Outras páginas
├── hooks/              # Custom hooks
│   ├── useAuth.tsx     # Hook de autenticação
│   ├── useRBAC.tsx     # Hook de controle de acesso
│   ├── useMyLoans.ts   # Hook para buscar empréstimos
│   └── useCreateLoan.ts # Hook para criar empréstimos
├── contexts/           # Context providers
│   └── AuthContext.tsx # Contexto de autenticação
├── lib/                # Utilitários
│   ├── utils.ts        # Funções auxiliares
│   └── supabase/       # Cliente Supabase
└── global.css          # Estilos globais
```

---

## 🧠 Fluxos Principais

### Cadastro e Autenticação
- Usuário se registra via email/password ou Google OAuth
- Autenticação é gerenciada pelo Supabase Auth
- Perfil é salvo na tabela `profiles` com role padrão
- Redirecionamento para `/user-selection` após login

### Seleção de Role
- Usuário escolhe entre Empreendedor, Investidor ou Admin
- Role é salvo na tabela `user_roles`
- Interface se adapta ao role selecionado
- Navegação para dashboard específico

### Criação de Lances (Empreendedor)
- Formulário multi-step para criação de solicitação
- Dados são salvos na tabela `loans`
- Validação client-side e server-side
- Integração com React Query para cache

### Visualização de Oportunidades (Investidor)
- Lista de lances disponíveis
- Filtros e busca
- Detalhes de cada lance
- Preparado para futura integração com investimentos

---

## 🔗 Integrações Atuais

| Serviço         | Status | Descrição |
|----------------|--------|-----------|
| Supabase Auth   | ✅ **Ativo** | Autenticação com email/password e Google |
| Supabase DB     | ✅ **Ativo** | PostgreSQL com RLS e migrations |
| React Query     | ✅ **Ativo** | Cache e gerenciamento de estado |
| shadcn/ui       | ✅ **Ativo** | Componentes UI modernos |
| MetaMask        | 🔄 **Preparado** | Wallet connection (UI pronta) |

---

## 🔄 Integrações Futuras

| Serviço         | Status | Descrição |
|----------------|--------|-----------|
| Viem            | 🔄 **Planejado** | Interações Web3 |
| zk-credit       | 🔄 **Planejado** | Geração de provas ZK |
| ZKVerify        | 🔄 **Planejado** | Verificação via API |
| N8N             | 🔄 **Planejado** | Análise de crédito |

---

## 📦 Scripts Disponíveis

```bash
npm run dev         # Inicia app localmente (http://localhost:8080)
npm run build       # Build para produção
npm run preview     # Preview do build
```

---

## 🔧 Configuração

### Variáveis de Ambiente
O projeto espera um arquivo `.env` na raiz com:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Banco de Dados
As migrations do Supabase devem ser aplicadas:
```bash
supabase db push
```

---

## 🎨 Design System

### Temas
- **Dark/Light Mode** com toggle automático
- **Cores consistentes** usando CSS variables
- **Contrastes otimizados** para acessibilidade

### Componentes
- **shadcn/ui** para componentes base
- **Tailwind CSS** para customização
- **Responsividade** completa

---

## 🔐 Autenticação e RBAC

### Roles Disponíveis
- `admin` - Acesso completo ao sistema
- `lender` - Investidor/Financiador
- `borrower` - Empreendedor/Solicitante
- `moderator` - Moderador de conteúdo
- `user` - Usuário básico
- `visitor` - Acesso limitado

### Controle de Acesso
- **useRBAC** hook para verificação de permissões
- **RLS** no Supabase para segurança server-side
- **Redirecionamento** automático baseado em role

---

## 📱 Páginas Principais

### Autenticação
- `/login` - Login com email/password e Google
- `/register` - Cadastro de novos usuários
- `/user-selection` - Seleção de role após login

### Dashboards
- `/borrower/dashboard` - Dashboard do empreendedor
- `/investor/dashboard` - Dashboard do investidor
- `/admin` - Dashboard administrativo

### Funcionalidades
- `/borrower/lances` - Lista de lances do usuário
- `/borrower/create-lance` - Criação de novo lance
- `/investor/ranking` - Ranking de investidores
- `/investor/contributions` - Contribuições do investidor

### Utilitários
- `/settings` - Configurações do usuário
- `/wallet` - Gestão de carteira
- `/support` - Suporte ao usuário

---

## 🧪 Desenvolvimento

### Hot Module Replacement (HMR)
O projeto usa Vite com HMR ativo para desenvolvimento rápido.

### TypeScript
Tipos completos para Supabase e componentes UI.

### Linting
ESLint configurado para React e TypeScript.

---

## 📌 Observações

- O sistema está preparado para integração futura com Web3
- Os dados de exemplo (mock) são usados para demonstração
- A autenticação com MetaMask está preparada mas não implementada
- O sistema de provas ZK será integrado em módulos futuros

---

## 🔒 Privacidade

- Dados sensíveis são protegidos por RLS
- Autenticação segura via Supabase
- Preparado para provas ZK para preservação de privacidade

---

> Desenvolvido como parte do ZKFinance por Felipe Segall