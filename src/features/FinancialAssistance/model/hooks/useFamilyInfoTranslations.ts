import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MaritalStatus, EmploymentStatus, HousingStatus } from '../types/MaritalStatus';

export const useFamilyInfoTranslations = () => {
  const { t } = useTranslation();

  const maritalStatusOptions: { value: MaritalStatus, label: string }[] = useMemo(() => [
    { value: 'single', label: t('financialAssistance.familyInfo.fields.maritalStatus.options.single') },
    { value: 'married', label: t('financialAssistance.familyInfo.fields.maritalStatus.options.married') },
    { value: 'divorced', label: t('financialAssistance.familyInfo.fields.maritalStatus.options.divorced') },
    { value: 'widowed', label: t('financialAssistance.familyInfo.fields.maritalStatus.options.widowed') },
    { value: 'separated', label: t('financialAssistance.familyInfo.fields.maritalStatus.options.separated') },
  ], [t]);

  const employmentStatusOptions: { value: EmploymentStatus, label: string }[] = useMemo(() => [
    { value: 'employed', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.employed') },
    { value: 'unemployed', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.unemployed') },
    { value: 'self-employed', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.self-employed') },
    { value: 'retired', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.retired') },
    { value: 'student', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.student') },
    { value: 'disabled', label: t('financialAssistance.familyInfo.fields.employmentStatus.options.disabled') },
  ], [t]);

  const housingStatusOptions: { value: HousingStatus, label: string }[] = useMemo(() => [
    { value: 'owned', label: t('financialAssistance.familyInfo.fields.housingStatus.options.owned') },
    { value: 'rented', label: t('financialAssistance.familyInfo.fields.housingStatus.options.rented') },
    { value: 'living-with-family', label: t('financialAssistance.familyInfo.fields.housingStatus.options.living-with-family') },
    { value: 'homeless', label: t('financialAssistance.familyInfo.fields.housingStatus.options.homeless') },
    { value: 'other', label: t('financialAssistance.familyInfo.fields.housingStatus.options.other') },
  ], [t]);

  return {
    maritalStatusOptions,
    employmentStatusOptions,
    housingStatusOptions,
  };
};
