# 🔐 Credit-Agent Module - Credit Analysis with ZK Proofs

This module implements a complete credit analysis system with **Zero-Knowledge Proofs (ZK)**, 100% local processing, and integration with the **ZKVerify testnet** for on-chain verification.

---

## 🎯 **Objective**

Prove that a user has `score >= threshold` using Groth16 proofs via Circom and SnarkJS, with public output `passed = 1`, validated locally and sent to **ZKVerify testnet** for on-chain verification.

---

## ⚙️ **Technology Stack**

- **Backend**: Node.js + Express (local processing)
- **Frontend**: React + TypeScript (user interface)
- **ZK Circuits**: Circom + SnarkJS (proof generation)
- **ZKVerify**: Testnet integration via direct API
- **Algorithm**: Proprietary credit score (zkfinance-credit-v1)

---

## 📁 **System Structure**

```
zkfinance_ui/
├── server/
│   ├── services/
│   │   ├── credit-score.ts      # Analysis algorithm
│   │   └── zk-credit.ts         # ZK + ZKVerify integration
│   ├── routes/
│   │   └── credit-analysis.ts   # Local endpoint
│   └── index.ts                 # Express server
├── client/
│   └── hooks/
│       └── useCreditAnalysis.ts # Updated hook
├── zk-credit/                   # ZK module
│   ├── circuits/
│   │   └── credit_score.circom  # ZK circuit
│   ├── scripts/
│   │   ├── setup.sh
│   │   ├── generateProofAndHash.js
│   │   └── verifyProofLocal.js
│   └── build/                   # Compiled files
└── credit-agent/                # Documentation
    └── README-credit-agent.md   # This file
```

---

## 🚀 **How to Use**

### **1. Initial Setup**

```bash
# Install dependencies
npm install

# Setup ZK module
cd zk-credit
npm run setup
cd ..

# Start server
npm run dev
```

### **2. Credit Analysis**

```bash
# Test via curl
curl -X POST http://localhost:3001/api/credit-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "income": 8000,
    "employment_years": 5,
    "has_property": true,
    "has_debt": false,
    "payment_defaults": 0
  }'
```

### **3. ZKVerify Test**

```bash
# Complete test with ZKVerify
./test_zkverify_integration.sh
```

---

## 🔐 **Complete ZK Flow**

### **1. Proof Generation**
```typescript
// Private data (not revealed)
const score = 850;        // Private score
const threshold = 650;    // Public threshold

// ZK proof generation
const proof = await zkCreditService.generateProof({
  score,
  threshold,
  requestId: 'user-123'
});
```

### **2. Local Verification**
```typescript
// Local proof verification
const isValid = await zkCreditService.verifyProof(
  proof.proof,
  proof.publicSignals
);
```

### **3. ZKVerify Submission**
```typescript
// Send to ZKVerify testnet
const zkVerifyResult = await zkCreditService.submitToZKVerify(
  proof,
  'user-123'
);

// Result: { success: true, transactionHash: '0x...' }
```

---

## 🌐 **ZKVerify Integration**

### **Configuration**
- **Testnet Address**: `xph7MXyuL9B3WYLPBVz2S7wrs1mCzcBDXzMyv4qPMQcYJut7S`
- **API**: Direct integration via HTTP
- **Method**: POST to verification endpoint

### **Submission Flow**
1. **Generation** of local ZK proof
2. **Local verification** of proof
3. **Submission** to ZKVerify testnet
4. **Receipt** of transaction hash
5. **On-chain validation** of proof

---

## 📊 **Score Algorithm**

### **Scoring Factors**
- **Income** (0-300 points): Based on income level
- **Employment** (0-200 points): Job stability
- **Property** (0-150 points): Property ownership
- **Debts** (-100 points): Penalty for debts
- **Defaults** (-100 to -200 points): Penalty for defaults

### **Categories**
- **Excellent** (750-850): High score, guaranteed approval
- **Good** (700-749): Good score, likely approval
- **Fair** (650-699): Regular score, conditional approval
- **Poor** (600-649): Low score, rejection
- **Very Poor** (300-599): Very low score, rejection

---

## 🔗 **Available Endpoints**

### **POST /api/credit-analysis**
Complete credit analysis with ZK proofs

**Request:**
```json
{
  "income": 8000,
  "employment_years": 5,
  "has_property": true,
  "has_debt": false,
  "payment_defaults": 0
}
```

**Response:**
```json
{
  "requestId": "user-123",
  "analysis": {
    "score": 850,
    "threshold": 650,
    "passed": true,
    "category": "Excellent"
  },
  "zkProof": {
    "verified": true,
    "zkVerifySubmission": {
      "success": true,
      "transactionHash": "0x..."
    }
  }
}
```

### **GET /api/credit-analysis/health**
Service health check

### **GET /api/credit-analysis/algorithm**
Algorithm information

---

## 🧪 **Tests**

### **Unit Tests**
```bash
npm test
```

### **ZKVerify Integration Test**
```bash
cd zk-credit
node scripts/test-zkverify-proof.js
```

### **Manual Test**
```bash
# Basic test
./test_credit_analysis_local.sh

# ZKVerify test (in zk-credit folder)
cd zk-credit
node scripts/test-zkverify-rpc.js
node scripts/test-zkverify-proof.js
```

---

## 🔒 **Privacy and Security**

### **ZK Principles**
- **Private score**: Never revealed
- **Public threshold**: Approval criteria
- **ZK proof**: Proves `score >= threshold` without revealing the value
- **On-chain verification**: Proof validated on blockchain

### **Benefits**
- ✅ **Total secrecy** of sensitive data
- ✅ **On-chain verification** via ZKVerify
- ✅ **Local processing** (no external dependency)
- ✅ **Compliance** with zero-knowledge
- ✅ **Transparency** via blockchain

---

## 🚀 **Advantages of Local Implementation**

### **vs n8n Cloud (Previous)**
- ❌ **Data in cloud**: Risk of leakage
- ❌ **Network latency**: Slow processing
- ❌ **External dependency**: Service failure
- ❌ **No ZK proofs**: No privacy

### **vs Local Implementation (Current)**
- ✅ **100% local**: Data never leaves the environment
- ✅ **Minimal latency**: Instant processing
- ✅ **Zero dependency**: Works offline
- ✅ **ZK proofs**: Guaranteed privacy
- ✅ **ZKVerify**: On-chain verification

---

## 🔧 **Troubleshooting**

### **Error: "zk-credit module not found"**
```bash
cd zk-credit
npm run setup
cd ..
```

### **Error: "ZKVerify submission failed"**
- Check connectivity with testnet
- Check if ZKVerify API is accessible
- Check if ZKVerify address is correct
- Check if API credentials are configured

### **Error: "Circuit compilation failed"**
```bash
cd zk-credit
npm run compile
cd ..
```

---

## 📈 **Next Steps**

1. **🧪 Integration Tests** - Test complete frontend-backend flow
2. **📊 Monitoring** - Add logs and metrics
3. **🔐 Security** - Implement authentication/authorization
4. **⚡ Scalability** - Optimize for high demand
5. **🌐 Deploy** - Prepare for production

---

## 📚 **References**

- [ZKVerify API Documentation](https://zkverify.io/docs) - Verification API
- [Circom Documentation](https://docs.circom.io/) - ZK circuits
- [SnarkJS](https://github.com/iden3/snarkjs) - Proof generation
- [ZKVerify](https://zkverify.io/) - On-chain verification

---

> **Developed by Felipe Segall Corrêa**  
> **ZK Finance - Credit Analysis with Zero-Knowledge Proofs** 