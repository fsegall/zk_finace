# 🤝 ZKFinance — Decentralized Financing Platform with ZK Proofs

This project is a modern platform that connects entrepreneurs to investors, using smart contracts, ZK proofs for credit analysis, and eligibility verification with privacy preservation. Currently under active development with focus on Supabase integration and core functionalities.

## 🚀 **COMPLETE LOAN FLOW - TOTAL INTEGRATION**

### 🔄 **Implemented End-to-End Architecture:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│  Local API  │───▶│ zk-credit   │───▶│  ZKVerify   │───▶│Smart Contract│
│   (React)   │    │  (Node.js)  │    │ (ZK Proof)  │    │ (Blockchain)│    │  (Foundry)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │                   │
       │                   │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Supabase  │◀───│   Viem      │◀───│  SnarkJS    │◀───│  Volta      │◀───│  Sepolia    │
│  (PostgreSQL)│    │ (Web3 Client)│    │ (ZK Proofs) │    │ (Testnet)   │    │ (Testnet)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### 🎯 **Detailed Flow:**

1. **👤 User (Borrower)** → React Frontend
2. **📝 Frontend** → Local API (credit analysis)
3. **🔐 API** → zk-credit (ZK proof generation)
4. **🔍 zk-credit** → ZKVerify (blockchain verification)
5. **📋 ZKVerify** → Smart Contract (loan creation)
6. **💾 Smart Contract** → Supabase (data persistence)
7. **🔄 Supabase** → Frontend (interface update)

### ✅ **Integration Status:**

- **🔐 ZKVerify**: ✅ RPC connectivity (13+ peers), verified proofs
- **📝 Smart Contract**: ✅ Local and Sepolia deploy, tests passing
- **🏗️ Role System**: ✅ DDD implemented, RBAC functional
- **🔗 Frontend-Contract Bridge**: ✅ Viem + TypeScript integrated
- **💾 Persistence**: ✅ Supabase ↔ Smart Contract synchronized

### 🧪 **Demo Commands:**

```bash
# ZKVerify connectivity test
node zk-credit/scripts/test-zkverify-rpc.js

# ZK proofs test
node zk-credit/scripts/test-zkverify-proof.js

# Complete integration test
node test_integration_complete.js

# Smart contract test
cd foundry && forge test -vv
```

---

## 🧱 Modular Architecture

### 📦 **Package.json Organization**

The project follows a well-organized modular architecture with specific dependencies for each module:

```
zkfinance/
├── package.json          ← Main project (server + scripts)
│   ├── Dependencies: Express, CORS, TypeScript, Vite
│   └── Scripts: dev, build:server, start, test, install:all
├── client/
│   └── package.json      ← Frontend React + UI (isolated for Netlify)
│       ├── Dependencies: React, Viem, Supabase, shadcn/ui
│       └── Scripts: dev, build, preview
├── zk-credit/
│   └── package.json      ← ZK-specific module
│       ├── Dependencies: Circom, SnarkJS, ZKVerifyJS
│       └── Scripts: setup, compile, generate, verify
└── foundry/
    └── lib/forge-std/    ← External dependency (not modified)
```

### ✅ **Architecture Benefits:**
- **Clear separation**: Each module has its specific dependencies
- **No duplication**: Dependencies organized by need
- **Maintainability**: Easy updates and management
- **Scalability**: New modules can be added independently
- **Isolated deploy**: Frontend can be deployed separately (Netlify)
- **Optimized build**: No timeout due to heavy dependencies

| Module             | Status | Description |
|--------------------|--------|-------------|
| [`client/`](client/README_CLIENT.md) | ✅ **Active** | React application with Supabase authentication, RBAC and modern UI. **Viem + Smart Contract integration implemented**. |
| [`supabase/`](supabase/README_SUPABASE.md) | ✅ **Active** | Backend with PostgreSQL, Web3 authentication, RLS and edge functions. **DDD role system implemented**. |
| [`foundry/`](foundry/README.md) | ✅ **Implemented** | Smart contracts for loans. **LoanManager.sol deployed and tested**. |
| [`zk-credit/`](zk-credit/README.md) | ✅ **Implemented** | Circom circuits and ZK proofs. **ZKVerify integration working**. |
| [`credit-agent/`](credit-agent/README-credit-agent.md) | ✅ **Implemented** | Local credit analysis agent. **Internal algorithm working**. |

---

## 🚀 Implemented Features

### ✅ Authentication and RBAC
- **Supabase Auth** with email/password and Google OAuth
- **Role-Based Access Control** (Admin, Lender, Borrower, Moderator, User, Visitor)
- **Wallet Connection** (MetaMask) integrated
- **User profiles** with dynamic data

### ✅ Modern Interface
- **Design System** with shadcn/ui and Tailwind CSS
- **Dark/Light Theme** with automatic toggle
- **Complete responsiveness** for mobile and desktop
- **Optimized contrasts** for accessibility

