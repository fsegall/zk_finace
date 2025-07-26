import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <MenuContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}; 