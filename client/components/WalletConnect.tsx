import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWallet } from "../hooks/useWallet";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CircleDot,
  Zap,
  Wallet,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const WalletConnect = () => {
  const { t } = useLanguage();
  const { 
    address, 
    isConnected, 
    isConnecting, 
    disconnect, 
    formatAddress, 
    isSwitching, 
    chainId, 
    error, 
    clearError,
    walletType,
    isNetworkCompatible,
    getWalletRecommendation,
    switchNetwork 
  } = useWallet();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const networks = [
    {
      id: 'sepolia',
      name: t('wallet.sepolia'),
      description: t('wallet.sepoliaDescription'),
      chainId: 11155111,
      icon: Zap,
      type: 'evm' as const,
      isConnected: chainId === 11155111,
      isLimited: !isNetworkCompatible(11155111),
    },
    {
      id: 'volta',
      name: t('wallet.volta'),
      description: t('wallet.voltaDescription'),
      chainId: 73799,
      icon: CircleDot,
      type: 'polkadot' as const,
      isConnected: chainId === 73799,
      isLimited: !isNetworkCompatible(73799),
    },
  ];

  const handleNetworkSwitch = async (network: typeof networks[0]) => {
    if (network.isConnected) return;
    
    try {
      await switchNetwork(network.chainId);
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Failed to switch network:', err);
    }
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'metamask':
        return <Zap className="w-4 h-4" />;
      case 'subwallet':
        return <CircleDot className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getCurrentNetwork = () => {
    return networks.find(network => network.chainId === chainId) || networks[0];
  };

  const currentNetwork = getCurrentNetwork();
  const recommendation = getWalletRecommendation();

  return (
    <div className="flex items-center gap-3">
      {/* Mobile: Compact Connect Button */}
      <div className="sm:hidden">
        <ConnectButton
          chainStatus="none"
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>

      {/* Desktop: Full Wallet Connect */}
      <div className="hidden sm:flex items-center gap-3">
        <ConnectButton
          chainStatus="none"
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />

        {/* Network Switcher */}
        {isConnected && (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <currentNetwork.icon className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">
                  {t('wallet.switchNetworks')}
                </span>
                <ChevronDown className="w-3 h-3" />
              </motion.button>
            </DropdownMenuTrigger>

            <DropdownMenuContent 
              align="end" 
              className="w-72 bg-background border-border"
              sideOffset={8}
            >
              {/* Wallet Info */}
              <div className="p-3 border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {walletType === 'MetaMask' ? 'MetaMask' : 'SubWallet'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatAddress}
                </div>
              </div>

              {/* Network Options */}
              <div className="p-2">
                {networks.map((network) => (
                  <DropdownMenuItem
                    key={network.id}
                    className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => handleNetworkSwitch(network)}
                    disabled={network.isConnected || isSwitching}
                  >
                    <div className="flex items-center gap-3">
                      <network.icon className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {network.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {network.description}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {network.isConnected && (
                        <Badge variant="secondary" className="text-xs">
                          {t('wallet.connected')}
                        </Badge>
                      )}
                      {network.isLimited && !network.isConnected && (
                        <Badge variant="destructive" className="text-xs">
                          {t('wallet.limited')}
                        </Badge>
                      )}
                      {network.isConnected && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {network.isLimited && !network.isConnected && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>

              {/* Recommendation */}
              {recommendation && (
                <div className="p-3 border-t border-border bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-700 dark:text-blue-300">
                      <p>{recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 p-2 bg-destructive text-destructive-foreground rounded text-xs"
        >
          {error}
          <button 
            onClick={clearError}
            className="ml-2 underline"
          >
            Dismiss
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WalletConnect; 