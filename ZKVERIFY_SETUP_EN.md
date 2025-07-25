# 🔐 ZKVerify Integration - Official Documentation

## 📋 Prerequisites

1. **Library installed**: `npm install zkverifyjs`
2. **ZKVerify seed phrase**: For testnet transactions
3. **zk-credit module configured**: With compiled circuits

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```bash
# ZKVerify Configuration
ZKVERIFY_SEED_PHRASE=your_zkverify_testnet_seed_phrase

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 2. Get ZKVerify Seed Phrase

1. Access [ZKVerify Testnet](https://testnet.zkverify.io)
2. Create an account or connect your wallet
3. Copy the seed phrase or private key
4. Configure in `.env` as `ZKVERIFY_SEED_PHRASE`

### 3. Verify zk-credit Module

Make sure the files exist:

```bash
zk-credit/
├── build/
│   ├── credit_score.zkey
│   ├── credit_score_js/
│   │   └── credit_score.wasm
│   └── verification_key.json
└── input/
    └── input.json
```

## 🧪 Testing the Integration

### 1. Connection Test

```bash
# Test basic connection with ZKVerify
node test_zkverify_official.js
```

### 2. Complete Test

```bash
# Start server
npm run dev

# In another terminal, test credit analysis
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

## 🔧 Implementation

### ZKVerify Session

```javascript
import { zkVerifySession } from 'zkverifyjs';

// Create session with Volta network (testnet)
const session = await zkVerifySession.start()
  .Volta()
  .withAccount(process.env.ZKVERIFY_SEED_PHRASE);
```

### Proof Verification

```javascript
const { events, transactionResult } = await session
  .verify()
  .groth16({
    library: Library.snarkjs,
    curve: CurveType.bn128
  })
  .execute({
    proofData: {
      vk: vk,
      proof: proof,
      publicSignals: publicSignals,
    },
    domainId: 1,
  });
```

## 🔧 Troubleshooting

### Error: "Session initialization failed"

- Check if the seed phrase is correct
- Make sure you have funds on the testnet
- Check connectivity with the Volta network

### Error: "Module zk-credit not configured"

- Run `cd zk-credit && npm install`
- Run `./scripts/setup.sh` to compile circuits

### Error: "Transaction failed"

- Check if you have sufficient funds on the testnet
- Check if the seed phrase has transaction permissions

## 📚 Resources

- [ZKVerify Documentation](https://docs.zkverify.io)
- [zkverifyjs npm package](https://www.npmjs.com/package/zkverifyjs)
- [ZKVerify Testnet](https://testnet.zkverify.io)

## 🎯 Integration Status

- ✅ **Official library**: `zkverifyjs` installed
- ✅ **Volta network**: Configured according to documentation
- ✅ **Proof generation**: Circom + SnarkJS working
- ✅ **Blockchain submission**: Implemented with official documentation
- ⚠️ **Production test**: Waiting for real seed phrase 