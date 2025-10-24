import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { InputWithLabel, RadioGroup, SspButton } from '@/shared/ui-kit';

import { useFormLocalStorage } from '../../model/hooks/useLocalStorage';
import { FamilyInfoFormProps } from '../../model/types/FamilyInfo';
import {
  FORM_SCHEMAS,
  FamilyInfoFormData,
} from '../../model/constants/formConstants';
import { useFamilyInfoTranslations } from '../../model/hooks/useFamilyInfoTranslations';
import {
  MaritalStatus,
  EmploymentStatus,
  HousingStatus,
} from '../../model/types/MaritalStatus';

export const FamilyInfoStep: React.FC<FamilyInfoFormProps> = ({
  data = {},
  onNext,
  onPrevious,
  onSubmit,
  errors = {},
}) => {
  const { t } = useTranslation();
  const {
    maritalStatusOptions,
    employmentStatusOptions,
    housingStatusOptions,
  } = useFamilyInfoTranslations();

  const { formData: savedFormData, saveFormData } =
    useFormLocalStorage<FamilyInfoFormData>('familyInfoForm', {
      maritalStatus: 'single',
      dependents: 0,
      employmentStatus: 'unemployed',
      monthlyIncome: 0,
      housingStatus: 'rented',
      housingDetails: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm<FamilyInfoFormData>({
    resolver: zodResolver(FORM_SCHEMAS.FAMILY_INFO),
    defaultValues: {
      maritalStatus:
        data.maritalStatus || savedFormData.maritalStatus || 'single',
      dependents: data.dependents || savedFormData.dependents || 0,
      employmentStatus:
        data.employmentStatus || savedFormData.employmentStatus || 'unemployed',
      monthlyIncome: data.monthlyIncome || savedFormData.monthlyIncome || 0,
      housingStatus:
        data.housingStatus || savedFormData.housingStatus || 'rented',
      housingDetails: data.housingDetails || savedFormData.housingDetails || '',
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

  const onFormSubmit = (formData: FamilyInfoFormData) => {
    console.log(formData);
    onSubmit();
    onNext();
  };

  const getErrorMessage = (fieldName: keyof FamilyInfoFormData) => {
    const formError = formErrors[fieldName];
    if (formError) {
      const errorKey = formError.message as keyof typeof t;
      return t(`financialAssistance.familyInfo.validation.${errorKey}`, {
        fieldName: t(
          `financialAssistance.familyInfo.fields.${fieldName}.label`
        ),
      });
    }
    return errors[fieldName] || '';
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-6">
        <div>
          <RadioGroup
            id="maritalStatus"
            label={t(
              'financialAssistance.familyInfo.fields.maritalStatus.label'
            )}
            required
            error={getErrorMessage('maritalStatus')}
            layout="row"
            options={maritalStatusOptions}
            value={watch('maritalStatus')}
            onChange={value =>
              setValue('maritalStatus', value as MaritalStatus)
            }
          />
        </div>

        <div>
          <InputWithLabel
            label={t('financialAssistance.familyInfo.fields.dependents.label')}
            placeholder={t(
              'financialAssistance.familyInfo.fields.dependents.placeholder'
            )}
            type="number"
            min="0"
            error={getErrorMessage('dependents')}
            {...register('dependents', { valueAsNumber: true })}
          />
          <p className="mt-1 text-xs text-gray-500">
            {t('financialAssistance.familyInfo.fields.dependents.description')}
          </p>
        </div>

        <div>
          <RadioGroup
            id="employmentStatus"
            label={t(
              'financialAssistance.familyInfo.fields.employmentStatus.label'
            )}
            required
            error={getErrorMessage('employmentStatus')}
            layout="row"
            options={employmentStatusOptions}
            value={watch('employmentStatus')}
            onChange={value =>
              setValue('employmentStatus', value as EmploymentStatus)
            }
          />
        </div>

        <div>
          <InputWithLabel
            label={t(
              'financialAssistance.familyInfo.fields.monthlyIncome.label'
            )}
            placeholder={t(
              'financialAssistance.familyInfo.fields.monthlyIncome.placeholder'
            )}
            type="number"
            min="0"
            step="0.01"
            error={getErrorMessage('monthlyIncome')}
            {...register('monthlyIncome', { valueAsNumber: true })}
          />
          <p className="mt-1 text-xs text-gray-500">
            {t(
              'financialAssistance.familyInfo.fields.monthlyIncome.description'
            )}
          </p>
        </div>

        <div>
          <RadioGroup
            id="housingStatus"
            label={t(
              'financialAssistance.familyInfo.fields.housingStatus.label'
            )}
            required
            error={getErrorMessage('housingStatus')}
            layout="row"
            options={housingStatusOptions}
            value={watch('housingStatus')}
            onChange={value =>
              setValue('housingStatus', value as HousingStatus)
            }
          />
        </div>

        {watch('housingStatus') === 'other' && (
          <div>
            <InputWithLabel
              label={t(
                'financialAssistance.familyInfo.fields.housingDetails.label'
              )}
              placeholder={t(
                'financialAssistance.familyInfo.fields.housingDetails.placeholder'
              )}
              error={getErrorMessage('housingDetails')}
              {...register('housingDetails')}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between sm:gap-0">
        <SspButton
          type="button"
          variant="secondary"
          onClick={onPrevious}
          className="order-2 sm:order-1"
        >
          {t('financialAssistance.navigation.previous')}
        </SspButton>

        <SspButton
          type="submit"
          variant="primary"
          className="order-1 sm:order-2"
        >
          {t('financialAssistance.navigation.next')}
        </SspButton>
      </div>
    </form>
  );
};
