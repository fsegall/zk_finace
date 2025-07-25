import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Wallet, LogOut } from "lucide-react";

const WalletConnect = () => {
  const { connectWallet, disconnectWallet, walletAddress } = useAuth();
  const { t } = useLanguage();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono">{formatAddress(walletAddress)}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="h-8 px-2"
        >
          <LogOut className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleConnect}
      disabled={isConnecting}
      className="h-8 px-3"
    >
      <Wallet className="w-3 h-3 mr-1" />
      {isConnecting ? t('common.loading') : t('wallet.connect')}
    </Button>
  );
};

export default WalletConnect; 