# 🗄️ Módulo `supabase/` — Backend com PostgreSQL, Auth e Edge Functions 

Este módulo representa o backend completo da aplicação ZKFinance, utilizando a stack do Supabase com PostgreSQL, autenticação moderna, políticas RLS e funções serverless.

---

## 🧱 Estrutura

```
supabase/
├── config.toml                    # Configurações do projeto Supabase CLI
├── migrations/                    # Scripts SQL para estrutura, roles e RLS
│   ├── 20240425000000_initial_consolidated.sql  # Schema completo inicial
│   ├── 20240425000000_drop_all_custom.sql       # Script de limpeza
│   └── 20240425000001_add_collaterals_table.sql # Tabela de colaterais
├── edge-functions/               # Funções serverless (preparadas para ZK)
│   └── blockchain/
│       ├── evm/
│       │   └── loan.ts           # Futuro: validação de empréstimos
│       └── zkverify/
│           └── verifyCreditProof.ts # Futuro: verificação ZK
└── functions/                    # Funções Supabase Functions
    └── wallet-auth/
        └── index.ts              # Futuro: autenticação Web3
```

---

## 🔐 Autenticação Atual

O sistema utiliza **Supabase Auth** com:

- **Email/Password** - Autenticação tradicional
- **Google OAuth** - Login social
- **MetaMask** - Preparado para integração Web3

### Fluxo de Autenticação
1. Usuário se registra via email/password ou Google
2. Perfil é criado automaticamente na tabela `profiles`
3. Role padrão é atribuído (`user`)
4. Usuário é redirecionado para seleção de role

---

## 🧮 Schema de Banco de Dados

### Tabelas Principais

#### `profiles`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key (user_id)    |
| email        | text      | Email do usuário         |
| full_name    | text      | Nome completo            |
| avatar_url   | text      | URL do avatar            |
| wallet_address| text     | Endereço da carteira     |
| created_at   | timestamp | Data de criação          |
| updated_at   | timestamp | Data de atualização      |

#### `user_roles`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| user_id      | uuid      | FK para profiles.id      |
| role         | app_role  | Role do usuário          |
| created_at   | timestamp | Data de criação          |

#### `loans`
| Campo           | Tipo      | Descrição                |
|-----------------|-----------|--------------------------|
| id              | uuid      | Primary key              |
| borrower_id     | uuid      | FK para profiles.id      |
| title           | text      | Título do lance          |
| description     | text      | Descrição detalhada      |
| amount          | numeric   | Valor solicitado         |
| interest_rate   | numeric   | Taxa de juros (%)        |
| term_months     | integer   | Prazo em meses           |
| category        | text      | Categoria do empréstimo  |
| status          | text      | Status atual             |
| deadline        | timestamp | Data limite              |
| created_at      | timestamp | Data de criação          |

#### `investments`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| loan_id      | uuid      | FK para loans.id         |
| investor_id  | uuid      | FK para profiles.id      |
| amount       | numeric   | Valor investido          |
| created_at   | timestamp | Data de criação          |

#### `transactions`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| loan_id      | uuid      | FK para loans.id         |
| from_user_id | uuid      | FK para profiles.id      |
| to_user_id   | uuid      | FK para profiles.id      |
| amount       | numeric   | Valor da transação       |
| type         | text      | Tipo da transação        |
| status       | text      | Status da transação      |
| created_at   | timestamp | Data de criação          |

#### `documents`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| loan_id      | uuid      | FK para loans.id         |
| user_id      | uuid      | FK para profiles.id      |
| title        | text      | Título do documento      |
| file_url     | text      | URL do arquivo           |
| type         | text      | Tipo do documento        |
| created_at   | timestamp | Data de criação          |

#### `collaterals`
| Campo        | Tipo      | Descrição                |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| loan_id      | uuid      | FK para loans.id         |
| type         | text      | Tipo de colateral        |
| value        | numeric   | Valor do colateral       |
| description  | text      | Descrição do colateral   |
| created_at   | timestamp | Data de criação          |

---

## 🔐 Sistema de Roles (RBAC)

### Enum `app_role`
```sql
CREATE TYPE app_role AS ENUM (
  'admin',
  'moderator', 
  'user',
  'lender',
  'borrower',
  'visitor'
);
```

