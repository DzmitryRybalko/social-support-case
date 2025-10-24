import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { TextareaWithLabel, SspButton } from '@/shared/ui-kit';

import {
  SituationDescriptionFormProps,
  SituationDescriptionFormData,
} from '../../model/types/SituationDescription';
import { useFormLocalStorage } from '../../model/hooks/useLocalStorage';
import { submitCompleteApplication } from '../../api/applicationApi';
import { collectAllFormData } from '../../model/utils/formDataCollector';
import { SuccessModal } from '../components/SuccessModal';
import { AISuggestionModal } from '../components/AISuggestionModal';
import { ApiKeyModal } from '../components/ApiKeyModal';
import { CompleteApplicationData } from '../../api/applicationApi';
import {
  getAIAssistance,
  AIAssistanceRequest,
  hasApiKey,
} from '../../api/openAiApi';
import { useApiKey } from '../../model/hooks/useApiKey';
import { FORM_SCHEMAS } from '../../model/constants/formConstants';

export const SituationDescriptionStep: React.FC<
  SituationDescriptionFormProps
> = ({
  data = {},
  onNext: _onNext,
  onPrevious,
  onSubmit: _onSubmit,
  errors = {},
}) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] =
    useState<CompleteApplicationData | null>(null);

  const [showAIModal, setShowAIModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [currentField, setCurrentField] = useState<
    keyof SituationDescriptionFormData | null
  >(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const { saveApiKey } = useApiKey();

  const { formData: savedFormData, saveFormData } =
    useFormLocalStorage<SituationDescriptionFormData>(
      'situationDescriptionForm',
      {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
        additionalDetails: '',
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm<SituationDescriptionFormData>({
    resolver: zodResolver(FORM_SCHEMAS.SITUATION_DESCRIPTION),
    defaultValues: {
      currentFinancialSituation:
        data.currentFinancialSituation ||
        savedFormData.currentFinancialSituation,
      employmentCircumstances:
        data.employmentCircumstances || savedFormData.employmentCircumstances,
      reasonForApplying:
        data.reasonForApplying || savedFormData.reasonForApplying,
      additionalDetails:
        data.additionalDetails || savedFormData.additionalDetails,
    },
    mode: 'onChange',
  });

  const watchedValues = watch();
  const previousValuesRef = useRef<string>('');

  useEffect(() => {
    const currentValuesString = JSON.stringify(watchedValues);

    if (currentValuesString !== previousValuesRef.current) {
      previousValuesRef.current = currentValuesString;
      saveFormData(watchedValues);
    }
  }, [watchedValues, saveFormData]);

  const onSubmitForm = async (_formData: SituationDescriptionFormData) => {
    setIsSubmitting(true);

    try {
      const completeApplicationData = collectAllFormData();

      const response = await submitCompleteApplication(completeApplicationData);

      if (response.success) {
        // Store submitted data and show modal
        setSubmittedData(response.data || null);
        setShowSuccessModal(true);
      } else {
        throw new Error(
          response.message || t('financialAssistance.errors.submissionFailed')
        );
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(
        error instanceof Error
          ? error.message
          : t('financialAssistance.errors.submissionFailed')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestartDemo = () => {
    localStorage.removeItem('personalInfoForm');
    localStorage.removeItem('familyInfoForm');
    localStorage.removeItem('situationDescriptionForm');

    setShowSuccessModal(false);
    window.location.reload();
  };

  const handleHelpMeWrite = async (
    fieldName: keyof SituationDescriptionFormData
  ) => {
    setCurrentField(fieldName);
    setAiError(null);

    if (!hasApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    setIsAILoading(true);
    setShowAIModal(true);

    try {
      const currentValue = watchedValues[fieldName] || '';
      const request: AIAssistanceRequest = {
        fieldType: fieldName as
          | 'currentFinancialSituation'
          | 'employmentCircumstances'
          | 'reasonForApplying',
        currentText: currentValue,
      };

      const suggestion = await getAIAssistance(request);
      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('AI assistance error:', error);

      if (error instanceof Error && error.message === 'API_KEY_REQUIRED') {
        setShowApiKeyModal(true);
        setShowAIModal(false);
        setIsAILoading(false);
        return;
      }

      setAiError(
        error instanceof Error
          ? error.message
          : t('financialAssistance.aiSuggestion.error.generic')
      );
    } finally {
      setIsAILoading(false);
    }
  };

  const handleApiKeySave = (apiKey: string) => {
    saveApiKey(apiKey);
    setShowApiKeyModal(false);

    if (currentField) {
      handleHelpMeWrite(currentField);
    }
  };

  const handleApiKeyCancel = () => {
    setShowApiKeyModal(false);
    setCurrentField(null);
  };

  const handleAcceptSuggestion = (suggestion: string) => {
    if (currentField) {
      setValue(currentField, suggestion, { shouldValidate: true });
    }
  };

  const handleEditSuggestion = (editedSuggestion: string) => {
    if (currentField) {
      setValue(currentField, editedSuggestion, { shouldValidate: true });
    }
  };

  const getErrorMessage = (fieldName: keyof SituationDescriptionFormData) => {
    const error = formErrors[fieldName];
    if (error) {
      if (error.type === 'too_small') {
        return t(
          'financialAssistance.situationDescription.validation.minLength',
          { min: 50 }
        );
      }
      if (error.type === 'too_big') {
        return t(
          'financialAssistance.situationDescription.validation.maxLength',
          { max: 1000 }
        );
      }
      return t('financialAssistance.situationDescription.validation.required', {
        fieldName,
      });
    }
    return errors[fieldName] || '';
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* Current Financial Situation */}
        <div className="space-y-2">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <TextareaWithLabel
                label={t(
                  'financialAssistance.situationDescription.fields.currentFinancialSituation.label'
                )}
                placeholder={t(
                  'financialAssistance.situationDescription.fields.currentFinancialSituation.placeholder'
                )}
                description={t(
                  'financialAssistance.situationDescription.fields.currentFinancialSituation.description'
                )}
                error={getErrorMessage('currentFinancialSituation')}
                rows={4}
                {...register('currentFinancialSituation')}
                required
              />
            </div>

            <SspButton
              type="button"
              variant="primary"
              onClick={() => handleHelpMeWrite('currentFinancialSituation')}
              className="mt-6 flex-shrink-0 px-3 py-2 text-sm"
            >
              {t('financialAssistance.aiSuggestion.helpMeWrite')}
            </SspButton>
          </div>
        </div>

        {/* Employment Circumstances */}
        <div className="space-y-2">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <TextareaWithLabel
                label={t(
                  'financialAssistance.situationDescription.fields.employmentCircumstances.label'
                )}
                placeholder={t(
                  'financialAssistance.situationDescription.fields.employmentCircumstances.placeholder'
                )}
                description={t(
                  'financialAssistance.situationDescription.fields.employmentCircumstances.description'
                )}
                error={getErrorMessage('employmentCircumstances')}
                rows={4}
                {...register('employmentCircumstances')}
                required
              />
            </div>
            <SspButton
              type="button"
              variant="primary"
              onClick={() => handleHelpMeWrite('employmentCircumstances')}
              className="mt-6 flex-shrink-0 px-3 py-2 text-sm"
            >
              {t('financialAssistance.aiSuggestion.helpMeWrite')}
            </SspButton>
          </div>
        </div>

        {/* Reason for Applying */}
        <div className="space-y-2">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <TextareaWithLabel
                label={t(
                  'financialAssistance.situationDescription.fields.reasonForApplying.label'
                )}
                placeholder={t(
                  'financialAssistance.situationDescription.fields.reasonForApplying.placeholder'
                )}
                description={t(
                  'financialAssistance.situationDescription.fields.reasonForApplying.description'
                )}
                error={getErrorMessage('reasonForApplying')}
                rows={4}
                {...register('reasonForApplying')}
                required
              />
            </div>
            <SspButton
              type="button"
              variant="primary"
              onClick={() => handleHelpMeWrite('reasonForApplying')}
              className="mt-6 flex-shrink-0 px-3 py-2 text-sm"
            >
              {t('financialAssistance.aiSuggestion.helpMeWrite')}
            </SspButton>
          </div>
        </div>

        <div className="space-y-2">
          <TextareaWithLabel
            label={t(
              'financialAssistance.situationDescription.fields.additionalDetails.label'
            )}
            placeholder={t(
              'financialAssistance.situationDescription.fields.additionalDetails.placeholder'
            )}
            description={t(
              'financialAssistance.situationDescription.fields.additionalDetails.description'
            )}
            error={getErrorMessage('additionalDetails')}
            rows={3}
            {...register('additionalDetails')}
          />
        </div>

        <div className="flex justify-between pt-6">
          <SspButton type="button" variant="secondary" onClick={onPrevious}>
            {t('financialAssistance.navigation.previous')}
          </SspButton>
          <SspButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? t('financialAssistance.navigation.submitting')
              : t('financialAssistance.navigation.submit')}
          </SspButton>
        </div>
      </form>

      {submittedData && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          onRestart={handleRestartDemo}
          applicationData={submittedData}
        />
      )}

      <AISuggestionModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onAccept={handleAcceptSuggestion}
        onEdit={handleEditSuggestion}
        suggestion={aiSuggestion}
        isLoading={isAILoading}
      />

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={handleApiKeyCancel}
        onSave={handleApiKeySave}
      />

      {aiError && (
        <div className="fixed top-4 right-4 z-50 max-w-md rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <div className="flex items-center justify-between">
            <span className="text-sm">{aiError}</span>
            <button
              onClick={() => setAiError(null)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
