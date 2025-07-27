# 🔐 Módulo `zk-credit/` — Provas ZK para Análise de Crédito

Este módulo contém os circuitos Circom, scripts e ferramentas para gerar provas ZK (Zero-Knowledge Proofs) usadas no processo de análise de crédito. Ele permite comprovar que um score privado atende a um critério mínimo **sem revelar o valor real**.

---

## 🎯 Objetivo

Provar que um usuário possui `score >= threshold` usando provas Groth16 via Circom e SnarkJS, com saída pública `passed = 1`, validada pela plataforma ZKVerify.

---

## ⚙️ Stack

- [Circom](https://docs.circom.io/)
- [SnarkJS](https://github.com/iden3/snarkjs)
- [ZKVerify](https://zkverify.io/) - Biblioteca oficial `zkverifyjs`
- Supabase (via Edge Function)
- Web3 Frontend (importação .wasm e .zkey)

---

## 📁 Estrutura

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

## 🧩 Circuito ZK: `credit_score.circom`

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

## 🛠️ Como usar

### 1. Setup completo

```bash
./scripts/setup.sh
```

### 2. Gerar prova

```bash
node scripts/generateProofAndHash.js
```

### 3. Integração com ZKVerify

O módulo é integrado automaticamente via `server/services/zk-credit.ts` usando a biblioteca oficial `zkverifyjs`.

---

## ⚙️ Scripts Disponíveis

### `setup.sh`
Configura o ambiente, compila circuitos e gera chaves necessárias.

### `register-circuit.js`
Registra a verification key (circuito) na blockchain ZKVerify. **Execute apenas uma vez** por circuito.

### `test-zkverify-proof.js`
Testa a submissão de provas ZK usando uma verification key já registrada. **Pode ser executado múltiplas vezes** para demonstrar a integração.

### `test-zkverify-rpc.js`
Testa a conectividade RPC com a rede ZKVerify Volta. Verifica saúde da rede, versão do node e dados on-chain.

## 🧪 Testes de Integração

### Fluxo de Teste
1. **Build dos artefatos**: `bash scripts/setup.sh`
2. **Registro do circuito**: `node scripts/register-circuit.js` (uma vez)
3. **Teste de conectividade**: `node scripts/test-zkverify-rpc.js`
4. **Teste de provas**: `node scripts/test-zkverify-proof.js` (múltiplas vezes)

### Status dos Testes
- ✅ **Conectividade RPC**: 13+ peers, rede estável
- ✅ **Registro de VK**: Verification key registrada na blockchain
- ✅ **Submissão de Provas**: Múltiplas provas verificadas com sucesso
- ✅ **Rede Volta**: Operacional e acessível

---

## 🔧 Integração

### Via Serviço ZK

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

- ✅ **Circuito**: Compilado e testado
- ✅ **Geração de Prova**: Funcionando
- ✅ **Integração ZKVerify**: Implementada e testada
- ✅ **Biblioteca Oficial**: `zkverifyjs` configurada
- ✅ **Scripts de Teste**: Organizados e funcionais
- ✅ **Rede Volta**: Conectividade confirmada
- ✅ **Provas ZK**: Submissão e verificação operacionais

---

## 🔗 Links

- [ZKVerify Documentation](https://docs.zkverify.io)
- [zkverifyjs npm package](https://www.npmjs.com/package/zkverifyjs)
- [Circom Documentation](https://docs.circom.io/)
- [SnarkJS GitHub](https://github.com/iden3/snarkjs)