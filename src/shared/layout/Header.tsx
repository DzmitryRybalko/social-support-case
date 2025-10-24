import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '../contexts/RTLContext';
import { SspButton } from '../ui-kit';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { switchLanguage } = useRTL();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex-1">
          <h1 className="text-center text-lg font-semibold text-white sm:text-xl">
            {t('header.title')}
          </h1>
        </div>

        <div className="flex-shrink-0">
          <SspButton
            variant="secondary"
            onClick={switchLanguage}
            className="border-white bg-transparent px-3 py-2 text-sm text-white hover:border-white hover:bg-white hover:text-blue-600 sm:px-4"
          >
            {t('header.currentLanguage')}
          </SspButton>
        </div>
      </div>
    </header>
  );
};
