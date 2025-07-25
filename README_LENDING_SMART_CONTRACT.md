# 🏦 **Smart Contract de Empréstimo - ZKFinance**

## 🎯 **Visão Geral**

Este documento descreve o sistema completo de empréstimos descentralizados da ZKFinance, integrando:
- **Smart Contract EVM** (Foundry/Solidity)
- **Provas ZK** (zk-credit)
- **Verificação Blockchain** (ZKVerify)
- **Sistema de Roles** (Supabase/DDD)

---

## 🏗️ **Arquitetura do Sistema**

### 🔄 **Fluxo Completo de Empréstimo:**

```
1. Usuário (Borrower) → Frontend
2. Frontend → API Local → Análise de Crédito
3. API → zk-credit → Geração de Prova ZK
4. zk-credit → ZKVerify → Verificação na Blockchain
5. ZKVerify → Smart Contract → Criação do Empréstimo
6. Smart Contract → Supabase → Persistência de Dados
7. Supabase → Frontend → Atualização da Interface
```

### 📦 **Componentes Integrados:**

- **`foundry/src/LoanManager.sol`**: Contrato principal de empréstimos
- **`zk-credit/`**: Geração e verificação de provas ZK
- **`supabase/schema/`**: Sistema de roles e persistência
- **`client/`**: Interface de usuário

---

## 🔒 **Smart Contract: LoanManager.sol**

### 📋 **Estrutura de Dados:**

```solidity
struct LoanRequest {
    address borrower;           // Endereço do tomador
    uint256 amount;            // Valor solicitado
    uint256 fundedAmount;      // Valor já financiado
    uint256 deadline;          // Prazo de vencimento
    uint256 interestRate;      // Taxa de juros (%)
    bytes32 zkCommitmentHash;  // Hash da prova ZK
    address[] funders;         // Lista de financiadores
    mapping(address => uint256) contributions; // Contribuições
    bool repaid;               // Status de reembolso
}
```

### 🚀 **Funções Principais:**

#### **1. createLoanRequest()**
```solidity
function createLoanRequest(
    uint256 amount,
    uint256 durationInDays,
    uint256 interestRate,
    bytes32 zkCommitmentHash
) external
```
- **Propósito**: Criar novo pedido de empréstimo
- **Validação**: Requer prova ZK válida
- **Evento**: `LoanRequested`

#### **2. fundLoan()**
```solidity
function fundLoan(uint256 loanId) external payable
```
- **Propósito**: Financiar empréstimo existente
- **Validação**: Prazo não expirado, valor dentro do limite
- **Evento**: `LoanFunded`

#### **3. repayLoan()**
```solidity
function repayLoan(uint256 loanId) external payable
```
- **Propósito**: Reembolsar empréstimo com juros
- **Validação**: Apenas borrower, valor suficiente
- **Evento**: `LoanRepaid`

---

## 🔐 **Integração ZKVerify**

### 🔗 **Ponte ZK → Smart Contract:**

```javascript
// 1. Gerar prova ZK
const proofResult = await generateCreditProof({
    score: "750",
    threshold: "700"
});

// 2. Verificar na ZKVerify
const verification = await session
    .verify()
    .groth16({ library: Library.snarkjs, curve: CurveType.bn128 })
    .execute({
        proofData: { vk, proof, publicSignals },
        domainId: 1
    });

// 3. Criar empréstimo no smart contract
const loanContract = new ethers.Contract(ADDRESS, ABI, signer);
await loanContract.createLoanRequest(
    amount,
    duration,
    interestRate,
    ethers.utils.keccak256(JSON.stringify(proof))
);
```

### 🎯 **Validação em Duas Camadas:**

1. **ZKVerify**: Verifica a prova ZK na blockchain
2. **Smart Contract**: Valida o hash da prova e executa a lógica

---

## 👥 **Sistema de Roles (DDD)**

### 🏛️ **Domain Driven Design:**

#### **Entidades de Domínio:**

```sql
-- Perfis de Usuário
CREATE TABLE profiles (
    id uuid PRIMARY KEY,
    full_name text,
    wallet_address text,
    role_selection text,  -- 'borrower', 'investor', 'admin'
    is_onboarded boolean
);

-- Roles Específicas
CREATE TABLE user_roles (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    role USER-DEFINED NOT NULL,  -- Enum: 'borrower', 'investor', 'admin'
    created_at timestamp
);

-- Empréstimos
CREATE TABLE loans (
    id uuid PRIMARY KEY,
    creator_id uuid REFERENCES auth.users(id),
    title text,
    amount numeric,
    interest_rate numeric,
    status text,  -- 'pending', 'funded', 'repaid', 'defaulted'
    blockchain_tx_hash text,  -- Hash da transação no smart contract
    zk_proof_hash text       -- Hash da prova ZK
);

-- Investimentos
CREATE TABLE investments (
    id uuid PRIMARY KEY,
    loan_id uuid REFERENCES loans(id),
    investor_id uuid REFERENCES auth.users(id),
    amount numeric,
    status text,  -- 'pending', 'confirmed', 'repaid'
    blockchain_tx_hash text
);
```

### 🔄 **Sincronização Smart Contract ↔ Supabase:**

