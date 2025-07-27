# 🚀 Guia de Deploy - Smart Contract LoanManager

Este documento descreve o processo completo de deploy do contrato `LoanManager.sol` nas diferentes redes.

---

## 📋 Pré-requisitos

### 🔧 Ferramentas Necessárias
- **Foundry**: Framework para desenvolvimento de smart contracts
- **Git**: Controle de versão
- **bc**: Calculadora para operações matemáticas (geralmente já instalada)

### 🔑 Variáveis de Ambiente
Crie um arquivo `.env` no diretório raiz do projeto:

```bash
# Sepolia Testnet
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_WITHOUT_0x_PREFIX
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY

# ZKVerify
ZKVERIFY_SEED_PHRASE=your_seed_phrase_here
```

### 💰 Saldo Necessário
- **Sepolia**: Mínimo 0.01 ETH para deploy e gas
- **Local**: ETH ilimitado (Anvil)

---

## 🚀 Deploy na Sepolia (Recomendado)

### 📝 Comando Simples
```bash
cd foundry
./scripts/deploy_sepolia.sh
```

### 🔍 O que o script faz:

1. **✅ Verificação de Pré-requisitos**
   - Foundry instalado
   - Variáveis de ambiente configuradas
   - Saldo suficiente na carteira

2. **🔨 Compilação e Testes**
   - Limpa cache anterior
   - Compila contratos
   - Executa todos os testes

3. **🧪 Simulação**
   - Simula deploy antes de executar
   - Verifica se tudo está correto

4. **🚀 Deploy Real**
   - Executa deploy na Sepolia
   - Verifica contrato no Etherscan
   - Gera logs detalhados

5. **📊 Documentação**
   - Salva endereço do contrato
   - Gera relatório completo
   - Atualiza READMEs

### 📁 Arquivos Gerados
```
foundry/
├── logs/
│   ├── deploy_sepolia_YYYYMMDD_HHMMSS.log    # Log completo
│   └── deploy_report_sepolia_YYYYMMDD_HHMMSS.md  # Relatório
├── deployed_address_sepolia.txt              # Endereço do contrato
└── README.md.backup.YYYYMMDD_HHMMSS          # Backup do README
```

---

## 🏠 Deploy Local (Desenvolvimento)

### 📝 Comando
```bash
cd foundry

# Iniciar Anvil (blockchain local)
anvil --port 8545

# Em outro terminal, fazer deploy
export PRIVATE_KEY=0x[REDACTED_FOR_SECURITY]
forge script script/DeployLoan.s.sol --rpc-url http://localhost:8545 --broadcast
```

### 📊 Endereços Locais
- **Anvil**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Contrato**: Deployado automaticamente

---

## 🔍 Verificação do Deploy

### 📊 Etherscan (Sepolia)
Após o deploy, verifique no Etherscan:
```
https://sepolia.etherscan.io/address/CONTRACT_ADDRESS
```

### 🧪 Teste do Contrato
```bash
# Verificar se contrato existe
cast code CONTRACT_ADDRESS --rpc-url $SEPOLIA_RPC_URL

# Testar função loanCount
cast call CONTRACT_ADDRESS "loanCount()" --rpc-url $SEPOLIA_RPC_URL
```

---

## 📚 Endereços de Deploy

### 🏠 Local (Anvil)
- **Contrato**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Rede**: Localhost:8545
- **Status**: ✅ Funcionando

### 🔗 Sepolia
- **Contrato**: `0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e`
- **Rede**: Sepolia Testnet
- **Status**: ✅ Deployado
- **Etherscan**: [Ver contrato](https://sepolia.etherscan.io/address/0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e)

---

## 🛠️ Troubleshooting

### ❌ Erro: "Foundry não está instalado"
```bash
# Instalar Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### ❌ Erro: "Saldo insuficiente"
- Obtenha ETH de Sepolia: https://sepoliafaucet.com/
- Verifique se a PRIVATE_KEY está correta

### ❌ Erro: "Variáveis de ambiente não definidas"
- Verifique se o arquivo `.env` existe
- Confirme se as variáveis estão corretas

### ❌ Erro: "Testes falharam"
```bash
# Executar testes manualmente
forge test -vv

# Verificar logs de erro
forge test --verbosity 4
```

---

## 📖 Comandos Úteis

### 🔍 Verificar Saldo
```bash
cast balance WALLET_ADDRESS --rpc-url $SEPOLIA_RPC_URL
```

### 📊 Verificar Contrato
```bash
cast code CONTRACT_ADDRESS --rpc-url $SEPOLIA_RPC_URL
```

### 🧪 Executar Testes
```bash
forge test -vv
```

### 🔨 Compilar
```bash
forge build --force
```

---

## 📄 Relatórios de Deploy

### 📊 Estrutura do Relatório
O script gera relatórios automáticos em `foundry/logs/`:

```markdown
# 🚀 Relatório de Deploy - Sepolia

## 📅 Informações Gerais
- Data/Hora: 2024-01-15 14:30:00
- Executado por: fsegall
- Script: deploy_sepolia.sh
- Versão: 1.0

## 🔗 Contrato
- Nome: LoanManager.sol
- Endereço: 0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2
- Rede: Sepolia Testnet
- Etherscan: https://sepolia.etherscan.io/address/0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2

## 👤 Carteira
- Endereço: 0x...
- Saldo inicial: 0.5 ETH

## 📊 Status
- Compilação: ✅ Sucesso
- Testes: ✅ Passaram
- Simulação: ✅ Sucesso
- Deploy: ✅ Confirmado
- Verificação: ✅ Etherscan
```

---

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **🧪 Testar Contrato**
   - Criar empréstimo de teste
   - Testar financiamento
   - Testar reembolso

2. **🔗 Integrar Frontend**
   - Atualizar endereço no frontend
   - Testar integração Viem
   - Verificar sincronização Supabase

3. **📚 Documentar**
   - Atualizar READMEs
   - Registrar endereços
   - Documentar mudanças

---

## 📞 Suporte

- **Issues**: GitHub Issues
- **Documentação**: Este README
- **Scripts**: `foundry/scripts/`
- **Logs**: `foundry/logs/`

---

**🏦 ZKFinance - Deploy de Smart Contracts Documentado e Automatizado** 