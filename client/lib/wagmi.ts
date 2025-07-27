import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Configuration for Sepolia (EVM) - Compatible with MetaMask and SubWallet
const sepoliaConfig = {
  ...sepolia,
  // Specific settings for better compatibility
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1450409,
    },
  },
} as const;

// Configuration for Volta (Polkadot/ZK) - Optimized for SubWallet
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
  // Specific configuration for Polkadot/Substrate
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'ZK Finance',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepoliaConfig, volta], // Sepolia (EVM) + Volta (Polkadot/ZK)
  ssr: true,
});

// Specific settings by network type
export const networkConfig = {
  evm: {
    sepolia: {
      chainId: 11155111,
      name: 'Sepolia',
      type: 'EVM',
      wallets: ['MetaMask', 'SubWallet', 'WalletConnect'],
      features: ['Smart Contracts', 'DeFi', 'Loans'],
    },
  },
  polkadot: {
    volta: {
      chainId: 73799,
      name: 'Volta',
      type: 'Polkadot',
      wallets: ['SubWallet', 'Polkadot.js'],
      features: ['ZK Proofs', 'Privacy', 'ZKVerify'],
    },
  },
}; 