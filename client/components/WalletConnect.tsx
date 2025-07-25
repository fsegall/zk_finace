import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLanguage } from "../contexts/LanguageContext";
import { useWallet } from "../hooks/useWallet";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CircleDot, Zap, ChevronDown, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

const WalletConnect = () => {
  const { t } = useLanguage();
  const { 
    chainId, 
    isSwitching, 
    error, 
    switchNetwork, 
    clearError, 
    walletType,
    getWalletRecommendation,
    isNetworkCompatible 
  } = useWallet();

  const isVoltaChain = chainId === 73799; // Volta (Polkadot/ZK)
  const isSepoliaChain = chainId === 11155111; // Sepolia (EVM)

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const getChainIcon = () => {
    if (isVoltaChain) {
      return <CircleDot className="w-4 h-4" />;
    }
    return <Zap className="w-4 h-4" />;
  };

  const getChainName = () => {
    if (isVoltaChain) return 'Volta (ZK)';
    if (isSepoliaChain) return 'Sepolia (EVM)';
    return 'Rede não suportada';
  };

  const getWalletIcon = () => {
    switch (walletType) {
      case 'MetaMask':
        return '🦊';
      case 'SubWallet':
        return '🔵';
      case 'WalletConnect':
        return '🔗';
      default:
        // Fallback para EVM: ícone de raio
        return <Zap className="w-4 h-4 text-yellow-500" />;
    }
  };

  const handleSwitchNetwork = async (networkId: number) => {
    await switchNetwork(networkId);
  };

  const networks = [
    { 
      id: 11155111, 
      name: t('wallet.sepolia') || 'Sepolia',
      description: t('wallet.sepoliaDescription') || 'Contrato de Loans EVM',
      icon: <Zap className="w-3 h-3" />,
      compatibility: {
        MetaMask: '✅ Nativo',
        SubWallet: '✅ Bridge',
        WalletConnect: '✅ Suporte',
      }
    },
    { 
      id: 73799, 
      name: t('wallet.volta') || 'Volta',
      description: t('wallet.voltaDescription') || 'Provas ZK ZKVerify',
      icon: <CircleDot className="w-3 h-3" />,
      compatibility: {
        MetaMask: '⚠️ Bridge',
        SubWallet: '✅ Nativo',
        WalletConnect: '✅ Suporte',
      }
    },
  ];

  const recommendation = getWalletRecommendation();

  return (
    <div className="flex items-center gap-6">
      <ConnectButton 
        label={t('wallet.connect')}
        showBalance={false}
        chainStatus="none"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
      
      {chainId && (
        <div className="flex items-center gap-6">
          <Badge variant="outline" className="text-xs flex items-center gap-3">
            {getChainIcon()}
            {getChainName()}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2 text-xs"
                disabled={isSwitching}
              >
                {isSwitching ? (t('wallet.switching') || 'Trocando...') : (t('wallet.switchNetworks') || 'Mudar Redes')}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-background border-border">
              {/* Informações da carteira */}
              <div className="p-2 border-b border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {getWalletIcon()}
                  <span>{walletType}</span>
                </div>
              </div>

              {/* Recomendação */}
              {recommendation && (
                <div className="p-2 border-b border-border bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <Info className="w-3 h-3" />
                    {recommendation}
                  </div>
                </div>
              )}

              {/* Erro */}
              {error && (
                <div className="p-2 border-b">
                  <div className="flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </div>
                </div>
              )}

              {/* Redes */}
              {networks.map((network) => {
                const isCompatible = isNetworkCompatible(network.id);
                const isCurrentNetwork = chainId === network.id;
                
                return (
                  <DropdownMenuItem
                    key={network.id}
                    onClick={() => handleSwitchNetwork(network.id)}
                    className={`flex items-center gap-2 cursor-pointer p-3 ${
                      isCurrentNetwork ? 'bg-accent' : ''
                    } ${isSwitching ? 'opacity-50 cursor-not-allowed' : ''} ${
                      !isCompatible ? 'opacity-60' : ''
                    }`}
                    disabled={isSwitching}
                  >
                    {network.icon}
                    <div className="flex-1">
                      <div className="font-medium">{network.name}</div>
                      <div className="text-xs text-muted-foreground">{network.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {network.compatibility[walletType as keyof typeof network.compatibility]}
                      </div>
                    </div>
                    {isCurrentNetwork && (
                      <Badge variant="secondary" className="text-xs">{t('wallet.connected') || 'Conectado'}</Badge>
                    )}
                    {!isCompatible && (
                      <Badge variant="outline" className="text-xs text-orange-600">{t('wallet.limited') || 'Limitado'}</Badge>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 