### Roles e Permissões
- **admin** - Acesso completo ao sistema
- **moderator** - Moderação de conteúdo
- **user** - Usuário básico
- **lender** - Investidor/Financiador
- **borrower** - Empreendedor/Solicitante
- **visitor** - Acesso limitado

---

## 🔐 Row Level Security (RLS)

### Políticas Implementadas

#### `profiles`
- Usuários podem ler apenas seu próprio perfil
- Admins podem ler todos os perfis
- Usuários podem atualizar apenas seu próprio perfil

#### `loans`
- Empreendedores podem ler/criar seus próprios lances
- Investidores podem ler todos os lances ativos
- Admins podem ler todos os lances

#### `investments`
- Investidores podem ler suas próprias contribuições
- Empreendedores podem ler contribuições para seus lances
- Admins podem ler todas as contribuições

---

## ⚙️ Funções PostgreSQL

### `handle_new_user()`
- Trigger que cria perfil automaticamente
- Atribui role padrão (`user`)
- Configura RLS para o novo usuário

### `get_user_roles(user_id)`
- Retorna todos os roles de um usuário
- Usado para verificação de permissões

### `update_wallet_address(user_id, wallet_address)`
- Atualiza endereço da carteira
- Valida formato do endereço

---

## 🔄 Integrações Ativas

| Integração    | Status | Descrição |
|---------------|--------|-----------|
| Supabase Auth | ✅ **Ativo** | Autenticação e sessões |
| PostgreSQL    | ✅ **Ativo** | Banco de dados principal |
| RLS           | ✅ **Ativo** | Segurança de dados |
| Edge Functions| 🔄 **Preparado** | Funções serverless |

---

## 🔄 Integrações Futuras

| Integração    | Status | Descrição |
|---------------|--------|-----------|
| ZKVerify      | 🔄 **Planejado** | Verificação de provas ZK |
| Web3 Auth     | 🔄 **Planejado** | Autenticação com carteiras |
| N8N Agent     | 🔄 **Planejado** | Análise de crédito |

---

## 📦 Supabase CLI

### Comandos Úteis

```bash
# Iniciar Supabase local
supabase start

# Aplicar migrations
supabase db push

# Deploy edge functions
supabase functions deploy

# Gerar tipos TypeScript
supabase gen types typescript --local > shared/supabase/types.ts
```

### Configuração Local

```bash
# Login no Supabase
supabase login

# Link com projeto remoto
supabase link --project-ref <ref>

# Iniciar ambiente local
supabase start
```

---

## 🧪 Edge Functions (Preparadas)

### `verifyCreditProof.ts`
- **Status**: Preparado para implementação
- **Função**: Verificar provas ZK de crédito
- **Integração**: ZKVerify API

### `loan.ts`
- **Status**: Preparado para implementação  
- **Função**: Validação de empréstimos
- **Integração**: Contratos inteligentes

---

## 📊 Dados de Exemplo

O projeto inclui dados de exemplo para demonstração:

```sql
-- Inserir usuário admin
INSERT INTO profiles (id, email, full_name) 
VALUES ('admin-uuid', 'admin@zkfinance.com', 'Admin User');

INSERT INTO user_roles (user_id, role) 
VALUES ('admin-uuid', 'admin');

-- Inserir lance de exemplo
INSERT INTO loans (borrower_id, title, description, amount, interest_rate, term_months, category, status)
VALUES ('user-uuid', 'Expansão da Empresa', 'Preciso de capital para expandir...', 50000, 12.5, 24, 'business', 'active');
```

---

## 🔒 Segurança

### Autenticação
- JWT tokens seguros
- Refresh tokens automáticos
- Sessões gerenciadas pelo Supabase

### Dados
- Criptografia em trânsito (HTTPS)
- Criptografia em repouso
- Políticas RLS rigorosas

### Auditoria
- Logs de todas as operações
- Histórico de mudanças
- Backup automático

---

## 🧠 Observações

- As funções edge usam Deno, não Node.js
- As secrets são gerenciadas no painel do Supabase
- Os dados são protegidos por políticas RLS personalizadas
- O sistema está preparado para escalabilidade

---

> Desenvolvido como parte do ZKFinance por Felipe Segall
