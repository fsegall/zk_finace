# 🏦 ZKFinance - Smart Contract Documentation

Welcome to the ZKFinance smart contract documentation. This directory contains all the necessary files for understanding, deploying, and interacting with the LoanManager smart contract.

---

## 📚 Documentation Files

### 🇧🇷 Portuguese
- **[README_FOUNDRY.md](README_FOUNDRY.md)** - Complete contract documentation with real functions
- **[DEPLOY.md](DEPLOY.md)** - Deployment guide and troubleshooting

### 🇺🇸 English
- **[README_FOUNDRY_EN.md](README_FOUNDRY_EN.md)** - Complete contract documentation (English)
- **[DEPLOY_EN.md](DEPLOY_EN.md)** - Deployment guide and troubleshooting (English)

---

## 🚀 Quick Start

### Deploy to Sepolia
```bash
cd foundry
./scripts/deploy_sepolia.sh
```

### Run Tests
```bash
forge test -vv
```

### Compile
```bash
forge build
```

---

## 📋 Contract Information

- **Name**: LoanManager
- **Address**: `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2`
- **Network**: Sepolia Testnet
- **Status**: ✅ Verified
- **Deploy Date**: 2024-12-25

---

## 🔗 Links

- **Etherscan**: https://sepolia.etherscan.io/address/0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2
- **Foundry Book**: https://book.getfoundry.sh/
- **Sepolia Faucet**: https://sepoliafaucet.com/

---

## 📁 Directory Structure

```
foundry/
├── src/
│   └── LoanManager.sol         # Main contract
├── scripts/
│   ├── DeployLoan.s.sol        # Deployment script
│   └── deploy_sepolia.sh       # Automated deployment
├── test/
│   └── LoanManager.t.sol       # Tests
├── broadcast/                  # Deployment history
├── README.md                   # This file
├── README_FOUNDRY.md          # Portuguese documentation
├── README_FOUNDRY_EN.md       # English documentation
├── DEPLOY.md                  # Portuguese deployment guide
├── DEPLOY_EN.md               # English deployment guide
└── foundry.toml               # Foundry configuration
```

---

## 🎯 Main Features

- ✅ **Loan Request Creation** - Create loan requests with ZK validation
- ✅ **Peer-to-Peer Funding** - Multiple funders can contribute
- ✅ **Interest Calculation** - Automatic interest calculation and distribution
- ✅ **Repayment Management** - Secure repayment with funder distribution
- ✅ **ZK Integration** - Commitment hash storage for ZK proof validation

---

## 🔐 Security

- All functions include comprehensive validations
- Access control for borrower-only operations
- Deadline enforcement for loan terms
- Funding limit enforcement
- Secure payment distribution

---

## 📞 Support

For questions or issues:
- **GitHub Issues**: Project repository
- **Documentation**: See files above
- **Contract**: Verified on Etherscan

---

**Developed by Felipe Segall for ZKFinance** 🚀 