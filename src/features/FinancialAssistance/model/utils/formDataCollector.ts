import { PersonalInfo } from '../types/PersonalInfo';
import { FamilyInfo } from '../types/FamilyInfo';
import { SituationDescriptionFormData } from '../types/SituationDescription';
import { CompleteApplicationData } from '../../api/applicationApi';

const defaultPersonalInfo: PersonalInfo = {
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
};

const defaultFamilyInfo: FamilyInfo = {
  maritalStatus: 'single',
  dependents: 0,
  employmentStatus: 'unemployed',
  monthlyIncome: 0,
  housingStatus: 'rented',
  housingDetails: '',
};

const defaultSituationDescription: SituationDescriptionFormData = {
  currentFinancialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: '',
  additionalDetails: '',
};

/**
 * Collects all form data from localStorage and combines it into a complete application
 * @returns CompleteApplicationData object with all form data
 */
export const collectAllFormData = (): CompleteApplicationData => {
  const personalInfoData = getStoredFormData<PersonalInfo>(
    'personalInfoForm',
    defaultPersonalInfo
  );
  const familyInfoData = getStoredFormData<FamilyInfo>(
    'familyInfoForm',
    defaultFamilyInfo
  );
  const situationDescriptionData =
    getStoredFormData<SituationDescriptionFormData>(
      'situationDescriptionForm',
      defaultSituationDescription
    );

  const completeData: CompleteApplicationData = {
    personalInfo: personalInfoData,
    familyInfo: familyInfoData,
    situationDescription: situationDescriptionData,
    submissionDate: new Date().toISOString(),
  };

  return completeData;
};

/**
 * Helper function to safely get form data from localStorage
 * @param key localStorage key
 * @param defaultValue default value if no data exists
 * @returns parsed form data or default value
 */
const getStoredFormData = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return { ...defaultValue, ...parsedData };
    }
  } catch (error) {
    console.warn(`Failed to parse localStorage data for key "${key}":`, error);
  }
  return defaultValue;
};
