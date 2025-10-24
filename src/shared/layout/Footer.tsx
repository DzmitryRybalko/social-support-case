import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-gray-300 bg-gray-100 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="m-0 text-xs text-gray-600">{t('footer.copyright')}</p>

          <p className="mt-2 mb-0 text-xs text-gray-600">
            {t('footer.supportText')}
          </p>
        </div>
      </div>
    </footer>
  );
};
