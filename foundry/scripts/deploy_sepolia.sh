#!/bin/bash

# 🚀 Script de Deploy Simplificado - Sepolia
# Versão corrigida

set -e

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️  $1${NC}"
}

echo "=================================================================="
echo "🚀 DEPLOY SMART CONTRACT LOANMANAGER - SEPOLIA"
echo "=================================================================="
echo "📅 Data/Hora: $(date)"
echo "=================================================================="

# 1. Verificar Foundry
log "1️⃣ Verificando Foundry..."
if ! command -v forge &> /dev/null; then
    error "Foundry não está instalado"
    exit 1
fi
log "✅ Foundry encontrado"

# 2. Carregar .env
log "2️⃣ Carregando variáveis de ambiente..."
if [ ! -f "../.env" ]; then
    error "Arquivo .env não encontrado"
    exit 1
fi

# Carregar variáveis de forma mais segura
export $(grep -v '^#' ../.env | xargs)

if [ -z "$SEPOLIA_RPC_URL" ] || [ -z "$PRIVATE_KEY" ]; then
    error "SEPOLIA_RPC_URL ou PRIVATE_KEY não definidas"
    exit 1
fi

log "✅ Variáveis carregadas"

# 3. Compilar
log "3️⃣ Compilando contratos..."
forge clean
forge build --force
log "✅ Contratos compilados"

# 4. Testes
log "4️⃣ Executando testes..."
if forge test --silent; then
    log "✅ Testes passaram"
else
    error "❌ Testes falharam"
    exit 1
fi

# 5. Deploy
log "5️⃣ Fazendo deploy na Sepolia..."

# Criar diretório para logs
mkdir -p logs
DEPLOY_LOG="logs/deploy_sepolia_$(date +%Y%m%d_%H%M%S).log"

# Executar deploy
forge script scripts/DeployLoan.s.sol \
    --rpc-url "$SEPOLIA_RPC_URL" \
    --private-key "$PRIVATE_KEY" \
    --broadcast \
    --verify 2>&1 | tee "$DEPLOY_LOG"

# 6. Extrair endereço
log "6️⃣ Extraindo endereço do contrato..."

CONTRACT_ADDRESS=$(grep -o "Contract Address: 0x[a-fA-F0-9]\{40\}" "$DEPLOY_LOG" | head -1 | cut -d' ' -f3)

if [ -n "$CONTRACT_ADDRESS" ]; then
    log "✅ Deploy bem-sucedido!"
    log "📋 Endereço: $CONTRACT_ADDRESS"
    
    # Salvar endereço
    echo "$CONTRACT_ADDRESS" > "deployed_address_sepolia.txt"
    log "💾 Endereço salvo em: deployed_address_sepolia.txt"
    
    # Etherscan URL
    ETHERSCAN_URL="https://sepolia.etherscan.io/address/$CONTRACT_ADDRESS"
    log "🔍 Etherscan: $ETHERSCAN_URL"
    
else
    error "❌ Não foi possível extrair o endereço"
    log "📄 Log completo: $DEPLOY_LOG"
    exit 1
fi

# 7. Relatório final
echo ""
echo "=================================================================="
echo "🎉 DEPLOY CONCLUÍDO!"
echo "=================================================================="
echo "📋 Contrato: $CONTRACT_ADDRESS"
echo "🔍 Etherscan: $ETHERSCAN_URL"
echo "📄 Log: $DEPLOY_LOG"
echo "=================================================================="

log "🚀 Contrato pronto para uso na Sepolia!" 