# Specific Network Support: Sepolia (EVM) and Volta (Polkadot/ZK) - MVP

This project is configured to support specifically two networks with distinct purposes for the ZK Finance MVP.

## MVP Supported Networks

### 1. Sepolia (EVM) - Loan Contract
- **Chain ID**: 11155111
- **Currency**: ETH
- **RPC**: https://sepolia.infura.io/v3/
- **Explorer**: https://sepolia.etherscan.io/
- **Purpose**: Interaction with the loan smart contract
- **Type**: Ethereum Testnet

### 2. Volta (Polkadot/ZK) - ZK Proofs
- **Chain ID**: 73799
- **Currency**: VOLT
- **RPC**: https://volta-rpc.zkverify.io
- **Explorer**: https://volta-explorer.zkverify.io
- **Purpose**: Submission of ZK proofs to ZKVerify
- **Type**: Polkadot Parachain

## MVP Use Cases

### Sepolia (EVM) - Loan Contract
- ✅ Loan creation via smart contract (`foundry/src/LoanManager.sol`)
- ✅ Loan funding by investors
- ✅ Loan repayment by borrowers
- ✅ Collateral management
- ✅ DeFi transaction execution

### Volta (Polkadot/ZK) - ZK Proofs
- ✅ ZK proof submission to ZKVerify
- ✅ Credit score verification
- ✅ Privacy-preserving data processing
- ✅ Integration with Polkadot ecosystem
- ✅ Zero-knowledge proofs for compliance

## Configuration

### Defined Networks (`lib/wagmi.ts`)
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

## User Interface

### WalletConnect Component
The component now clearly shows the purpose of each network in the MVP:

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

### Visual Identification
- **Sepolia**: ⚡ Icon (Zap) - "Sepolia (EVM)" - For loan contract
- **Volta**: 🔵 Icon (CircleDot) - "Volta (ZK)" - For ZK proofs

## MVP Usage Flow

### 1. For Loan Contract (Sepolia)
1. Connect wallet
2. Click "Switch Networks"
3. Select "Sepolia - Loan Contract EVM"
4. Execute loan transactions

### 2. For ZK Proofs (Volta)
1. Connect wallet
2. Click "Switch Networks"
3. Select "Volta - ZK Proofs ZKVerify"
4. Submit ZK proofs

## Supported Wallets

### SubWallet (Recommended)
- ✅ Native Polkadot support (Volta)
- ✅ EVM support via bridge (Sepolia)
- ✅ Automatic network switching
- ✅ Optimized interface

### MetaMask
- ✅ Complete EVM support (Sepolia)
- ⚠️ Limited Polkadot support (Volta via bridge)

### WalletConnect
- ✅ Universal support
- ✅ Connection with multiple wallets

## MVP Configuration Advantages

1. **Simplicity**: Only 2 essential networks for MVP
2. **Clarity**: Specific purpose for each network
3. **Performance**: Less configuration overhead
4. **UX**: Clean and intuitive interface
5. **Security**: Testnet networks for development
6. **Focus**: MVP-specific functionalities

## Translations

MVP-specific translations:
- `wallet.switchNetworks` - "Mudar Redes"
- `wallet.connected` - "Conectado"
- `wallet.volta` - "Volta"
- `wallet.evm` - "EVM"

## Troubleshooting

### Can't connect to Volta
- Check if network is added in SubWallet
- Use RPC: https://volta-rpc.zkverify.io
- Chain ID: 73799

### Can't connect to Sepolia
- Check if network is added in wallet
- Use RPC: https://sepolia.infura.io/v3/
- Chain ID: 11155111

### Network switching doesn't work
- Use SubWallet for better support
- Rainbow Kit manages automatically
- Check if wallet supports the network

## MVP Next Steps

1. **Implement network validation** - Check if correct network is selected for each action
2. **Improve UX** - Guide user to correct network based on action
3. **Tests** - Validate functionality on both networks
4. **Specific logic** - Implement features based on selected network 