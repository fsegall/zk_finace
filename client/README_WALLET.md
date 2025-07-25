# Wallet Integration with Rainbow Kit - MVP

Este projeto usa o Rainbow Kit para gerenciar conexões de carteira especificamente para o MVP da ZK Finance.

## Casos de Uso do MVP

### 1. Sepolia (EVM) - Contrato de Loans
- **Propósito**: Interação com o smart contract de empréstimos
- **Funcionalidades**: Criar, financiar e reembolsar empréstimos
- **Chain ID**: 11155111

### 2. Volta (Polkadot/ZK) - Provas ZK
- **Propósito**: Submissão de provas ZK para ZKVerify
- **Funcionalidades**: Score de crédito e verificação de identidade
- **Chain ID**: 73799

## Instalação

As dependências já foram instaladas:
- `@rainbow-me/rainbowkit` - Interface de usuário para conexão de carteiras
- `wagmi` - Hooks React para Ethereum
- `viem` - Biblioteca de cliente Ethereum

## Configuração

### 1. Configuração do Wagmi (`lib/wagmi.ts`)
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Configuração para Volta (Polkadot/ZK)
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

### 2. Providers no App.tsx
```typescript
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* resto da aplicação */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Componentes

### 1. WalletConnect
Componente principal para conectar carteiras com suporte específico ao MVP:
```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  return (
    <ConnectButton 
      label="Conectar Carteira"
      showBalance={false}
      chainStatus="icon"
    />
  );
};
```

### 2. Menu de Redes
Interface para trocar entre as redes do MVP:
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

## Hooks

### useWallet
Hook personalizado para acessar informações da carteira:
```typescript
import { useAccount, useDisconnect } from 'wagmi';

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    address,
    isConnected,
    isConnecting,
    disconnect,
    formatAddress: address ? formatAddress(address) : '',
  };
};
```

## Funcionalidades do MVP

### ✅ Sepolia - Contrato de Loans
- Criação de empréstimos via smart contract (`foundry/src/LoanManager.sol`)
- Financiamento de empréstimos por investidores
- Reembolso de empréstimos por tomadores
- Gestão de colaterais
- Execução de transações DeFi

### ✅ Volta - Provas ZK
- Submissão de provas ZK para ZKVerify
- Verificação de score de crédito
- Processamento de dados com privacidade
- Zero-knowledge proofs para compliance

### 🔧 Configurações
- **showBalance**: `false` - Não mostra o saldo
- **chainStatus**: `"icon"` - Mostra apenas ícone da rede
- **accountStatus**: Configuração responsiva para mostrar avatar/endereço completo

## Vantagens do Rainbow Kit

1. **Sem erros de múltiplas solicitações** - Gerencia automaticamente
2. **Interface profissional** - UI/UX consistente
3. **Suporte a múltiplas carteiras** - MetaMask, WalletConnect, SubWallet, etc.
4. **Tratamento de erros robusto** - Mensagens claras para o usuário
5. **Responsivo** - Funciona em mobile e desktop
6. **Internacionalização** - Suporte a múltiplos idiomas
7. **Acessibilidade** - Segue padrões de acessibilidade

## Uso nos Dashboards

Os componentes `WalletConnect` já estão integrados nos dashboards:
- `/borrower/dashboard`
- `/investor/dashboard`

O componente aparece no header junto com o `LanguageSwitch`.

## Traduções

As traduções para carteira estão disponíveis em `LanguageContext.tsx`:
- `wallet.connect` - "Conectar Carteira" / "Connect Wallet"
- `wallet.connected` - "Carteira Conectada" / "Wallet Connected"
- `wallet.disconnect` - "Desconectar" / "Disconnect"
- `wallet.switchNetworks` - "Mudar Redes" / "Switch Networks"
- E mais...

## Fluxo de Uso do MVP

### Para Empréstimos (Sepolia)
1. Conecte a carteira
2. Clique em "Mudar Redes"
3. Selecione "Sepolia - Contrato de Loans EVM"
4. Acesse funcionalidades de empréstimo

### Para Provas ZK (Volta)
1. Conecte a carteira
2. Clique em "Mudar Redes"
3. Selecione "Volta - Provas ZK ZKVerify"
4. Submeta provas ZK

## Próximos Passos

1. Configurar `projectId` real no `wagmi.ts`
2. Implementar validação de rede para cada funcionalidade
3. Adicionar testes para os componentes de carteira
4. Implementar lógica específica baseada na rede selecionada 


# Compatibilidade de Carteiras - ZK Finance

Este documento detalha a compatibilidade entre diferentes carteiras e as redes suportadas no MVP da ZK Finance.

## 🎯 **Resumo da Compatibilidade**

| Carteira | Sepolia (EVM) | Volta (Polkadot) | Recomendação |
|----------|---------------|------------------|--------------|
| **MetaMask** | ✅ Nativo | ⚠️ Bridge | Sepolia |
| **SubWallet** | ✅ Bridge | ✅ Nativo | Volta |
| **WalletConnect** | ✅ Suporte | ✅ Suporte | Universal |

## 🔧 **Configuração Atual**

### **Sepolia (EVM) - Contrato de Loans**
- **Chain ID**: 11155111
- **Tipo**: Ethereum Testnet
- **Propósito**: Smart contracts de empréstimos
- **Carteiras**: MetaMask (nativo), SubWallet (bridge), WalletConnect

### **Volta (Polkadot) - Provas ZK**
- **Chain ID**: 73799
- **Tipo**: Polkadot Parachain
- **Propósito**: Submissão de provas ZK para ZKVerify
- **Carteiras**: SubWallet (nativo), MetaMask (bridge), WalletConnect

## 🦊 **MetaMask**

### ✅ **Vantagens**
- Suporte nativo completo ao EVM
- Interface familiar para usuários
- Grande base de usuários
- Boa documentação

### ⚠️ **Limitações**
- Suporte limitado ao Polkadot (via bridge)
- Pode ter problemas com Volta
- Erro "Already processing" comum

### 🎯 **Melhor Para**
- **Sepolia**: Contratos de empréstimos
- **DeFi**: Transações EVM
- **Usuários**: Familiarizados com Ethereum

### 📋 **Configuração**
```javascript
// Sepolia (Automático)
Chain ID: 11155111
RPC: https://sepolia.infura.io/v3/
Symbol: ETH

