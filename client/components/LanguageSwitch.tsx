import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1 h-8 text-xs hover:border hover:border-blue-600/30 transition-all duration-200"
    >
      <Globe className="w-3 h-3" />
      {language === 'pt' ? 'PT' : 'EN'}
    </Button>
  );
};

export default LanguageSwitch; 