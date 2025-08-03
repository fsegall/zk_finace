# ZK Proof API - Circuit Build Service

## 🎯 **Objetivo**

Esta pasta contém a implementação **independente** da API de build de circuitos ZK, separada do MVP funcional de provas ZK client-side.

## 📁 **Estrutura**

```
client/zk-proof-api/
├── services/
│   └── circuitBuildService.ts       # Service para consumir a API
├── components/
│   └── CircuitBuildDemo.tsx         # Componente de demonstração
├── generated/                       # Arquivos gerados pelo build
│   ├── wasm-base64.txt
│   ├── zkey-base64.txt
│   └── vkey-base64.txt
└── README.md                        # Este arquivo
```

## 🔄 **Fluxo de Funcionamento**

### **1. Build de Circuito:**
```
CircuitBuildDemo → circuitBuildService → API Server → Base64 Artifacts
```

### **2. Validação:**
```
CircuitBuildDemo → circuitBuildService → API Server → Validation Result
```

### **3. Download:**
```
Generated Artifacts → Download → Use in Client ZK Proof
```

## 🚀 **Endpoints Disponíveis**

- **POST** `/api/circuit/build` - Build circuito e retorna artifacts
- **POST** `/api/circuit/validate` - Valida formato do circuito
- **GET** `/api/circuit/build/health` - Health check
- **GET** `/api/circuit/build/stats` - Estatísticas

## ⚠️ **Importante**

- ✅ **Independente** do MVP de provas ZK
- ✅ **Não interfere** na funcionalidade existente
- ✅ **Modo simulação** ativo (sem circom real)
- ✅ **Arquivos separados** para evitar conflitos

## 🔧 **Como Usar**

1. **Acessar** `/circuit-build-test` no client
2. **Inserir** código do circuito (.circom)
3. **Validar** formato do circuito
4. **Build** e gerar artifacts
5. **Download** dos arquivos base64

## 🎯 **Próximos Passos**

- [ ] Implementar circom real no servidor
- [ ] Integrar com sistema de ZK existente (opcional)
- [ ] Adicionar cache de builds
- [ ] Implementar versionamento de circuitos

## 📝 **Notas**

- **MVP ZK**: Continua funcionando em `client/zk-proof/`
- **API Build**: Nova funcionalidade em `client/zk-proof-api/`
- **Separação**: Total independência entre os sistemas 