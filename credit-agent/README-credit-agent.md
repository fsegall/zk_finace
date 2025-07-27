# 🔐 Módulo Credit-Agent - Análise de Crédito com ZK Proofs

Este módulo implementa um sistema completo de análise de crédito com **Zero-Knowledge Proofs (ZK)**, processamento 100% local e integração com a **ZKVerify testnet** para verificação on-chain.

---

## 🎯 **Objetivo**

Provar que um usuário possui `score >= threshold` usando provas Groth16 via Circom e SnarkJS, com saída pública `passed = 1`, validada localmente e enviada para **ZKVerify testnet** para verificação on-chain.

---

## ⚙️ **Stack Tecnológica**

- **Backend**: Node.js + Express (processamento local)
- **Frontend**: React + TypeScript (interface de usuário)
- **ZK Circuits**: Circom + SnarkJS (geração de provas)
- **ZKVerify**: Testnet integration via API direta
- **Algoritmo**: Score de crédito proprietário (zkfinance-credit-v1)

---

## 📁 **Estrutura do Sistema**

```
zkfinance_ui/
├── server/
│   ├── services/
│   │   ├── credit-score.ts      # Algoritmo de análise
│   │   └── zk-credit.ts         # Integração ZK + ZKVerify
│   ├── routes/
│   │   └── credit-analysis.ts   # Endpoint local
│   └── index.ts                 # Servidor Express
├── client/
│   └── hooks/
│       └── useCreditAnalysis.ts # Hook atualizado
├── zk-credit/                   # Módulo ZK
│   ├── circuits/
│   │   └── credit_score.circom  # Circuito ZK
│   ├── scripts/
│   │   ├── setup.sh
│   │   ├── generateProofAndHash.js
│   │   └── verifyProofLocal.js
│   └── build/                   # Arquivos compilados
└── credit-agent/                # Documentação
    └── README-credit-agent.md   # Este arquivo
```

---

## 🚀 **Como Usar**

### **1. Setup Inicial**

```bash
# Instalar dependências
npm install

# Setup do módulo ZK
cd zk-credit
npm run setup
cd ..

# Iniciar servidor
npm run dev
```

### **2. Análise de Crédito**

```bash
# Teste via curl
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

### **3. Teste com ZKVerify**

```bash
# Teste completo com ZKVerify
./test_zkverify_integration.sh
```

---

## 🔐 **Fluxo ZK Completo**

### **1. Geração de Prova**
```typescript
// Dados privados (não revelados)
const score = 850;        // Score privado
const threshold = 650;    // Threshold público

// Geração de prova ZK
const proof = await zkCreditService.generateProof({
  score,
  threshold,
  requestId: 'user-123'
});
```

### **2. Verificação Local**
```typescript
// Verificação local da prova
const isValid = await zkCreditService.verifyProof(
  proof.proof,
  proof.publicSignals
);
```

### **3. Submissão para ZKVerify**
```typescript
// Envio para ZKVerify testnet
const zkVerifyResult = await zkCreditService.submitToZKVerify(
  proof,
  'user-123'
);