### ✅ Core Features
- **Entrepreneur Dashboard** with loan creation
- **Investor Dashboard** with opportunity visualization
- **Admin Dashboard** with user control
- **Loan System** (loan crowdfunding)
- **Multi-step forms** for loan creation
- **Complete navigation** between modules

### ✅ Integrated Backend
- **Complete schema** with tables: profiles, user_roles, loans, investments, documents, transactions, collaterals
- **Row Level Security (RLS)** implemented
- **PostgreSQL triggers and functions** for automation
- **Organized and versioned migrations**

### ✅ Specialized Modules
- **credit-agent**: N8N agent for automated credit analysis
- **zk-credit**: Circom circuits and ZK proofs for privacy preservation
- **foundry**: Smart contracts for loans and peer-to-peer financing

### ✅ ZKVerify Integration
- **RPC connectivity tests** with ZKVerify Volta network
- **Verification key registration** on blockchain
- **ZK proof submission and verification** in real-time
- **Test scripts** for demonstration and validation

### ✅ Smart Contract and Blockchain Integration
- **LoanManager Contract** deployed locally and on Sepolia
- **Viem Integration** for smart contract interaction
- **Frontend-Contract Bridge** with TypeScript
- **Supabase ↔ Smart Contract synchronization**
- **useLoanIntegration hook** for React

### ✅ Role System and DDD
- **Domain Driven Design** implemented
- **Role-Based Access Control** (RBAC) functional
- **Well-structured domain entities**
- **Robust persistence** with PostgreSQL

---

## 🔁 Complete Platform Flow (TOTAL INTEGRATION)

### 🎯 **Implemented End-to-End Flow:**

1. **👤 Registration/Authentication**: User registers via Supabase Auth
2. **🏷️ Role Selection**: Choose between Borrower, Investor or Admin
3. **📊 Personalized Dashboard**: Interface adapted to user role
4. **📝 Loan Creation**: Borrower submits credit data
5. **🔐 Credit Analysis**: credit-agent calculates score locally
6. **🔒 ZK Proof Generation**: zk-credit generates proof that score ≥ threshold
7. **🔍 ZKVerify Verification**: Proof validated on ZKVerify Volta blockchain
8. **📋 Smart Contract**: foundry registers validated loan on blockchain
9. **💾 Persistence**: Data synchronized with Supabase via Viem
10. **💰 Financing**: Investors can fund via smart contract
11. **🔄 Update**: Interface updated in real-time

### ✅ **Integration Status:**
- **Frontend ↔ API**: ✅ React + Node.js integrated
- **API ↔ zk-credit**: ✅ ZK proof generation working
- **zk-credit ↔ ZKVerify**: ✅ Blockchain verification active
- **ZKVerify ↔ Smart Contract**: ✅ Validated loan creation
- **Smart Contract ↔ Supabase**: ✅ Bidirectional persistence
- **Supabase ↔ Frontend**: ✅ Real-time interface update

## 🧪 ZKVerify Integration Tests

### Available Scripts
```bash
# RPC connectivity test
node zk-credit/scripts/test-zkverify-rpc.js

# Verification key registration (once only)
node zk-credit/scripts/register-circuit.js

# Proof submission test (multiple times)
node zk-credit/scripts/test-zkverify-proof.js

# ZK artifacts build
bash zk-credit/scripts/setup.sh
```

### Test Status
- ✅ **RPC Connectivity**: 13+ peers, stable network
- ✅ **VK Registration**: Verification key registered on blockchain
- ✅ **Proof Submission**: Multiple proofs successfully verified
- ✅ **Volta Network**: Operational and accessible

## 📚 **Complete Documentation**

### 📖 **Main Documents:**
- **[README_LENDING_SMART_CONTRACT.md](README_LENDING_SMART_CONTRACT.md)**: Complete smart contract and integration documentation
- **[ENTREGA.md](ENTREGA.md)**: Delivery plan and current status
- **[zk-credit/README.md](zk-credit/README.md)**: ZKVerify test documentation
- **[foundry/README.md](foundry/README.md)**: Smart contract documentation
- **[foundry/DEPLOY.md](foundry/DEPLOY.md)**: Complete deployment guide

### 🧪 **Test Scripts:**
- **`test_integration_complete.js`**: End-to-end integration test
- **`zk-credit/scripts/test-zkverify-rpc.js`**: Connectivity test
- **`zk-credit/scripts/test-zkverify-proof.js`**: ZK proofs test
- **`foundry/test/LoanManager.t.sol`**: Smart contract tests

---

## 🛠️ Current Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build and development
- **React Router DOM** for navigation
- **React Query** for state management
- **shadcn/ui** for components
- **Tailwind CSS** for styling

### Backend
- **Supabase** (PostgreSQL, Auth, RLS)
- **TypeScript** for type safety
- **Edge Functions** (prepared for ZK)

