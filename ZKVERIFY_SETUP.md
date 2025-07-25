# 🔐 ZKVerify Integration - Documentação Oficial

## 📋 Pré-requisitos

1. **Biblioteca instalada**: `npm install zkverifyjs`
2. **Seed phrase da ZKVerify**: Para transações na testnet
3. **Módulo zk-credit configurado**: Com circuitos compilados

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# ZKVerify Configuration
ZKVERIFY_SEED_PHRASE=sua_seed_phrase_da_zkverify_testnet

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 2. Obter Seed Phrase da ZKVerify

1. Acesse [ZKVerify Testnet](https://testnet.zkverify.io)
2. Crie uma conta ou conecte sua wallet
3. Copie a seed phrase ou chave privada
4. Configure no `.env` como `ZKVERIFY_SEED_PHRASE`

### 3. Verificar Módulo zk-credit

Certifique-se de que os arquivos existem:

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

## 🧪 Testando a Integração

### 1. Teste de Conexão

```bash
# Testar conexão básica com ZKVerify
node test_zkverify_official.js
```

### 2. Teste Completo

```bash
# Iniciar servidor
npm run dev

# Em outro terminal, testar análise de crédito
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

## 🔧 Implementação

### Sessão ZKVerify

```javascript
import { zkVerifySession } from 'zkverifyjs';

// Criar sessão com rede Volta (testnet)
const session = await zkVerifySession.start()
  .Volta()
  .withAccount(process.env.ZKVERIFY_SEED_PHRASE);
```

### Verificação de Prova

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

### Erro: "Session initialization failed"

- Verifique se a seed phrase está correta
- Certifique-se de que tem fundos na testnet
- Verifique a conectividade com a rede Volta

### Erro: "Module zk-credit not configured"

- Execute `cd zk-credit && npm install`
- Execute `./scripts/setup.sh` para compilar circuitos

### Erro: "Transaction failed"

- Verifique se tem fundos suficientes na testnet
- Verifique se a seed phrase tem permissões de transação

## 📚 Recursos

- [ZKVerify Documentation](https://docs.zkverify.io)
- [zkverifyjs npm package](https://www.npmjs.com/package/zkverifyjs)
- [ZKVerify Testnet](https://testnet.zkverify.io)

## 🎯 Status da Integração

- ✅ **Biblioteca oficial**: `zkverifyjs` instalada
- ✅ **Rede Volta**: Configurada conforme documentação
- ✅ **Geração de prova**: Circom + SnarkJS funcionando
- ✅ **Envio para blockchain**: Implementado com documentação oficial
- ⚠️ **Teste em produção**: Aguardando seed phrase real 