// Resultado: { success: true, transactionHash: '0x...' }
```

---

## 🌐 **Integração ZKVerify**

### **Configuração**
- **Testnet Address**: `xph7MXyuL9B3WYLPBVz2S7wrs1mCzcBDXzMyv4qPMQcYJut7S`
- **API**: Integração direta via HTTP
- **Método**: POST para endpoint de verificação

### **Fluxo de Submissão**
1. **Geração** da prova ZK local
2. **Verificação** local da prova
3. **Submissão** para ZKVerify testnet
4. **Recebimento** do transaction hash
5. **Validação** on-chain da prova

---

## 📊 **Algoritmo de Score**

### **Fatores de Pontuação**
- **Renda** (0-300 pontos): Baseada no nível de renda
- **Emprego** (0-200 pontos): Estabilidade no emprego
- **Propriedade** (0-150 pontos): Posse de imóvel
- **Dívidas** (-100 pontos): Penalização por dívidas
- **Inadimplência** (-100 a -200 pontos): Penalização por defaults

### **Categorias**
- **Excellent** (750-850): Score alto, aprovação garantida
- **Good** (700-749): Score bom, aprovação provável
- **Fair** (650-699): Score regular, aprovação condicional
- **Poor** (600-649): Score baixo, reprovação
- **Very Poor** (300-599): Score muito baixo, reprovação

---

## 🔗 **Endpoints Disponíveis**

### **POST /api/credit-analysis**
Análise completa de crédito com ZK proofs

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
Health check do serviço

### **GET /api/credit-analysis/algorithm**
Informações sobre o algoritmo

---

## 🧪 **Testes**

### **Testes Unitários**
```bash
npm test
```

### **Teste de Integração ZKVerify**
```bash
cd zk-credit
node scripts/test-zkverify-proof.js
```

### **Teste Manual**
```bash
# Teste básico
./test_credit_analysis_local.sh

# Teste ZKVerify (na pasta zk-credit)
cd zk-credit
node scripts/test-zkverify-rpc.js
node scripts/test-zkverify-proof.js
```

---

## 🔒 **Privacidade e Segurança**

### **Princípios ZK**
- **Score privado**: Nunca revelado
- **Threshold público**: Critério de aprovação
- **Prova ZK**: Comprova `score >= threshold` sem revelar o valor
- **Verificação on-chain**: Prova validada na blockchain

### **Benefícios**
- ✅ **Sigilo total** dos dados sensíveis
- ✅ **Verificação on-chain** via ZKVerify
- ✅ **Processamento local** (sem dependência externa)
- ✅ **Compliance** com zero-knowledge
- ✅ **Transparência** via blockchain

---

## 🚀 **Vantagens da Implementação Local**

### **vs n8n Cloud (Anterior)**
- ❌ **Dados na nuvem**: Risco de vazamento
- ❌ **Latência de rede**: Processamento lento
- ❌ **Dependência externa**: Falha de serviço
- ❌ **Sem ZK proofs**: Sem privacidade

### **vs Implementação Local (Atual)**
- ✅ **100% local**: Dados nunca saem do ambiente
- ✅ **Latência mínima**: Processamento instantâneo
- ✅ **Zero dependência**: Funciona offline
- ✅ **ZK proofs**: Privacidade garantida
- ✅ **ZKVerify**: Verificação on-chain

---

## 🔧 **Troubleshooting**

### **Erro: "Módulo zk-credit não encontrado"**
```bash
cd zk-credit
npm run setup
cd ..
```

### **Erro: "ZKVerify submission failed"**
- Verificar conectividade com a testnet
- Verificar se a API da ZKVerify está acessível
- Verificar se o address da ZKVerify está correto
- Verificar se as credenciais da API estão configuradas

### **Erro: "Circuit compilation failed"**
```bash
cd zk-credit
npm run compile
cd ..
```

---

## 📈 **Próximos Passos**

1. **🧪 Testes de Integração** - Testar fluxo completo frontend-backend
2. **📊 Monitoramento** - Adicionar logs e métricas
3. **🔐 Segurança** - Implementar autenticação/autorização
4. **⚡ Escalabilidade** - Otimizar para alta demanda
5. **🌐 Deploy** - Preparar para produção

---

## 📚 **Referências**

- [ZKVerify API Documentation](https://zkverify.io/docs) - API de verificação
- [Circom Documentation](https://docs.circom.io/) - Circuitos ZK
- [SnarkJS](https://github.com/iden3/snarkjs) - Geração de provas
- [ZKVerify](https://zkverify.io/) - Verificação on-chain

---

> **Desenvolvido por Felipe Segall Corrêa**  
> **ZK Finance - Análise de Crédito com Zero-Knowledge Proofs**