### Blockchain & ZK
- **Foundry** for smart contract development
- **Solidity** for smart contracts
- **Circom** for ZK circuits
- **SnarkJS** for proof generation and verification
- **ZKVerify** for proof verification

### Automation
- **N8N** for credit analysis workflows

### Development
- **ESLint** for linting
- **Prettier** for formatting
- **HMR** for fast development

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Build preview

# Supabase
supabase start       # Start local Supabase
supabase db push     # Apply migrations
supabase functions deploy # Deploy edge functions

# Smart Contracts (Foundry)
cd foundry
forge test           # Run tests
forge script scripts/DeployLoan.s.sol --rpc-url $SEPOLIA_RPC --private-key $KEY --broadcast

# ZK Proofs (zk-credit)
cd zk-credit
npm run setup        # Initial setup
npm run compile      # Compile circuits
npm run generate     # Generate proofs
npm run verify       # Verify proofs

# Credit Agent (credit-agent)
# N8N workflow already hosted and functional
```

---

## 🔧 Configuration

### 1. Installation
```bash
git clone <repository>
cd zkfinance_ui
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anonymous_key

# Blockchain (Foundry)
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_private_key

# ZKVerify (optional)
ZKVERIFY_API_KEY=your_zkverify_api_key
```

### 3. Database
```bash
# Apply migrations
supabase db push
```

### 4. Specialized Modules
```bash
# Install Foundry (if needed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install ZK dependencies
cd zk-credit
npm install

# Configure N8N (optional - already hosted)
# The credit-agent workflow is already functional
```

---

## 📁 Project Structure

```
zkfinance_ui/
├── client/                 # React Frontend
│   ├── components/         # UI Components
│   ├── pages/             # Application pages
│   ├── hooks/             # Custom hooks (useAuth, useRBAC, etc)
│   ├── contexts/          # Context providers
│   └── lib/               # Utilities
├── supabase/              # Supabase Backend
│   ├── migrations/        # SQL migrations
│   ├── functions/         # Edge functions
│   └── config.toml        # Supabase configuration
├── foundry/               # Smart Contracts
│   ├── src/               # Solidity contracts
│   ├── test/              # Forge tests
│   └── scripts/           # Deployment scripts
├── zk-credit/             # ZK Proofs
│   ├── circuits/          # Circom circuits
│   ├── build/             # Compiled files
│   └── scripts/           # Generation scripts
├── credit-agent/          # Credit Agent
│   ├── workflow_hackathon.json # N8N workflow
│   └── algorithms/        # Score logic
├── shared/                # Shared types
├── server/                # Local API (Node.js)
└── netlify.toml           # Client deployment config (Netlify)
```

---

## 🎉 **FINAL STATUS: READY FOR PRESENTATION!**

### ✅ **All Integrations Implemented:**

- **🔐 ZKVerify**: ✅ Connectivity and proofs working
- **📝 Smart Contract**: ✅ Deploy and tests passing
- **🏗️ Role System**: ✅ DDD and RBAC implemented
- **🔗 Frontend-Contract**: ✅ Viem + TypeScript integrated
- **💾 Persistence**: ✅ Supabase ↔ Blockchain synchronized
- **📚 Documentation**: ✅ Complete and updated

### 🚀 **Demo Commands:**

```bash
# 1. ZKVerify connectivity test
node zk-credit/scripts/test-zkverify-rpc.js

# 2. ZK proofs test
node zk-credit/scripts/test-zkverify-proof.js

# 3. Complete integration test
node test_integration_complete.js

# 4. Smart contract test
cd foundry && forge test -vv
```

### 🌐 **Deploy:**

## Landing Page: https://zkfinance.framer.website

## Web App: https://zkfinance.netlify.app

```bash
# Client build for production
cd client
npm run build

# Deploy to Netlify (frontend only)
# The netlify.toml file is already configured

# Smart Contract deploy on Sepolia
cd foundry
./scripts/deploy_sepolia.sh
```

### 🎯 **Complete Flow Working:**

```
Frontend → API → zk-credit → ZKVerify → Smart Contract → Supabase → Frontend
```

**🏆 ZKFINANCE PROJECT 100% READY FOR PRESENTATION TO COMPANY OWNERS! 🚀**

---

## 🧪 Next Steps

See [ENTREGA.md](ENTREGA.md) for details about the schedule and next steps.

---

## 🤝 Contribution

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.

---

## 👥 Authors

Developed by **Felipe Segall**, **Fêlix Rock Rodrigues**, **Paulo Marinato**, **Laura Eckert** with focus on social impact solutions and privacy using Web3 technologies and ZK Proofs.

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [Foundry Book](https://book.getfoundry.sh/)
- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS](https://github.com/iden3/snarkjs)
- [N8N](https://n8n.io/)
- [ZKVerify](https://zkverify.io/) 