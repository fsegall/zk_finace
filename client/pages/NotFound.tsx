import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-h1 font-bold mb-4 text-foreground">404</h1>
        <p className="text-h4 text-foreground mb-4">{t('notFound.title')}</p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
