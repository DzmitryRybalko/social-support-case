import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { CompleteApplicationData } from '../../api/applicationApi';
import { Modal } from '@/shared/ui-kit';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  applicationData: CompleteApplicationData;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  applicationData,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      showCloseButton={true}
      headerText={t('financialAssistance.successModal.title')}
    >
      <div className="p-6">
        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={faFileAlt}
              className="h-5 w-5 text-blue-600"
            />
            <span className="font-medium text-blue-900">
              {t('financialAssistance.successModal.applicationId')}:{' '}
              {applicationData.applicationId || 'N/A'}
            </span>
          </div>
        </div>

        {/* Submitted Data */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              {t('financialAssistance.steps.personalInformation')}
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { key: 'name', value: applicationData.personalInfo.name },
                { key: 'nationalId', value: applicationData.personalInfo.nationalId },
                { key: 'email', value: applicationData.personalInfo.email },
                { key: 'phone', value: applicationData.personalInfo.phone },
              ].map(({ key, value }) => (
                <div key={key}>
                  <span className="text-sm font-medium text-gray-600">
                    {t(`financialAssistance.personalInfo.fields.${key}.label`)}:
                  </span>
                  <p className="break-words text-gray-900">{value}</p>
                </div>
              ))}
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-600">
                  {t('financialAssistance.personalInfo.fields.address.label')}:
                </span>
                <p className="break-words text-gray-900">
                  {applicationData.personalInfo.address}
                </p>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              {t('financialAssistance.steps.familyInfo')}
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { 
                  key: 'maritalStatus', 
                  value: t(`financialAssistance.familyInfo.fields.maritalStatus.options.${applicationData.familyInfo.maritalStatus}`),
                  isTranslated: true
                },
                { 
                  key: 'dependents', 
                  value: applicationData.familyInfo.dependents,
                  isTranslated: false
                },
                { 
                  key: 'employmentStatus', 
                  value: t(`financialAssistance.familyInfo.fields.employmentStatus.options.${applicationData.familyInfo.employmentStatus}`),
                  isTranslated: true
                },
                { 
                  key: 'monthlyIncome', 
                  value: applicationData.familyInfo.monthlyIncome,
                  isTranslated: false
                },
              ].map(({ key, value }) => (
                <div key={key}>
                  <span className="text-sm font-medium text-gray-600">
                    {t(`financialAssistance.familyInfo.fields.${key}.label`)}:
                  </span>
                  <p className="break-words text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Situation Description */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              {t('financialAssistance.steps.situationDescription')}
            </h3>
            <div className="space-y-4">
              {[
                { 
                  key: 'currentFinancialSituation', 
                  value: applicationData.situationDescription.currentFinancialSituation 
                },
                { 
                  key: 'employmentCircumstances', 
                  value: applicationData.situationDescription.employmentCircumstances 
                },
                { 
                  key: 'reasonForApplying', 
                  value: applicationData.situationDescription.reasonForApplying 
                },
                ...(applicationData.situationDescription.additionalDetails ? [{
                  key: 'additionalDetails',
                  value: applicationData.situationDescription.additionalDetails
                }] : [])
              ].map(({ key, value }) => (
                <div key={key}>
                  <span className="text-sm font-medium text-gray-600">
                    {t(`financialAssistance.situationDescription.fields.${key}.label`)}:
                  </span>
                  <p className="mt-1 break-words text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('financialAssistance.successModal.close')}
          </button>
          <button
            onClick={onRestart}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {t('financialAssistance.successModal.restartDemo')}
          </button>
        </div>
      </div>
    </Modal>
  );
};
