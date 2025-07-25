import { useAccount, useDisconnect } from 'wagmi';
import { useState, useCallback } from 'react';

// Tipos de carteira suportados
export type WalletType = 'MetaMask' | 'SubWallet' | 'WalletConnect' | 'Unknown';

// Detectar tipo de carteira
const detectWalletType = (): WalletType => {
  if (typeof window === 'undefined') return 'Unknown';
  
  if (window.ethereum?.isMetaMask) {
    return 'MetaMask';
  }
  
  // SubWallet detection (pode variar dependendo da implementação)
  if (window.ethereum?.isSubWallet) {
    return 'SubWallet';
  }
  
  // WalletConnect detection
  if (window.ethereum?.isWalletConnect) {
    return 'WalletConnect';
  }
  
  return 'Unknown';
};

// Verificar compatibilidade de rede por carteira
const isNetworkCompatible = (walletType: WalletType, chainId: number): boolean => {
  switch (walletType) {
    case 'MetaMask':
      // MetaMask suporta EVM nativamente, Polkadot via bridge
      return chainId === 11155111; // Sepolia
    case 'SubWallet':
      // SubWallet suporta Polkadot nativamente, EVM via bridge
      return chainId === 73799 || chainId === 11155111; // Volta e Sepolia
    case 'WalletConnect':
      // WalletConnect suporta ambos
      return chainId === 73799 || chainId === 11155111;
    default:
      return false;
  }
};

export const useWallet = () => {
  const { address, isConnected, isConnecting, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletType] = useState<WalletType>(detectWalletType());

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const safeSwitchNetwork = useCallback(async (targetChainId: number) => {
    try {
      setIsSwitching(true);
      setError(null);

      // Verificar compatibilidade
      if (!isNetworkCompatible(walletType, targetChainId)) {
        const networkName = targetChainId === 11155111 ? 'Sepolia' : 'Volta';
        setError(`${walletType} pode ter limitações com ${networkName}. Recomendamos usar SubWallet para melhor compatibilidade.`);
        return false;
      }

      // Tratamento específico por tipo de carteira
      switch (walletType) {
        case 'MetaMask':
          // Delay para evitar erro "Already processing"
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${targetChainId.toString(16)}` }],
            });
          } catch (switchError: any) {
            // Se a rede não existe, tenta adicionar
            if (switchError.code === 4902) {
              const networkParams = targetChainId === 11155111 ? {
                chainId: '0xaa36a7',
                chainName: 'Sepolia',
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              } : {
                chainId: '0x12027',
                chainName: 'Volta',
                nativeCurrency: { name: 'VOLT', symbol: 'VOLT', decimals: 18 },
                rpcUrls: ['https://volta-rpc.zkverify.io'],
                blockExplorerUrls: ['https://volta-explorer.zkverify.io'],
              };
              
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkParams],
              });
            } else {
              throw switchError;
            }
          }
          break;

        case 'SubWallet':
          // SubWallet gerencia automaticamente a troca de redes
          console.log(`SubWallet: Switching to network ${targetChainId}`);
          // O SubWallet deve detectar automaticamente e mostrar prompt
          break;

        case 'WalletConnect':
          // WalletConnect gerencia automaticamente
          console.log(`WalletConnect: Switching to network ${targetChainId}`);
          break;

        default:
          console.log(`Unknown wallet: Attempting to switch to network ${targetChainId}`);
      }
      
      return true;
    } catch (err: any) {
      console.error('Network switch error:', err);
      
      // Tratamento de erros específicos
      if (err.code === -32002) {
        setError('Carteira está processando outra solicitação. Aguarde um momento e tente novamente.');
      } else if (err.code === 4001) {
        setError('Troca de rede cancelada pelo usuário.');
      } else if (err.code === 4902) {
        setError('Rede não encontrada. Adicione a rede à carteira primeiro.');
      } else if (err.code === -32603) {
        setError('Erro interno da carteira. Tente novamente.');
      } else {
        setError('Erro ao trocar de rede. Tente novamente.');
      }
      return false;
    } finally {
      setIsSwitching(false);
    }
  }, [walletType]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getWalletRecommendation = useCallback(() => {
    if (chainId === 73799) { // Volta
      return walletType === 'SubWallet' ? null : 'Recomendamos usar SubWallet para melhor compatibilidade com Volta.';
    }
    if (chainId === 11155111) { // Sepolia
      return walletType === 'MetaMask' ? null : 'MetaMask oferece melhor experiência com Sepolia.';
    }
    return null;
  }, [chainId, walletType]);

  return {
    address,
    isConnected,
    isConnecting,
    isSwitching,
    chainId,
    walletType,
    disconnect,
    formatAddress: address ? formatAddress(address) : '',
    switchNetwork: safeSwitchNetwork,
    error,
    clearError,
    getWalletRecommendation,
    isNetworkCompatible: (chainId: number) => isNetworkCompatible(walletType, chainId),
  };
}; 