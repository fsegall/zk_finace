# ⚖️ `foundry/` Module — Smart Loan Contract

This module contains the smart contract responsible for formalizing and executing loans on the ZKFinance platform. Uses the [Foundry](https://book.getfoundry.sh/) framework for development, testing, and deployment on EVM networks.

---

## 🎯 Objective

- Register loan requests with ZK validation
- Enable peer-to-peer funding with balance control
- Manage repayment, terms, and interest
- Integrate with ZK proofs via commitment hash

---

## ⚙️ Stack

- [Foundry](https://book.getfoundry.sh/)
- Solidity >= 0.8.19
- Ethereum Testnet (Sepolia)
- Viem (frontend) for interaction
- zk-credit for prior validation

---

## 📁 Project Structure

```
foundry/
├── src/
│   └── LoanManager.sol         # Main contract
├── scripts/
│   └── DeployLoan.s.sol        # Deployment script
├── test/
│   └── LoanManager.t.sol       # Forge tests
├── broadcast/                  # Deployment history
├── foundry.toml               # Foundry configuration
└── README_FOUNDRY_EN.md       # This file
```

---

## 🔒 LoanManager Contract - Real Functions

### 📋 Data Structure

```solidity
struct LoanRequest {
    address borrower;           // Borrower address
    uint256 amount;            // Requested amount
    uint256 fundedAmount;      // Already funded amount
    uint256 deadline;          // Maturity date
    uint256 interestRate;      // Interest rate (%)
    bytes32 zkCommitmentHash;  // ZK commitment hash
    address[] funders;         // Funders list
    mapping(address => uint256) contributions; // Contributions per funder
    bool repaid;               // Repayment status
}
```

### 🚀 Main Functions

#### `createLoanRequest()`
```solidity
function createLoanRequest(
    uint256 amount,
    uint256 durationInDays,
    uint256 interestRate,
    bytes32 zkCommitmentHash
) external
```
- **Creates** a new loan request
- **Validations**: amount > 0, duration > 0
- **Stores**: ZK commitment hash for validation
- **Emits**: `LoanRequested(id, borrower)`

#### `fundLoan()`
```solidity
function fundLoan(uint256 loanId) external payable
```
- **Funds** an existing loan
- **Validations**: valid deadline, not repaid, amount > 0, doesn't exceed limit
- **Records**: funder contribution
- **Emits**: `LoanFunded(id, funder, amount)`

#### `repayLoan()`
```solidity
function repayLoan(uint256 loanId) external payable
```
- **Repays** the loan with interest
- **Validations**: borrower only, not repaid, deadline passed, fully funded
- **Calculates**: total amount with interest
- **Distributes**: payments to funders
- **Emits**: `LoanRepaid(id)`

### 📖 Query Functions

#### `getLoan()`
```solidity
function getLoan(uint256 loanId) external view returns (
    address borrower,
    uint256 amount,
    uint256 fundedAmount,
    uint256 deadline,
    uint256 interestRate,
    bytes32 zkCommitmentHash,
    bool repaid,
    address[] memory funders
)
```
- **Returns** all loan data
- **Includes**: funders list

#### `getContribution()`
```solidity
function getContribution(uint256 loanId, address funder) external view returns (uint256)
```
- **Returns** amount contributed by a specific funder

#### `loanCount()`
```solidity
function loanCount() external view returns (uint256)
```
- **Returns** total number of loans

---

## 🧪 Testing

Run tests with extended verbosity:

```bash
forge test -vv
```

### 📋 Test Cases

- ✅ Loan request creation
- ✅ Loan funding
- ✅ Repayment with interest
- ✅ Security validations
- ✅ Invalid attempts

---

## 🚀 Deployment

### 🔧 Prerequisites

1. **Environment variables**:
   ```bash
   export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
   export PRIVATE_KEY="0x..."
   ```

2. **Sepolia ETH balance** for gas

### 📦 Deployment Command

```bash
forge script scripts/DeployLoan.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### 📍 Deployed Contracts

- **Latest deployment**: `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2` (Sepolia)
- **Date**: 2024-12-25
- **Network**: Sepolia Testnet

---

## 🔗 Frontend Integration

### 📡 Interaction via Viem

```typescript
// Loan creation example
const { request } = await walletClient.writeContract({
  address: '0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2',
  abi: LoanManagerABI,
  functionName: 'createLoanRequest',
  args: [amount, durationInDays, interestRate, zkCommitmentHash]
});

// Funding example
const { request } = await walletClient.writeContract({
  address: '0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2',
  abi: LoanManagerABI,
  functionName: 'fundLoan',
  args: [loanId],
  value: fundingAmount
});
```

### 🔐 ZK Validation

- The **ZK commitment hash** is stored in the contract
- **Proof validation** is done off-chain before creation
- The **contract trusts** the hash provided by the frontend

---

## ⚙️ Scripts and Commands

### 🧪 Local tests
```bash
forge test -vv
```

### 🔨 Compilation
```bash
forge build
```

### 📊 Gas analysis
```bash
forge test --gas-report
```

### 🚀 Deploy to Sepolia
```bash
forge script scripts/DeployLoan.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

---

## ✅ Prerequisites

- [Foundry](https://book.getfoundry.sh/) installed
- Node.js >= 18
- Environment variables configured:
  - `SEPOLIA_RPC_URL`
  - `PRIVATE_KEY` (with SepoliaETH balance)

---

## 🔐 Security

### ⚠️ Important Considerations

- **Never share** `.env` content
- **Add** `.env` to `.gitignore`
- **Validate** ZK proofs before calling the contract
- **Test** extensively before mainnet deployment

### 🛡️ Contract Validations

- ✅ Positive values
- ✅ Valid deadlines
- ✅ User permissions
- ✅ Correct states
- ✅ Funding limits

---

## 💡 Future Extensions

### 🔮 Roadmap

- [ ] **On-chain verification** of ZK proofs
- [ ] **Multiple funders** per request
- [ ] **On-chain reputation** system
- [ ] **Automatic penalties** for delays
- [ ] **Complete transaction** history
- [ ] **Decentralized governance**

### 🔧 Technical Improvements

- [ ] **Gas optimization** for batch operations
- [ ] **Upgradeability** via proxy pattern
- [ ] **Detailed events** for indexing
- [ ] **Standard interface** (ERC-4626)

---

## 🧾 Deployment History

| Date | Address | Network | Status |
|------|---------|---------|--------|
| 2024-12-25 | `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2` | Sepolia | ✅ Active |
| 2024-01-15 | `0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e` | Sepolia | ❌ Deprecated |

---

## 👨‍💻 Development

**Developed by**: Felipe Segall  
**Project**: ZKFinance - ZK Loan Platform  
**Version**: 1.0.0  
**License**: MIT

---

## 📞 Support

For technical questions or issues:
- **Issues**: Project GitHub
- **Documentation**: This README
- **Contract**: Verified on Etherscan Sepolia 