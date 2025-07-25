# Suporte a Redes Específicas: Sepolia (EVM) e Volta (Polkadot/ZK) - MVP

Este projeto está configurado para suportar especificamente duas redes com propósitos distintos para o MVP da ZK Finance.

## Redes Suportadas no MVP

### 1. Sepolia (EVM) - Contrato de Loans
- **Chain ID**: 11155111
- **Moeda**: ETH
- **RPC**: https://sepolia.infura.io/v3/
- **Explorer**: https://sepolia.etherscan.io/
- **Propósito**: Interação com o smart contract de empréstimos
- **Tipo**: Ethereum Testnet

### 2. Volta (Polkadot/ZK) - Provas ZK
- **Chain ID**: 73799
- **Moeda**: VOLT
- **RPC**: https://volta-rpc.zkverify.io
- **Explorer**: https://volta-explorer.zkverify.io
- **Propósito**: Submissão de provas ZK para ZKVerify
- **Tipo**: Polkadot Parachain

## Casos de Uso do MVP

### Sepolia (EVM) - Contrato de Loans
- ✅ Criação de empréstimos via smart contract (`foundry/src/LoanManager.sol`)
- ✅ Financiamento de empréstimos por investidores
- ✅ Reembolso de empréstimos por tomadores
- ✅ Gestão de colaterais
- ✅ Execução de transações DeFi

### Volta (Polkadot/ZK) - Provas ZK
- ✅ Submissão de provas ZK para ZKVerify
- ✅ Verificação de score de crédito
- ✅ Processamento de dados com privacidade
- ✅ Integração com ecossistema Polkadot
- ✅ Zero-knowledge proofs para compliance

## Configuração

### Redes Definidas (`lib/wagmi.ts`)
```typescript
const volta = {
  id: 73799,
  name: 'Volta',
  network: 'volta',
  nativeCurrency: {
    decimals: 18,
    name: 'VOLT',
    symbol: 'VOLT',
  },
  rpcUrls: {
    public: { http: ['https://volta-rpc.zkverify.io'] },
    default: { http: ['https://volta-rpc.zkverify.io'] },
  },
  blockExplorers: {
    etherscan: { name: 'Volta Explorer', url: 'https://volta-explorer.zkverify.io' },
    default: { name: 'Volta Explorer', url: 'https://volta-explorer.zkverify.io' },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'ZK Finance',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia, volta], // Sepolia (Loans) + Volta (ZK)
  ssr: true,
});
```

## Interface do Usuário

### WalletConnect Component
O componente agora mostra claramente o propósito de cada rede no MVP:

```typescript
const networks = [
  { 
    id: 11155111, 
    name: 'Sepolia', 
    description: 'Contrato de Loans EVM',
    icon: <Zap className="w-3 h-3" /> 
  },
  { 
    id: 73799, 
    name: 'Volta', 
    description: 'Provas ZK ZKVerify',
    icon: <CircleDot className="w-3 h-3" /> 
  },
];
```

### Identificação Visual
- **Sepolia**: Ícone ⚡ (Zap) - "Sepolia (EVM)" - Para contrato de loans
- **Volta**: Ícone 🔵 (CircleDot) - "Volta (ZK)" - Para provas ZK

## Fluxo de Uso do MVP

### 1. Para Contrato de Loans (Sepolia)
1. Conecte a carteira
2. Clique em "Mudar Redes"
3. Selecione "Sepolia - Contrato de Loans EVM"
4. Execute transações de empréstimo

### 2. Para Provas ZK (Volta)
1. Conecte a carteira
2. Clique em "Mudar Redes"
3. Selecione "Volta - Provas ZK ZKVerify"
4. Submeta provas ZK

## Carteiras Suportadas

### SubWallet (Recomendado)
- ✅ Suporte nativo ao Polkadot (Volta)
- ✅ Suporte ao EVM via bridge (Sepolia)
- ✅ Troca de redes automática
- ✅ Interface otimizada

### MetaMask
- ✅ Suporte completo ao EVM (Sepolia)
- ⚠️ Suporte limitado ao Polkadot (Volta via bridge)

### WalletConnect
- ✅ Suporte universal
- ✅ Conexão com múltiplas carteiras

## Vantagens da Configuração MVP

1. **Simplicidade**: Apenas 2 redes essenciais para o MVP
2. **Clareza**: Propósito específico para cada rede
3. **Performance**: Menos overhead de configuração
4. **UX**: Interface limpa e intuitiva
5. **Segurança**: Redes testnet para desenvolvimento
6. **Foco**: Funcionalidades específicas do MVP

## Traduções

Traduções específicas para o MVP:
- `wallet.switchNetworks` - "Mudar Redes"
- `wallet.connected` - "Conectado"
- `wallet.volta` - "Volta"
- `wallet.evm` - "EVM"

## Troubleshooting

### Não consegue conectar à Volta
- Verifique se a rede está adicionada no SubWallet
- Use o RPC: https://volta-rpc.zkverify.io
- Chain ID: 73799

### Não consegue conectar à Sepolia
- Verifique se a rede está adicionada na carteira
- Use o RPC: https://sepolia.infura.io/v3/
- Chain ID: 11155111

### Troca de rede não funciona
- Use o SubWallet para melhor suporte
- O Rainbow Kit gerencia automaticamente
- Verifique se a carteira suporta a rede

## Próximos Passos do MVP

1. **Implementar validação de rede** - Verificar se a rede correta está selecionada para cada ação
2. **Melhorar UX** - Guiar o usuário para a rede correta baseado na ação
3. **Testes** - Validar funcionamento em ambas as redes
4. **Lógica específica** - Implementar funcionalidades baseadas na rede selecionada 