```javascript
// Serviço de integração
class LoanIntegrationService {
    async createLoan(loanData, zkProof) {
        // 1. Criar no smart contract
        const tx = await this.contract.createLoanRequest(
            loanData.amount,
            loanData.duration,
            loanData.interestRate,
            zkProof.hash
        );
        
        // 2. Persistir no Supabase
        await this.supabase.from('loans').insert({
            creator_id: loanData.userId,
            title: loanData.title,
            amount: loanData.amount,
            interest_rate: loanData.interestRate,
            status: 'pending',
            blockchain_tx_hash: tx.hash,
            zk_proof_hash: zkProof.hash
        });
        
        return { contractTx: tx, dbRecord: loanRecord };
    }
}
```

---

## 🧪 **Testes e Deploy**

### 🧪 **Testes Locais:**

```bash
# Executar testes Foundry
cd foundry
forge test -vv

# Testes específicos
forge test --match-test testCreateLoan -vv
forge test --match-test testFundLoan -vv
forge test --match-test testRepayLoan -vv
```

### 🚀 **Deploy em Testnet:**

```bash
# Deploy local (Anvil)
forge script script/DeployLoan.s.sol --rpc-url http://localhost:8545 --broadcast

# Deploy Sepolia
forge script script/DeployLoan.s.sol \
    --rpc-url $SEPOLIA_RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --verify
```

### 📊 **Endereços de Deploy:**

- **Local (Anvil)**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Sepolia**: `0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e`

---

## 🔧 **Configuração e Setup**

### 📋 **Pré-requisitos:**

1. **Foundry instalado**
2. **Node.js e dependências**
3. **Variáveis de ambiente configuradas**
4. **Supabase configurado**

### ⚙️ **Variáveis de Ambiente:**

```bash
# Smart Contract
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key_here

# ZKVerify
ZKVERIFY_SEED_PHRASE=your_seed_phrase_here

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### 🚀 **Comandos de Setup:**

```bash
# 1. Instalar dependências
npm install

# 2. Configurar Foundry
cd foundry
forge install

# 3. Compilar contratos
forge build

# 4. Executar testes
forge test -vv

# 5. Deploy (opcional)
forge script script/DeployLoan.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

---

## 🎯 **Casos de Uso**

### 👤 **Borrower (Tomador):**

1. **Criar Pedido de Empréstimo:**
   - Submete dados de crédito
   - Sistema gera prova ZK
   - Prova é verificada na ZKVerify
   - Smart contract cria o empréstimo
   - Dados são persistidos no Supabase

2. **Receber Financiamento:**
   - Investidores financiam via smart contract
   - Sistema sincroniza com Supabase
   - Interface atualiza status

3. **Reembolsar:**
   - Paga via smart contract
   - Sistema atualiza status
   - Histórico é registrado

### 💰 **Investor (Investidor):**

1. **Explorar Empréstimos:**
   - Visualiza empréstimos disponíveis
   - Vê provas ZK verificadas
   - Analisa risco e retorno

2. **Financiar:**
   - Envia ETH via smart contract
   - Recebe confirmação
   - Investimento é registrado

3. **Receber Reembolso:**
   - Recebe automaticamente via smart contract
   - Histórico é atualizado

---

## 🔒 **Segurança e Validações**

### 🛡️ **Camadas de Segurança:**

1. **Prova ZK**: Garante que score > threshold sem revelar dados
2. **ZKVerify**: Verifica prova na blockchain
3. **Smart Contract**: Executa lógica de negócio
4. **Supabase**: Persiste dados e controla acesso

### ⚠️ **Validações Críticas:**

- **Score mínimo**: Prova ZK deve validar score > threshold
- **Prazo**: Empréstimos têm prazo definido
- **Valor**: Financiamento não pode exceder valor solicitado
- **Permissões**: Apenas borrower pode reembolsar

---

## 📈 **Métricas e Monitoramento**

### 📊 **KPIs do Sistema:**

- **Total de empréstimos criados**
- **Valor total financiado**
- **Taxa de reembolso**
- **Tempo médio de financiamento**
- **Distribuição de scores ZK**

### 🔍 **Logs e Debug:**

```javascript
// Logs de integração
console.log('🔗 Smart Contract → Supabase:', {
    loanId: loan.id,
    txHash: tx.hash,
    zkProofHash: zkProof.hash,
    status: 'created'
});
```

---

## 🚀 **Roadmap Futuro**

### 🔮 **Melhorias Planejadas:**

1. **Verificação On-chain**: Prova ZK verificada diretamente no smart contract
2. **Liquidations**: Sistema automático de liquidação
3. **Governance**: DAO para decisões de protocolo
4. **Cross-chain**: Suporte a múltiplas blockchains
5. **Insurance**: Sistema de seguro para investidores

---

## 📞 **Suporte e Contato**

- **Documentação**: Este README
- **Issues**: GitHub Issues
- **Smart Contract**: `foundry/src/LoanManager.sol`
- **Testes**: `foundry/test/LoanManager.t.sol`

---

**🏦 ZKFinance - Empréstimos Descentralizados com Zero-Knowledge Proofs** 