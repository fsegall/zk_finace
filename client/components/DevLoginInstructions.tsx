import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DevLoginInstructions = () => {
  const { t, language } = useLanguage();
  const isDevelopment = import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isDevelopment) return null;

  const translations = {
    pt: {
      title: 'Modo de Desenvolvimento Ativo',
      description: 'Você pode usar qualquer email e senha para fazer login. O sistema irá autenticá-lo automaticamente com dados simulados.',
      mockUser: 'Usuário Simulado',
      role: 'Função',
      name: 'Nome',
      borrower: 'Tomador',
      developerUser: 'Usuário Desenvolvedor'
    },
    en: {
      title: 'Development Mode Active',
      description: 'You can use any email and password to login. The system will automatically authenticate you with mock data.',
      mockUser: 'Mock User',
      role: 'Role',
      name: 'Name',
      borrower: 'Borrower',
      developerUser: 'Developer User'
    }
  };

  const currentTranslations = translations[language];

  return (
    <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔧</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-400 mb-1">
            {currentTranslations.title}
          </h3>
          <p className="text-sm text-blue-300 mb-2">
            {currentTranslations.description}
          </p>
          <div className="text-xs text-blue-200 space-y-1">
            <p><strong>{currentTranslations.mockUser}:</strong> dev@zkfinance.com</p>
            <p><strong>{currentTranslations.role}:</strong> {currentTranslations.borrower}</p>
            <p><strong>{currentTranslations.name}:</strong> {currentTranslations.developerUser}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevLoginInstructions; 