import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../../config/i18n';

interface RTLContextType {
  isRTL: boolean;
  currentLanguage: Language;
  switchLanguage: () => void;
}

const RTLContext = createContext<RTLContextType | undefined>(undefined);

interface RTLProviderProps {
  children: ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    i18n.language as Language
  );

  const isRTL = currentLanguage === Language.Arabic;

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [isRTL, currentLanguage]);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng as Language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const switchLanguage = () => {
    const newLanguage =
      currentLanguage === Language.English ? Language.Arabic : Language.English;
    i18n.changeLanguage(newLanguage);
  };

  const value: RTLContextType = {
    isRTL,
    currentLanguage,
    switchLanguage,
  };

  return <RTLContext.Provider value={value}>{children}</RTLContext.Provider>;
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
