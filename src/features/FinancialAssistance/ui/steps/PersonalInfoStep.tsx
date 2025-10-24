import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { InputWithLabel, RadioGroup, SspButton } from '@/shared/ui-kit';

import { PersonalInfoFormProps } from '../../model/types/PersonalInfo';
import { useFormLocalStorage } from '../../model/hooks/useLocalStorage';
import {
  FORM_SCHEMAS,
  PersonalInfoFormData,
} from '../../model/constants/formConstants';

export const PersonalInfoStep: React.FC<PersonalInfoFormProps> = ({
  data = {},
  onNext,
  onPrevious: _onPrevious,
  onSubmit,
  errors = {},
}) => {
  const { t } = useTranslation();

  const { formData: savedFormData, saveFormData } =
    useFormLocalStorage<PersonalInfoFormData>('personalInfoForm', {
      name: '',
      nationalId: '',
      dateOfBirth: '',
      gender: 'male',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(FORM_SCHEMAS.PERSONAL_INFO),
    defaultValues: {
      name: data.name || savedFormData.name || '',
      nationalId: data.nationalId || savedFormData.nationalId || '',
      dateOfBirth: data.dateOfBirth || savedFormData.dateOfBirth || '',
      gender: data.gender || savedFormData.gender || 'male',
      address: data.address || savedFormData.address || '',
      city: data.city || savedFormData.city || '',
      state: data.state || savedFormData.state || '',
      country: data.country || savedFormData.country || '',
      phone: data.phone || savedFormData.phone || '',
      email: data.email || savedFormData.email || '',
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

  const onFormSubmit = (formData: PersonalInfoFormData) => {
    console.log(formData);
    onSubmit();
    onNext();
  };

  const getErrorMessage = (fieldName: keyof PersonalInfoFormData) => {
    const formError = formErrors[fieldName];
    if (formError) {
      const errorKey = formError.message as keyof typeof t;
      return t(`financialAssistance.personalInfo.validation.${errorKey}`, {
        fieldName: t(
          `financialAssistance.personalInfo.fields.${fieldName}.label`
        ),
      });
    }
    return errors[fieldName] || '';
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <InputWithLabel
            label={t('financialAssistance.personalInfo.fields.name.label')}
            placeholder={t(
              'financialAssistance.personalInfo.fields.name.placeholder'
            )}
            error={getErrorMessage('name')}
            {...register('name')}
            required
          />
        </div>

        <div>
          <InputWithLabel
            label={t(
              'financialAssistance.personalInfo.fields.nationalId.label'
            )}
            placeholder={t(
              'financialAssistance.personalInfo.fields.nationalId.placeholder'
            )}
            error={getErrorMessage('nationalId')}
            {...register('nationalId')}
            required
          />
        </div>

        <div>
          <InputWithLabel
            label={t(
              'financialAssistance.personalInfo.fields.dateOfBirth.label'
            )}
            type="date"
            error={getErrorMessage('dateOfBirth')}
            {...register('dateOfBirth')}
            required
            />
        </div>

        <div>
          <RadioGroup
            id="gender"
            label={t('financialAssistance.personalInfo.fields.gender.label')}
            required
            error={getErrorMessage('gender')}
            layout="row"
            options={[
              {
                value: 'male',
                label: t(
                  'financialAssistance.personalInfo.fields.gender.options.male'
                ),
              },
              {
                value: 'female',
                label: t(
                  'financialAssistance.personalInfo.fields.gender.options.female'
                ),
              },
              {
                value: 'other',
                label: t(
                  'financialAssistance.personalInfo.fields.gender.options.other'
                ),
              },
            ]}
            value={watch('gender')}
            onChange={value =>
              setValue('gender', value as 'male' | 'female' | 'other')
            }
          />
        </div>

        <div>
          <InputWithLabel
            label={t('financialAssistance.personalInfo.fields.phone.label')}
            placeholder={t(
              'financialAssistance.personalInfo.fields.phone.placeholder'
            )}
            error={getErrorMessage('phone')}
            {...register('phone')}
            required
          />
        </div>

        <div>
          <InputWithLabel
            label={t('financialAssistance.personalInfo.fields.email.label')}
            placeholder={t(
              'financialAssistance.personalInfo.fields.email.placeholder'
            )}
            error={getErrorMessage('email')}
            {...register('email')}
            required
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md mb-4 font-medium text-gray-900">
          {t('financialAssistance.personalInfo.addressSection.title')}
        </h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <InputWithLabel
              label={t('financialAssistance.personalInfo.fields.address.label')}
              placeholder={t(
                'financialAssistance.personalInfo.fields.address.placeholder'
              )}
              error={getErrorMessage('address')}
              {...register('address')}
              required
            />
          </div>

          <div>
            <InputWithLabel
              label={t('financialAssistance.personalInfo.fields.city.label')}
              placeholder={t(
                'financialAssistance.personalInfo.fields.city.placeholder'
              )}
              error={getErrorMessage('city')}
              {...register('city')}
              required
            />
          </div>

          <div>
            <InputWithLabel
              label={t('financialAssistance.personalInfo.fields.state.label')}
              placeholder={t(
                'financialAssistance.personalInfo.fields.state.placeholder'
              )}
              error={getErrorMessage('state')}
              {...register('state')}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <InputWithLabel
              label={t('financialAssistance.personalInfo.fields.country.label')}
              placeholder={t(
                'financialAssistance.personalInfo.fields.country.placeholder'
              )}
              error={getErrorMessage('country')}
              {...register('country')}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-between sm:gap-0">
        <SspButton
          type="submit"
          variant="primary"
          className="order-1 ml-auto sm:order-2"
        >
          {t('financialAssistance.navigation.next')}
        </SspButton>
      </div>
    </form>
  );
};
