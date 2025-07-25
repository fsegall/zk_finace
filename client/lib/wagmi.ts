import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Configuração para Sepolia (EVM) - Compatível com MetaMask e SubWallet
const sepoliaConfig = {
  ...sepolia,
  // Configurações específicas para melhor compatibilidade
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1450409,
    },
  },
} as const;

// Configuração para Volta (Polkadot/ZK) - Otimizada para SubWallet
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
  // Configuração específica para Polkadot/Substrate
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

// Configurações específicas por tipo de rede
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