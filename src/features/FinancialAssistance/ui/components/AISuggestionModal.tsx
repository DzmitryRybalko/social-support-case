import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SspButton, Modal } from '@/shared/ui-kit';

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (suggestion: string) => void;
  onEdit: (editedSuggestion: string) => void;
  suggestion: string;
  isLoading?: boolean;
}

export const AISuggestionModal: React.FC<AISuggestionModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onEdit,
  suggestion,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);

  React.useEffect(() => {
    setEditedSuggestion(suggestion);
  }, [suggestion]);

  const handleAccept = () => {
    onAccept(suggestion);
    onClose();
  };

  const handleEdit = () => {
    onEdit(editedSuggestion);
    onClose();
  };

  const handleDiscard = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      showCloseButton={true}
      headerText={t('financialAssistance.aiSuggestion.title')}
    >
      <div className="flex max-h-[80vh] flex-col">
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                {t('financialAssistance.aiSuggestion.loading')}
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {t('financialAssistance.aiSuggestion.suggestionLabel')}
                </label>
                <textarea
                  value={editedSuggestion}
                  onChange={e => setEditedSuggestion(e.target.value)}
                  className="w-full resize-none rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  rows={8}
                  placeholder={t(
                    'financialAssistance.aiSuggestion.placeholder'
                  )}
                />
              </div>

              <div className="text-sm text-gray-500">
                {t('financialAssistance.aiSuggestion.helpText')}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
            <SspButton
              type="button"
              variant="secondary"
              onClick={handleDiscard}
            >
              {t('financialAssistance.aiSuggestion.discard')}
            </SspButton>
            <SspButton type="button" variant="secondary" onClick={handleEdit}>
              {t('financialAssistance.aiSuggestion.edit')}
            </SspButton>
            <SspButton type="button" variant="primary" onClick={handleAccept}>
              {t('financialAssistance.aiSuggestion.accept')}
            </SspButton>
          </div>
        )}
      </div>
    </Modal>
  );
};
