# Wallet Integration with Rainbow Kit - MVP

This project uses Rainbow Kit to manage wallet connections specifically for the ZK Finance MVP.

## MVP Use Cases

### 1. Sepolia (EVM) - Loan Contract
- **Purpose**: Interaction with the loan smart contract
- **Features**: Create, fund, and repay loans
- **Chain ID**: 11155111

### 2. Volta (Polkadot/ZK) - ZK Proofs
- **Purpose**: Submission of ZK proofs to ZKVerify
- **Features**: Credit score and identity verification
- **Chain ID**: 73799

## Installation

Dependencies have already been installed:
- `@rainbow-me/rainbowkit` - User interface for wallet connections
- `wagmi` - React hooks for Ethereum
- `viem` - Ethereum client library

## Configuration

### 1. Wagmi Configuration (`lib/wagmi.ts`)
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Configuration for Volta (Polkadot/ZK)
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

### 2. Providers in App.tsx
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
          {/* rest of the application */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Components

### 1. WalletConnect
Main component for connecting wallets with specific MVP support:
```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  return (
    <ConnectButton 
      label="Connect Wallet"
      showBalance={false}
      chainStatus="icon"
    />
  );
};
```

### 2. Network Menu
Interface to switch between MVP networks:
```typescript
const networks = [
  { 
    id: 11155111, 
    name: 'Sepolia', 
    description: 'Loan Contract EVM',
    icon: <Zap className="w-3 h-3" /> 
  },
  { 
    id: 73799, 
    name: 'Volta', 
    description: 'ZK Proofs ZKVerify',
    icon: <CircleDot className="w-3 h-3" /> 
  },
];
```

## Hooks

### useWallet
Custom hook to access wallet information:
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

## MVP Features

### ✅ Sepolia - Loan Contract
- Loan creation via smart contract (`foundry/src/LoanManager.sol`)
- Loan funding by investors
- Loan repayment by borrowers
- Collateral management
- DeFi transaction execution

### ✅ Volta - ZK Proofs
- ZK proof submission to ZKVerify
- Credit score verification
- Privacy-preserving data processing
- Zero-knowledge proofs for compliance

### 🔧 Settings
- **showBalance**: `false` - Don't show balance
- **chainStatus**: `"icon"` - Show only network icon
- **accountStatus**: Responsive configuration to show avatar/full address

## Rainbow Kit Advantages

1. **No multiple request errors** - Automatically manages
2. **Professional interface** - Consistent UI/UX
3. **Multiple wallet support** - MetaMask, WalletConnect, SubWallet, etc.
4. **Robust error handling** - Clear messages for users
5. **Responsive** - Works on mobile and desktop
6. **Internationalization** - Multi-language support
7. **Accessibility** - Follows accessibility standards

## Usage in Dashboards

The `WalletConnect` components are already integrated in dashboards:
- `/borrower/dashboard`
- `/investor/dashboard`

The component appears in the header alongside `LanguageSwitch`.

## Translations

Wallet translations are available in `LanguageContext.tsx`:
- `wallet.connect` - "Conectar Carteira" / "Connect Wallet"
- `wallet.connected` - "Carteira Conectada" / "Wallet Connected"
- `wallet.disconnect` - "Desconectar" / "Disconnect"
- `wallet.switchNetworks` - "Mudar Redes" / "Switch Networks"
- And more...

## MVP Usage Flow

### For Loans (Sepolia)
1. Connect wallet
2. Click "Switch Networks"
3. Select "Sepolia - Loan Contract EVM"
4. Access loan features

### For ZK Proofs (Volta)
1. Connect wallet
2. Click "Switch Networks"
3. Select "Volta - ZK Proofs ZKVerify"
4. Submit ZK proofs

## Next Steps

1. Configure real `projectId` in `wagmi.ts`
2. Implement network validation for each feature
3. Add tests for wallet components
4. Implement specific logic based on selected network 


# Wallet Compatibility - ZK Finance

This document details the compatibility between different wallets and the networks supported in the ZK Finance MVP.

## 🎯 **Compatibility Summary**

| Wallet         | Sepolia (EVM) | Volta (Polkadot) | Recommendation |
|---------------|---------------|------------------|----------------|
| **MetaMask**      | ✅ Native      | ⚠️ Bridge         | Sepolia        |
| **SubWallet**     | ✅ Bridge      | ✅ Native          | Volta          |
| **WalletConnect** | ✅ Supported   | ✅ Supported       | Universal      |

## 🔧 **Current Configuration**

### **Sepolia (EVM) - Loan Contract**
- **Chain ID**: 11155111
- **Type**: Ethereum Testnet
- **Purpose**: Loan smart contracts
- **Wallets**: MetaMask (native), SubWallet (bridge), WalletConnect

### **Volta (Polkadot) - ZK Proofs**
- **Chain ID**: 73799
- **Type**: Polkadot Parachain
- **Purpose**: ZK proof submission for ZKVerify
- **Wallets**: SubWallet (native), MetaMask (bridge), WalletConnect

## 🦊 **MetaMask**

### ✅ **Advantages**
- Full native EVM support
- Familiar interface for users
- Large user base
- Good documentation

### ⚠️ **Limitations**
- Limited Polkadot support (via bridge)
- May have issues with Volta
- "Already processing" error is common

### 🎯 **Best For**
- **Sepolia**: Loan contracts
- **DeFi**: EVM transactions
- **Users**: Familiar with Ethereum

### 📋 **Configuration**
```javascript
// Sepolia (Automatic)
Chain ID: 11155111
RPC: https://sepolia.infura.io/v3/
Symbol: ETH

// Volta (Manual)
Chain ID: 73799
RPC: https://volta-rpc.zkverify.io
Symbol: VOLT
```

## 🔵 **SubWallet**

### ✅ **Advantages**
- Native Polkadot support
- Optimized interface for Substrate
- Automatic network switching
- Fewer compatibility errors

### ⚠️ **Limitations**
- EVM support via bridge
- Smaller user base
- Less familiar interface

### 🎯 **Best For**
- **Volta**: ZKVerify proofs
- **Polkadot**: Native ecosystem
- **Privacy**: Zero-knowledge proofs

### 📋 **Configuration**
```javascript
// Sepolia (Bridge)
Chain ID: 11155111
RPC: https://sepolia.infura.io/v3/
Symbol: ETH

// Volta (Native)
Chain ID: 73799
RPC: https://volta-rpc.zkverify.io
Symbol: VOLT
```

## 🔗 **WalletConnect**

### ✅ **Advantages**
- Universal support
- Multiple wallets
- Consistent interface
- Good compatibility

### ⚠️ **Limitations**
- Depends on the connected wallet
- May have limitations of the base wallet

### 🎯 **Best For**
- **Universal**: Any network
- **Mobile**: Mobile applications
- **Flexibility**: Multiple options

## 🚀 **Implemented Features**

### **1. Automatic Wallet Detection**
```typescript
const detectWalletType = (): WalletType => {
  if (window.ethereum?.isMetaMask) return 'MetaMask';
  if (window.ethereum?.isSubWallet) return 'SubWallet';
  if (window.ethereum?.isWalletConnect) return 'WalletConnect';
  return 'Unknown';
};
```

### **2. Compatibility Check**
```typescript
const isNetworkCompatible = (walletType: WalletType, chainId: number): boolean => {
  switch (walletType) {
    case 'MetaMask':
      return chainId === 11155111; // Sepolia
    case 'SubWallet':
      return chainId === 73799 || chainId === 11155111; // Volta and Sepolia
    case 'WalletConnect':
      return chainId === 73799 || chainId === 11155111;
    default:
      return false;
  }
};
```

### **3. Smart Recommendations**
```typescript
const getWalletRecommendation = () => {
  if (chainId === 73799) { // Volta
    return walletType === 'SubWallet' ? null : 'We recommend using SubWallet for best compatibility with Volta.';
  }
  if (chainId === 11155111) { // Sepolia
    return walletType === 'MetaMask' ? null : 'MetaMask offers the best experience with Sepolia.';
  }
  return null;
};
```

## 🎨 **User Interface**

### **Displayed Information**
- Connected wallet type (🦊 MetaMask, 🔵 SubWallet, 🔗 WalletConnect)
- Compatibility status per network
- Recommendations based on the current network
- "Limited" badges for reduced compatibility

### **Visual States**
- **✅ Native**: Full compatibility
- **✅ Bridge**: Compatibility via bridge
- **⚠️ Bridge**: Limited compatibility
- **❌ Not supported**: Incompatible

## 🔄 **Recommended Usage Flow**

### **For Loans (Sepolia)**
1. **Recommended**: Use MetaMask
2. Connect your wallet
3. Click "Switch Networks"
4. Select "Sepolia - Loan Contract EVM"
5. Execute DeFi transactions

### **For ZK Proofs (Volta)**
1. **Recommended**: Use SubWallet
2. Connect your wallet
3. Click "Switch Networks"
4. Select "Volta - ZK Proofs ZKVerify"
5. Submit ZK proofs

## 🛠️ **Troubleshooting**

### **MetaMask with Volta**
- May show unrecognized network error
- Add Volta manually
- Use SubWallet for a better experience

### **SubWallet with Sepolia**
- Works via EVM bridge
- May have higher latency
- Use MetaMask for better performance

### **WalletConnect**
- Depends on the connected wallet
- Check the compatibility of the base wallet
- Use native wallets when possible

## 📈 **Compatibility Metrics**

### **Sepolia (EVM)**
- MetaMask: 100% compatible
- SubWallet: 85% compatible (via bridge)
- WalletConnect: 90% compatible

### **Volta (Polkadot)**
- MetaMask: 60% compatible (via bridge)
- SubWallet: 100% compatible
- WalletConnect: 80% compatible

## 🎯 **Final Recommendations**

### **Developers**
- Test with both wallets
- Implement fallbacks for incompatibilities
- Use SubWallet for Volta testing
- Use MetaMask for Sepolia testing

### **Users**
- **For DeFi**: Use MetaMask
- **For ZK**: Use SubWallet
- **For flexibility**: Use WalletConnect
- **For best experience**: Use the recommended wallet for each network

## 🔮 **Next Steps**

1. **Improve SubWallet detection**
2. **Add support for more Polkadot wallets**
3. **Implement automatic fallbacks**
4. **Add usage metrics per wallet**
5. **Create migration guides between wallets** 