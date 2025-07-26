# ⚖️ Módulo `foundry/` — Contrato Inteligente de Empréstimo 

Este módulo contém o contrato inteligente responsável por formalizar e executar os empréstimos da plataforma ZKFinance. Utiliza o framework [Foundry](https://book.getfoundry.sh/) para desenvolvimento, teste e deploy em redes EVM.

---

## 🎯 Objetivo

- Registrar pedidos de empréstimo com validação ZK
- Permitir financiamento peer-to-peer com controle de saldo
- Controlar reembolso, prazo e juros
- Integrar com provas ZK via hash de compromisso

---

## ⚙️ Stack

- [Foundry](https://book.getfoundry.sh/)
- Solidity >= 0.8.19
- Testnet Ethereum (Sepolia)
- Viem (no frontend) para interação
- zk-credit para validação prévia

---

## 📁 Estrutura do Projeto

```
foundry/
├── src/
│   └── LoanManager.sol         # Contrato principal
├── scripts/
│   └── DeployLoan.s.sol        # Script de deploy
├── test/
│   └── LoanManager.t.sol       # Testes com Forge
├── broadcast/                  # Histórico de deploys
├── foundry.toml               # Configuração do Foundry
└── README_FOUNDRY.md          # Este arquivo
```

---

## 🔒 Contrato LoanManager - Funções Reais

### 📋 Estrutura de Dados

```solidity
struct LoanRequest {
    address borrower;           // Endereço do tomador
    uint256 amount;            // Valor solicitado
    uint256 fundedAmount;      // Valor já financiado
    uint256 deadline;          // Prazo de vencimento
    uint256 interestRate;      // Taxa de juros (%)
    bytes32 zkCommitmentHash;  // Hash do compromisso ZK
    address[] funders;         // Lista de financiadores
    mapping(address => uint256) contributions; // Contribuições por financiador
    bool repaid;               // Status de quitação
}
```

### 🚀 Funções Principais

#### `createLoanRequest()`
```solidity
function createLoanRequest(
    uint256 amount,
    uint256 durationInDays,
    uint256 interestRate,
    bytes32 zkCommitmentHash
) external
```
- **Cria** um novo pedido de empréstimo
- **Validações**: valor > 0, prazo > 0
- **Armazena**: hash do compromisso ZK para validação
- **Emit**: `LoanRequested(id, borrower)`

#### `fundLoan()`
```solidity
function fundLoan(uint256 loanId) external payable
```
- **Financia** um empréstimo existente
- **Validações**: prazo válido, não quitado, valor > 0, não excede limite
- **Registra**: contribuição do financiador
- **Emit**: `LoanFunded(id, funder, amount)`

#### `repayLoan()`
```solidity
function repayLoan(uint256 loanId) external payable
```
- **Quita** o empréstimo com juros
- **Validações**: apenas tomador, não quitado, prazo vencido, totalmente financiado
- **Calcula**: valor total com juros
- **Distribui**: pagamentos para financiadores
- **Emit**: `LoanRepaid(id)`

### 📖 Funções de Consulta

#### `getLoan()`
```solidity
function getLoan(uint256 loanId) external view returns (
    address borrower,
    uint256 amount,
    uint256 fundedAmount,
    uint256 deadline,
    uint256 interestRate,
    bytes32 zkCommitmentHash,
    bool repaid,
    address[] memory funders
)
```
- **Retorna** todos os dados de um empréstimo
- **Inclui**: lista de financiadores

#### `getContribution()`
```solidity
function getContribution(uint256 loanId, address funder) external view returns (uint256)
```
- **Retorna** valor contribuído por um financiador específico

#### `loanCount()`
```solidity
function loanCount() external view returns (uint256)
```
- **Retorna** número total de empréstimos

---

## 🧪 Testes

Execute os testes com verbosidade estendida:

```bash
forge test -vv
```

### 📋 Casos de Teste

- ✅ Criação de pedido de empréstimo
- ✅ Financiamento de empréstimo
- ✅ Quitação com juros
- ✅ Validações de segurança
- ✅ Tentativas inválidas

---

## 🚀 Deploy

### 🔧 Pré-requisitos

1. **Variáveis de ambiente**:
   ```bash
   export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
   export PRIVATE_KEY="0x..."
   ```

2. **Saldo de Sepolia ETH** para gas

### 📦 Comando de Deploy

```bash
forge script scripts/DeployLoan.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

### 📍 Contratos Deployados

- **Último deploy**: `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2` (Sepolia)
- **Data**: 2025-07-25
- **Rede**: Sepolia Testnet

---

## 🔗 Integração com Frontend

### 📡 Interação via Viem

```typescript
// Exemplo de criação de empréstimo
const { request } = await walletClient.writeContract({
  address: '0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2',
  abi: LoanManagerABI,
  functionName: 'createLoanRequest',
  args: [amount, durationInDays, interestRate, zkCommitmentHash]
});

// Exemplo de financiamento
const { request } = await walletClient.writeContract({
  address: '0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2',
  abi: LoanManagerABI,
  functionName: 'fundLoan',
  args: [loanId],
  value: fundingAmount
});
```

### 🔐 Validação ZK

- O **hash do compromisso ZK** é armazenado no contrato
- A **validação da prova** é feita off-chain antes da criação
- O **contrato confia** no hash fornecido pelo frontend

---

## ⚙️ Scripts e Comandos

### 🧪 Testes locais
```bash
forge test -vv
```

### 🔨 Compilação
```bash
forge build
```

### 📊 Análise de gas
```bash
forge test --gas-report
```

### 🚀 Deploy para Sepolia
```bash
forge script scripts/DeployLoan.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

---

## ✅ Pré-requisitos

- [Foundry](https://book.getfoundry.sh/) instalado
- Node.js >= 18
- Variáveis de ambiente configuradas:
  - `SEPOLIA_RPC_URL`
  - `PRIVATE_KEY` (com saldo de SepoliaETH)

---

## 🔐 Segurança

### ⚠️ Considerações Importantes

- **Nunca compartilhe** o conteúdo do `.env`
- **Adicione** `.env` ao `.gitignore`
- **Valide** provas ZK antes de chamar o contrato
- **Teste** extensivamente antes do deploy em mainnet

### 🛡️ Validações do Contrato

- ✅ Valores positivos
- ✅ Prazos válidos
- ✅ Permissões de usuário
- ✅ Estados corretos
- ✅ Limites de financiamento

---

## 💡 Extensões Futuras

### 🔮 Roadmap

- [ ] **Verificação on-chain** de provas ZK
- [ ] **Múltiplos financiadores** por pedido
- [ ] **Sistema de reputação** on-chain
- [ ] **Penalidades automáticas** por atraso
- [ ] **Histórico completo** de transações
- [ ] **Governança** descentralizada

### 🔧 Melhorias Técnicas

- [ ] **Otimização de gas** para operações em lote
- [ ] **Upgradeability** via proxy pattern
- [ ] **Eventos mais detalhados** para indexação
- [ ] **Interface padrão** (ERC-4626)

---

## 🧾 Histórico de Deploys

| Data | Endereço | Rede | Status |
|------|----------|------|--------|
| 2024-12-25 | `0x4923d19707d957d9d9dfa9ddbb04a23276b37dc2` | Sepolia | ✅ Ativo |
| 2024-01-15 | `0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e` | Sepolia | ❌ Deprecated |

---

## 👨‍💻 Desenvolvimento

**Desenvolvido por**: Felipe Segall  
**Projeto**: ZKFinance - Plataforma de Empréstimos com ZK  
**Versão**: 1.0.0  
**Licença**: MIT

---

## 📞 Suporte

Para dúvidas técnicas ou problemas:
- **Issues**: GitHub do projeto
- **Documentação**: Este README
- **Contrato**: Verificado no Etherscan Sepolia
