import { useWallet } from '../hooks/useWallet';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Wallet, LogOut } from 'lucide-react';

const WalletInfo = () => {
  const { address, isConnected, isConnecting, disconnect, formatAddress } = useWallet();
  const { t } = useLanguage();

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {t('wallet.noWallet')}
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
        <Wallet className="w-4 h-4 text-primary" />
        <span className="text-sm font-mono">{formatAddress}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => navigator.clipboard.writeText(address)}
          title={t('wallet.copyAddress') || 'Copiar endereço'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" /><rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" /></svg>
        </Button>
        <Badge variant="secondary" className="text-xs">
          {t('wallet.connected')}
        </Badge>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => disconnect()}
        className="h-8 px-2"
        title={t('wallet.disconnect')}
      >
        <LogOut className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default WalletInfo; 