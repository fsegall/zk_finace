# 🏦 **Loan Smart Contract - ZKFinance**

## 🎯 **Overview**

This document describes the complete decentralized loan system of ZKFinance, integrating:
- **EVM Smart Contract** (Foundry/Solidity)
- **ZK Proofs** (zk-credit)
- **Blockchain Verification** (ZKVerify)
- **Role System** (Supabase/DDD)

---

## 🏗️ **System Architecture**

### 🔄 **Complete Loan Flow:**

```
1. User (Borrower) → Frontend
2. Frontend → Local API → Credit Analysis
3. API → zk-credit → ZK Proof Generation
4. zk-credit → ZKVerify → Blockchain Verification
5. ZKVerify → Smart Contract → Loan Creation
6. Smart Contract → Supabase → Data Persistence
7. Supabase → Frontend → Interface Update
```

### 📦 **Integrated Components:**

- **`foundry/src/LoanManager.sol`**: Main loan contract
- **`zk-credit/`**: ZK proof generation and verification
- **`supabase/schema/`**: Role system and persistence
- **`client/`**: User interface

---

## 🔒 **Smart Contract: LoanManager.sol**

### 📋 **Data Structure:**

```solidity
struct LoanRequest {
    address borrower;           // Borrower address
    uint256 amount;            // Requested amount
    uint256 fundedAmount;      // Already funded amount
    uint256 deadline;          // Maturity date
    uint256 interestRate;      // Interest rate (%)
    bytes32 zkCommitmentHash;  // ZK proof hash
    address[] funders;         // Funders list
    mapping(address => uint256) contributions; // Contributions
    bool repaid;               // Repayment status
}
```

### 🚀 **Main Functions:**

#### **1. createLoanRequest()**
```solidity
function createLoanRequest(
    uint256 amount,
    uint256 durationInDays,
    uint256 interestRate,
    bytes32 zkCommitmentHash
) external
```
- **Purpose**: Create new loan request
- **Validation**: Requires valid ZK proof
- **Event**: `LoanRequested`

#### **2. fundLoan()**
```solidity
function fundLoan(uint256 loanId) external payable
```
- **Purpose**: Fund existing loan
- **Validation**: Deadline not expired, amount within limit
- **Event**: `LoanFunded`

#### **3. repayLoan()**
```solidity
function repayLoan(uint256 loanId) external payable
```
- **Purpose**: Repay loan with interest
- **Validation**: Only borrower, sufficient amount
- **Event**: `LoanRepaid`

---

## 🔐 **ZKVerify Integration**

### 🔗 **ZK → Smart Contract Bridge:**

```javascript
// 1. Generate ZK proof
const proofResult = await generateCreditProof({
    score: "750",
    threshold: "700"
});

// 2. Verify on ZKVerify
const verification = await session
    .verify()
    .groth16({ library: Library.snarkjs, curve: CurveType.bn128 })
    .execute({
        proofData: { vk, proof, publicSignals },
        domainId: 1
    });

// 3. Create loan on smart contract
const loanContract = new ethers.Contract(ADDRESS, ABI, signer);
await loanContract.createLoanRequest(
    amount,
    duration,
    interestRate,
    ethers.utils.keccak256(JSON.stringify(proof))
);
```

### 🎯 **Two-Layer Validation:**

1. **ZKVerify**: Verifies ZK proof on blockchain
2. **Smart Contract**: Validates proof hash and executes logic

---

## 👥 **Role System (DDD)**

### 🏛️ **Domain Driven Design:**

#### **Domain Entities:**

```sql
-- User Profiles
CREATE TABLE profiles (
    id uuid PRIMARY KEY,
    full_name text,
    wallet_address text,
    role_selection text,  -- 'borrower', 'investor', 'admin'
    is_onboarded boolean
);

-- Specific Roles
CREATE TABLE user_roles (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    role USER-DEFINED NOT NULL,  -- Enum: 'borrower', 'investor', 'admin'
    created_at timestamp
);

-- Loans
CREATE TABLE loans (
    id uuid PRIMARY KEY,
    creator_id uuid REFERENCES auth.users(id),
    title text,
    amount numeric,
    interest_rate numeric,
    status text,  -- 'pending', 'funded', 'repaid', 'defaulted'
    blockchain_tx_hash text,  -- Transaction hash in smart contract
    zk_proof_hash text       -- ZK proof hash
);

-- Investments
CREATE TABLE investments (
    id uuid PRIMARY KEY,
    loan_id uuid REFERENCES loans(id),
    investor_id uuid REFERENCES auth.users(id),
    amount numeric,
    status text,  -- 'pending', 'confirmed', 'repaid'
    blockchain_tx_hash text
);
```

