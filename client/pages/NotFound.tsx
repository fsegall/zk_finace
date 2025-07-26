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
      <div className="text-center px-4">
        <h1 className="text-6xl lg:text-8xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-lg lg:text-xl text-foreground mb-4">{t('notFound.title')}</p>
        <a href="/" className="text-primary hover:text-primary/80 underline text-sm lg:text-base">
          {t('notFound.returnHome')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
