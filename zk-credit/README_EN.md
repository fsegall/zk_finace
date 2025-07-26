# 🔐 `zk-credit/` Module — ZK Proofs for Credit Analysis

This module contains Circom circuits, scripts, and tools to generate ZK (Zero-Knowledge Proofs) used in the credit analysis process. It allows proving that a private score meets a minimum criterion **without revealing the actual value**.

---

## 🎯 Objective

Prove that a user has `score >= threshold` using Groth16 proofs via Circom and SnarkJS, with public output `passed = 1`, validated by the ZKVerify platform.

---

## ⚙️ Stack

- [Circom](https://docs.circom.io/)
- [SnarkJS](https://github.com/iden3/snarkjs)
- [ZKVerify](https://zkverify.io/) - Official `zkverifyjs` library
- Supabase (via Edge Function)
- Web3 Frontend (import .wasm and .zkey)

---

## 📁 Structure

```
zk-credit/
├── circuits/
│   └── credit_score.circom
├── input/
│   └── input.json
├── build/
│   ├── credit_score.r1cs
│   ├── credit_score.zkey
│   ├── verification_key.json
│   ├── proof.json
│   ├── public.json
│   ├── witness.wtns
│   └── credit_score_js/
│       ├── credit_score.wasm
│       └── generate_witness.js
├── scripts/
│   ├── setup.sh
│   ├── register-circuit.js
│   ├── test-zkverify-proof.js
│   └── test-zkverify-rpc.js
└── README.md
```

---

## 🧩 ZK Circuit: `credit_score.circom`

```circom
include "circomlib/circuits/comparators.circom";

template CreditScoreCheck() {
    signal input score;
    signal input threshold;
    signal output passed;

    component cmp = GreaterEqThan(16);
    cmp.in[0] <== score;
    cmp.in[1] <== threshold;
    passed <== cmp.out;
}
component main = CreditScoreCheck();
```

---

## 🛠️ How to use

### 1. Complete setup

```bash
./scripts/setup.sh
```

### 2. Generate proof

```bash
node scripts/generateProofAndHash.js
```

### 3. ZKVerify Integration

The module is automatically integrated via `server/services/zk-credit.ts` using the official `zkverifyjs` library.

---

## ⚙️ Available Scripts

### `setup.sh`
Sets up the environment, compiles circuits, and generates necessary keys.

### `register-circuit.js`
Registers the verification key (circuit) on the ZKVerify blockchain. **Run only once** per circuit.

### `test-zkverify-proof.js`
Tests ZK proof submission using an already registered verification key. **Can be run multiple times** to demonstrate integration.

### `test-zkverify-rpc.js`
Tests RPC connectivity with the ZKVerify Volta network. Checks network health, node version, and on-chain data.

## 🧪 Integration Tests

### Test Flow
1. **Build artifacts**: `bash scripts/setup.sh`
2. **Circuit registration**: `node scripts/register-circuit.js` (once)
3. **Connectivity test**: `node scripts/test-zkverify-rpc.js`
4. **Proof test**: `node scripts/test-zkverify-proof.js` (multiple times)

### Test Status
- ✅ **RPC Connectivity**: 13+ peers, stable network
- ✅ **VK Registration**: Verification key registered on blockchain
- ✅ **Proof Submission**: Multiple proofs successfully verified
- ✅ **Volta Network**: Operational and accessible

---

## 🔧 Integration

### Via ZK Service

```typescript
import { ZKCreditService } from './zk-credit.js';

const zkService = new ZKCreditService();
const proof = await zkService.generateProof({
  score: 850,
  threshold: 650,
  requestId: 'request-123'
});
```

### Via ZKVerify

```typescript
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';

const session = await zkVerifySession.start()
  .Volta()
  .withAccount(seedPhrase);

const { events, transactionResult } = await session
  .verify()
  .groth16({
    library: Library.snarkjs,
    curve: CurveType.bn128
  })
  .execute({
    proofData: { vk, proof, publicSignals },
    domainId: 1
  });
```

---

## 📊 Status

- ✅ **Circuit**: Compiled and tested
- ✅ **Proof Generation**: Working
- ✅ **ZKVerify Integration**: Implemented and tested
- ✅ **Official Library**: `zkverifyjs` configured
- ✅ **Test Scripts**: Organized and functional
- ✅ **Volta Network**: Connectivity confirmed
- ✅ **ZK Proofs**: Submission and verification operational

---

## 🔗 Links

- [ZKVerify Documentation](https://docs.zkverify.io)
- [zkverifyjs npm package](https://www.npmjs.com/package/zkverifyjs)
- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS GitHub](https://github.com/iden3/snarkjs) 