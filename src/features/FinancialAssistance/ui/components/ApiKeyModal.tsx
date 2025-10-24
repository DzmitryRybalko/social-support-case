import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SspButton, Modal } from '@/shared/ui-kit';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError(t('financialAssistance.apiKey.validation.required'));
      return;
    }

    if (apiKey.length < 10) {
      setError(t('financialAssistance.apiKey.validation.invalid'));
      return;
    }

    onSave(apiKey.trim());
    setApiKey('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setApiKey('');
    setError('');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      maxWidth="md"
      showCloseButton={true}
      headerText={t('financialAssistance.apiKey.title')}
      closeOnBackdropClick={false}
      closeOnEscape={true}
    >
      <div className="flex flex-col">
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <p className="mb-4 text-sm text-gray-600">
                {t('financialAssistance.apiKey.description')}
              </p>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('financialAssistance.apiKey.label')}
              </label>

              <input
                type="password"
                value={apiKey}
                onChange={e => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                className={`w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('financialAssistance.apiKey.placeholder')}
                autoFocus
              />

              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
              <p className="text-sm text-blue-800">
                {t('financialAssistance.apiKey.helpText')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
          <SspButton type="button" variant="secondary" onClick={handleCancel}>
            {t('financialAssistance.apiKey.cancel')}
          </SspButton>
          <SspButton
            type="button"
            variant="primary"
            onClick={handleSave}
            disabled={!apiKey.trim()}
          >
            {t('financialAssistance.apiKey.save')}
          </SspButton>
        </div>
      </div>
    </Modal>
  );
};
