# 🚀 Deployment Guide - LoanManager Smart Contract

This document describes the complete deployment process for the `LoanManager.sol` contract on different networks.

---

## 📋 Prerequisites

### 🔧 Required Tools
- **Foundry**: Smart contract development framework
- **Git**: Version control
- **bc**: Calculator for mathematical operations (usually pre-installed)

### 🔑 Environment Variables
Create a `.env` file in the project root directory:

```bash
# Sepolia Testnet
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_WITHOUT_0x_PREFIX
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# ZKVerify
ZKVERIFY_SEED_PHRASE=your_seed_phrase_here
```

### 💰 Required Balance
- **Sepolia**: Minimum 0.01 ETH for deployment and gas
- **Local**: Unlimited ETH (Anvil)

---

## 🚀 Deploy to Sepolia (Recommended)

### 📝 Simple Command
```bash
cd foundry
./scripts/deploy_sepolia.sh
```

### 🔍 What the script does:

1. **✅ Prerequisites Verification**
   - Foundry installed
   - Environment variables configured
   - Sufficient wallet balance

2. **🔨 Compilation and Tests**
   - Clears previous cache
   - Compiles contracts
   - Runs all tests

3. **🧪 Simulation**
   - Simulates deployment before execution
   - Verifies everything is correct

4. **🚀 Real Deployment**
   - Executes deployment on Sepolia
   - Verifies contract on Etherscan
   - Generates detailed logs

5. **📊 Documentation**
   - Saves contract address
   - Generates complete report
   - Updates READMEs

### 📁 Generated Files
```
foundry/
├── logs/
│   ├── deploy_sepolia_YYYYMMDD_HHMMSS.log    # Complete log
│   └── deploy_report_sepolia_YYYYMMDD_HHMMSS.md  # Report
├── deployed_address_sepolia.txt              # Contract address
└── README.md.backup.YYYYMMDD_HHMMSS          # README backup
```

---

## 🏠 Local Deploy (Development)

### 📝 Command
```bash
cd foundry

# Start Anvil (local blockchain)
anvil --port 8545

# In another terminal, deploy
export PRIVATE_KEY=
forge script script/DeployLoan.s.sol --rpc-url http://localhost:8545 --broadcast
```

### 📊 Local Addresses
- **Anvil**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Contract**: Automatically deployed

---

## 🔍 Deploy Verification

### ✅ Successful Deploy
```bash
# Check contract deployment
cast code 0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2 --rpc-url $SEPOLIA_RPC_URL

# Verify on Etherscan
open https://sepolia.etherscan.io/address/0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2
```

### 📊 Contract Information
- **Name**: LoanManager
- **Address**: `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2`
- **Network**: Sepolia Testnet
- **Status**: ✅ Verified
- **Deploy Date**: 2024-12-25

---

## 🚨 Troubleshooting

### ❌ Error: "Insufficient balance"
```bash
# Check wallet balance
cast balance YOUR_WALLET_ADDRESS --rpc-url $SEPOLIA_RPC_URL

# Get Sepolia ETH from faucet
# https://sepoliafaucet.com/
```

### ❌ Error: "Invalid private key"
```bash
# Check environment variables
echo $PRIVATE_KEY
echo $SEPOLIA_RPC_URL

# Ensure private key doesn't start with 0x
export PRIVATE_KEY=YOUR_PRIVATE_KEY_WITHOUT_0x
```

### ❌ Error: "Tests failed"
```bash
# Run tests manually
forge test -vv

# Check error logs
forge test --verbosity 4
```

---

## 📖 Useful Commands

### 🔍 Check Balance
```bash
cast balance WALLET_ADDRESS --rpc-url $SEPOLIA_RPC_URL
```

### 📊 Check Contract
```bash
cast code CONTRACT_ADDRESS --rpc-url $SEPOLIA_RPC_URL
```

### 🧪 Run Tests
```bash
forge test -vv
```

### 🔨 Compile
```bash
forge build --force
```

---

## 📄 Deployment Reports

### 📊 Report Structure
The script generates automatic reports in `foundry/logs/`:

```markdown
# 🚀 Deployment Report - Sepolia

## 📅 General Information
- Date/Time: 2024-12-25 15:30:00
- Executed by: fsegall
- Script: deploy_sepolia.sh
- Version: 1.0

## 🔗 Contract
- Name: LoanManager.sol
- Address: 0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2
- Network: Sepolia Testnet
- Etherscan: https://sepolia.etherscan.io/address/0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2

## 👤 Wallet
- Address: 0x...
- Initial balance: 0.5 ETH

## 📊 Status
- Compilation: ✅ Success
- Tests: ✅ Passed
- Simulation: ✅ Success
- Deployment: ✅ Confirmed
- Verification: ✅ Etherscan
```

---

## 🎯 Next Steps

After successful deployment:

1. **🧪 Test Contract**
   - Create test loan
   - Test funding
   - Test repayment

2. **🔗 Integrate Frontend**
   - Update address in frontend
   - Test Viem integration
   - Verify Supabase synchronization

3. **📚 Document**
   - Update READMEs
   - Record addresses
   - Document changes

---

## 📞 Support

- **Issues**: GitHub Issues
- **Documentation**: This README
- **Scripts**: `foundry/scripts/`
- **Logs**: `foundry/logs/`

---

**🏦 ZKFinance - Documented and Automated Smart Contract Deployment** 