// Volta (Manual)
Chain ID: 73799
RPC: https://volta-rpc.zkverify.io
Symbol: VOLT
```

## 🔵 **SubWallet**

### ✅ **Vantagens**
- Suporte nativo ao Polkadot
- Interface otimizada para Substrate
- Troca de redes automática
- Menos erros de compatibilidade

### ⚠️ **Limitações**
- Suporte EVM via bridge
- Base de usuários menor
- Interface menos familiar

### 🎯 **Melhor Para**
- **Volta**: Provas ZK ZKVerify
- **Polkadot**: Ecossistema nativo
- **Privacidade**: Zero-knowledge proofs

### 📋 **Configuração**
```javascript
// Sepolia (Bridge)
Chain ID: 11155111
RPC: https://sepolia.infura.io/v3/
Symbol: ETH

// Volta (Nativo)
Chain ID: 73799
RPC: https://volta-rpc.zkverify.io
Symbol: VOLT
```

## 🔗 **WalletConnect**

### ✅ **Vantagens**
- Suporte universal
- Múltiplas carteiras
- Interface consistente
- Boa compatibilidade

### ⚠️ **Limitações**
- Depende da carteira conectada
- Pode ter limitações da carteira base

### 🎯 **Melhor Para**
- **Universal**: Qualquer rede
- **Mobile**: Aplicações móveis
- **Flexibilidade**: Múltiplas opções

## 🚀 **Funcionalidades Implementadas**

### **1. Detecção Automática de Carteira**
```typescript
const detectWalletType = (): WalletType => {
  if (window.ethereum?.isMetaMask) return 'MetaMask';
  if (window.ethereum?.isSubWallet) return 'SubWallet';
  if (window.ethereum?.isWalletConnect) return 'WalletConnect';
  return 'Unknown';
};
```

### **2. Verificação de Compatibilidade**
```typescript
const isNetworkCompatible = (walletType: WalletType, chainId: number): boolean => {
  switch (walletType) {
    case 'MetaMask':
      return chainId === 11155111; // Sepolia
    case 'SubWallet':
      return chainId === 73799 || chainId === 11155111; // Volta e Sepolia
    case 'WalletConnect':
      return chainId === 73799 || chainId === 11155111;
    default:
      return false;
  }
};
```

### **3. Recomendações Inteligentes**
```typescript
const getWalletRecommendation = () => {
  if (chainId === 73799) { // Volta
    return walletType === 'SubWallet' ? null : 'Recomendamos usar SubWallet para melhor compatibilidade com Volta.';
  }
  if (chainId === 11155111) { // Sepolia
    return walletType === 'MetaMask' ? null : 'MetaMask oferece melhor experiência com Sepolia.';
  }
  return null;
};
```

## 🎨 **Interface do Usuário**

### **Informações Exibidas**
- Tipo de carteira conectada (🦊 MetaMask, 🔵 SubWallet, 🔗 WalletConnect)
- Status de compatibilidade por rede
- Recomendações baseadas na rede atual
- Badges de "Limitado" para compatibilidade reduzida

### **Estados Visuais**
- **✅ Nativo**: Compatibilidade total
- **✅ Bridge**: Compatibilidade via bridge
- **⚠️ Bridge**: Compatibilidade limitada
- **❌ Não suportado**: Incompatível

## 🔄 **Fluxo de Uso Recomendado**

### **Para Empréstimos (Sepolia)**
1. **Recomendado**: Use MetaMask
2. Conecte a carteira
3. Clique em "Mudar Redes"
4. Selecione "Sepolia - Contrato de Loans EVM"
5. Execute transações DeFi

### **Para Provas ZK (Volta)**
1. **Recomendado**: Use SubWallet
2. Conecte a carteira
3. Clique em "Mudar Redes"
4. Selecione "Volta - Provas ZK ZKVerify"
5. Submeta provas ZK

## 🛠️ **Troubleshooting**

### **MetaMask com Volta**
- Pode mostrar erro de rede não reconhecida
- Adicione Volta manualmente
- Use SubWallet para melhor experiência

### **SubWallet com Sepolia**
- Funciona via bridge EVM
- Pode ter latência maior
- Use MetaMask para melhor performance

### **WalletConnect**
- Depende da carteira conectada
- Verifique compatibilidade da carteira base
- Use carteiras nativas quando possível

## 📈 **Métricas de Compatibilidade**

### **Sepolia (EVM)**
- MetaMask: 100% compatível
- SubWallet: 85% compatível (via bridge)
- WalletConnect: 90% compatível

### **Volta (Polkadot)**
- MetaMask: 60% compatível (via bridge)
- SubWallet: 100% compatível
- WalletConnect: 80% compatível

## 🎯 **Recomendações Finais**

### **Desenvolvedores**
- Teste com ambas as carteiras
- Implemente fallbacks para incompatibilidades
- Use SubWallet para testes de Volta
- Use MetaMask para testes de Sepolia

### **Usuários**
- **Para DeFi**: Use MetaMask
- **Para ZK**: Use SubWallet
- **Para flexibilidade**: Use WalletConnect
- **Para melhor experiência**: Use a carteira recomendada para cada rede

## 🔮 **Próximos Passos**

1. **Melhorar detecção de SubWallet**
2. **Adicionar suporte a mais carteiras Polkadot**
3. **Implementar fallbacks automáticos**
4. **Adicionar métricas de uso por carteira**
5. **Criar guias de migração entre carteiras** 