### 🔄 **Smart Contract ↔ Supabase Synchronization:**

```javascript
// Integration service
class LoanIntegrationService {
    async createLoan(loanData, zkProof) {
        // 1. Create on smart contract
        const tx = await this.contract.createLoanRequest(
            loanData.amount,
            loanData.duration,
            loanData.interestRate,
            zkProof.hash
        );
        
        // 2. Persist in Supabase
        await this.supabase.from('loans').insert({
            creator_id: loanData.userId,
            title: loanData.title,
            amount: loanData.amount,
            interest_rate: loanData.interestRate,
            status: 'pending',
            blockchain_tx_hash: tx.hash,
            zk_proof_hash: zkProof.hash
        });
        
        return { contractTx: tx, dbRecord: loanRecord };
    }
}
```

---

## 🧪 **Tests and Deploy**

### 🧪 **Local Tests:**

```bash
# Run Foundry tests
cd foundry
forge test -vv

# Specific tests
forge test --match-test testCreateLoan -vv
forge test --match-test testFundLoan -vv
forge test --match-test testRepayLoan -vv
```

### 🚀 **Testnet Deploy:**

```bash
# Local deploy (Anvil)
forge script scripts/DeployLoan.s.sol --rpc-url http://localhost:8545 --broadcast

# Sepolia deploy
forge script scripts/DeployLoan.s.sol \
    --rpc-url $SEPOLIA_RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --verify
```

### 📊 **Deploy Addresses:**

- **Local (Anvil)**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Sepolia**: `0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e`

---

## 🔧 **Configuration and Setup**

### 📋 **Prerequisites:**

1. **Foundry installed**
2. **Node.js and dependencies**
3. **Environment variables configured**
4. **Supabase configured**

### ⚙️ **Environment Variables:**

```bash
# Smart Contract
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key_here

# ZKVerify
ZKVERIFY_SEED_PHRASE=your_seed_phrase_here

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### 🚀 **Setup Commands:**

```bash
# 1. Install dependencies
npm install

# 2. Configure Foundry
cd foundry
forge install

# 3. Compile contracts
forge build

# 4. Run tests
forge test -vv

# 5. Deploy (optional)
forge script scripts/DeployLoan.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

---

## 🎯 **Use Cases**

### 👤 **Borrower:**

1. **Create Loan Request:**
   - Submit credit data
   - System generates ZK proof
   - Proof verified on ZKVerify
   - Smart contract creates loan
   - Data persisted in Supabase

2. **Receive Funding:**
   - Investors fund via smart contract
   - System syncs with Supabase
   - Interface updates status

3. **Repay:**
   - Pay via smart contract
   - System updates status
   - History recorded

### 💰 **Investor:**

1. **Explore Loans:**
   - View available loans
   - See verified ZK proofs
   - Analyze risk and return

2. **Fund:**
   - Send ETH via smart contract
   - Receive confirmation
   - Investment recorded

3. **Receive Repayment:**
   - Receive automatically via smart contract
   - History updated

---

## 🔒 **Security and Validations**

### 🛡️ **Security Layers:**

1. **ZK Proof**: Ensures score > threshold without revealing data
2. **ZKVerify**: Verifies proof on blockchain
3. **Smart Contract**: Executes business logic
4. **Supabase**: Persists data and controls access

### ⚠️ **Critical Validations:**

- **Minimum score**: ZK proof must validate score > threshold
- **Deadline**: Loans have defined deadline
- **Amount**: Funding cannot exceed requested amount
- **Permissions**: Only borrower can repay

---

## 📈 **Metrics and Monitoring**

### 📊 **System KPIs:**

- **Total loans created**
- **Total amount funded**
- **Repayment rate**
- **Average funding time**
- **ZK score distribution**

### 🔍 **Logs and Debug:**

```javascript
// Integration logs
console.log('🔗 Smart Contract → Supabase:', {
    loanId: loan.id,
    txHash: tx.hash,
    zkProofHash: zkProof.hash,
    status: 'created'
});
```

---

## 🚀 **Future Roadmap**

### 🔮 **Planned Improvements:**

1. **On-chain Verification**: ZK proof verified directly in smart contract
2. **Liquidations**: Automatic liquidation system
3. **Governance**: DAO for protocol decisions
4. **Cross-chain**: Support for multiple blockchains
5. **Insurance**: Insurance system for investors

---

## 📞 **Support and Contact**

- **Documentation**: This README
- **Issues**: GitHub Issues
- **Smart Contract**: `foundry/src/LoanManager.sol`
- **Tests**: `foundry/test/LoanManager.t.sol`

---

**🏦 ZKFinance - Decentralized Loans with Zero-Knowledge Proofs** 