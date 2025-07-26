# 🗄️ `supabase/` Module — Backend with PostgreSQL, Auth and Edge Functions

This module represents the complete backend of the ZKFinance application, using the Supabase stack with PostgreSQL, modern authentication, RLS policies, and serverless functions.

---

## 🧱 Structure

```
supabase/
├── config.toml                    # Supabase CLI project configuration
├── migrations/                    # SQL scripts for structure, roles and RLS
│   ├── 20240425000000_initial_consolidated.sql  # Complete initial schema
│   ├── 20240425000000_drop_all_custom.sql       # Cleanup script
│   └── 20240425000001_add_collaterals_table.sql # Collaterals table
├── edge-functions/               # Serverless functions (prepared for ZK)
│   └── blockchain/
│       ├── evm/
│       │   └── loan.ts           # Future: loan validation
│       └── zkverify/
│           └── verifyCreditProof.ts # Future: ZK verification
└── functions/                    # Supabase Functions
    └── wallet-auth/
        └── index.ts              # Future: Web3 authentication
```

---

## 🔐 Current Authentication

The system uses **Supabase Auth** with:

- **Email/Password** - Traditional authentication
- **Google OAuth** - Social login
- **MetaMask** - Prepared for Web3 integration

### Authentication Flow
1. User registers via email/password or Google
2. Profile is automatically created in the `profiles` table
3. Default role is assigned (`user`)
4. User is redirected to role selection

---

## 🧮 Database Schema

### Main Tables

#### `profiles`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key (user_id)      |
| email         | text      | User email                 |
| full_name     | text      | Full name                  |
| avatar_url    | text      | Avatar URL                 |
| wallet_address| text      | Wallet address             |
| created_at    | timestamp | Creation date              |
| updated_at    | timestamp | Update date                |

#### `user_roles`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key                |
| user_id       | uuid      | FK to profiles.id          |
| role          | app_role  | User role                  |
| created_at    | timestamp | Creation date              |

#### `loans`
| Field            | Type      | Description                |
|------------------|-----------|----------------------------|
| id               | uuid      | Primary key                |
| borrower_id      | uuid      | FK to profiles.id          |
| title            | text      | Bid title                  |
| description      | text      | Detailed description       |
| amount           | numeric   | Requested amount           |
| interest_rate    | numeric   | Interest rate (%)          |
| term_months      | integer   | Term in months             |
| category         | text      | Loan category              |
| status           | text      | Current status             |
| deadline         | timestamp | Deadline date              |
| created_at       | timestamp | Creation date              |

#### `investments`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key                |
| loan_id       | uuid      | FK to loans.id             |
| investor_id   | uuid      | FK to profiles.id          |
| amount        | numeric   | Invested amount            |
| created_at    | timestamp | Creation date              |

#### `transactions`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key                |
| loan_id       | uuid      | FK to loans.id             |
| from_user_id  | uuid      | FK to profiles.id          |
| to_user_id    | uuid      | FK to profiles.id          |
| amount        | numeric   | Transaction amount         |
| type          | text      | Transaction type           |
| status        | text      | Transaction status         |
| created_at    | timestamp | Creation date              |

#### `documents`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key                |
| loan_id       | uuid      | FK to loans.id             |
| user_id       | uuid      | FK to profiles.id          |
| title         | text      | Document title             |
| file_url      | text      | File URL                   |
| type          | text      | Document type              |
| created_at    | timestamp | Creation date              |

#### `collaterals`
| Field         | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | uuid      | Primary key                |
| loan_id       | uuid      | FK to loans.id             |
| type          | text      | Collateral type            |
| value         | numeric   | Collateral value           |
| description   | text      | Collateral description     |
| created_at    | timestamp | Creation date              |

---

## 🔐 Role System (RBAC)

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

### Roles and Permissions
- **admin** - Complete system access
- **moderator** - Content moderation
- **user** - Basic user
- **lender** - Investor/Financier
- **borrower** - Entrepreneur/Applicant
- **visitor** - Limited access

---

## 🔐 Row Level Security (RLS)

### Implemented Policies

#### `profiles`
- Users can only read their own profile
- Admins can read all profiles
- Users can only update their own profile

#### `loans`
- Entrepreneurs can read/create their own bids
- Investors can read all active bids
- Admins can read all bids

#### `investments`
- Investors can read their own contributions
- Entrepreneurs can read contributions to their bids
- Admins can read all contributions

---

## ⚙️ PostgreSQL Functions

### `handle_new_user()`
- Trigger that automatically creates profile
- Assigns default role (`user`)
- Configures RLS for the new user

### `get_user_roles(user_id)`
- Returns all roles of a user
- Used for permission verification

### `update_wallet_address(user_id, wallet_address)`
- Updates wallet address
- Validates address format

---

## 🔄 Active Integrations

| Integration   | Status | Description |
|---------------|--------|-------------|
| Supabase Auth | ✅ **Active** | Authentication and sessions |
| PostgreSQL    | ✅ **Active** | Main database |
| RLS           | ✅ **Active** | Data security |
| Edge Functions| 🔄 **Prepared** | Serverless functions |

---

## 🔄 Future Integrations

| Integration   | Status | Description |
|---------------|--------|-------------|
| ZKVerify      | 🔄 **Planned** | ZK proof verification |
| Web3 Auth     | 🔄 **Planned** | Wallet authentication |
| N8N Agent     | 🔄 **Planned** | Credit analysis |

---

## 📦 Supabase CLI

### Useful Commands

```bash
# Start Supabase locally
supabase start

# Apply migrations
supabase db push

# Deploy edge functions
supabase functions deploy

# Generate TypeScript types
supabase gen types typescript --local > shared/supabase/types.ts
```

### Local Configuration

```bash
# Login to Supabase
supabase login

# Link with remote project
supabase link --project-ref <ref>

# Start local environment
supabase start
```

---

## 🧪 Edge Functions (Prepared)

### `verifyCreditProof.ts`
- **Status**: Prepared for implementation
- **Function**: Verify ZK credit proofs
- **Integration**: ZKVerify API

### `loan.ts`
- **Status**: Prepared for implementation  
- **Function**: Loan validation
- **Integration**: Smart contracts

---

## 📊 Sample Data

The project includes sample data for demonstration:

```sql
-- Insert admin user
INSERT INTO profiles (id, email, full_name) 
VALUES ('admin-uuid', 'admin@zkfinance.com', 'Admin User');

INSERT INTO user_roles (user_id, role) 
VALUES ('admin-uuid', 'admin');

-- Insert sample bid
INSERT INTO loans (borrower_id, title, description, amount, interest_rate, term_months, category, status)
VALUES ('user-uuid', 'Company Expansion', 'I need capital to expand...', 50000, 12.5, 24, 'business', 'active');
```

---

## 🔒 Security

### Authentication
- Secure JWT tokens
- Automatic refresh tokens
- Sessions managed by Supabase

### Data
- Encryption in transit (HTTPS)
- Encryption at rest
- Strict RLS policies

### Audit
- Logs of all operations
- Change history
- Automatic backup

---

## 🧠 Notes

- Edge functions use Deno, not Node.js
- Secrets are managed in the Supabase dashboard
- Data is protected by custom RLS policies
- The system is prepared for scalability

---

> Developed as part of ZKFinance by Felipe Segall 