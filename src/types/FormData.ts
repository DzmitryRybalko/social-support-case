/**
 * Form data types for the social support application
 */

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface FamilyInfo {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  numberOfChildren: number;
  dependents: Array<{
    name: string;
    relationship: string;
    age: number;
  }>;
  householdIncome: number;
  monthlyExpenses: number;
}

export interface FinancialInfo {
  employmentStatus: 'employed' | 'unemployed' | 'self-employed' | 'retired' | 'student';
  monthlyIncome: number;
  savings: number;
  debts: Array<{
    creditor: string;
    amount: number;
    monthlyPayment: number;
  }>;
  assets: Array<{
    type: string;
    value: number;
  }>;
}

export interface SituationDescription {
  currentSituation: string;
  financialHardship: string;
  requestedAssistance: string;
  supportingDocuments: string[];
  additionalInfo?: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  familyInfo: FamilyInfo;
  financialInfo: FinancialInfo;
  situationDescription: SituationDescription;
}

export interface ValidationErrors {
  personalInfo?: Partial<Record<keyof PersonalInfo, string>>;
  familyInfo?: Partial<Record<keyof FamilyInfo, string>>;
  financialInfo?: Partial<Record<keyof FinancialInfo, string>>;
  situationDescription?: Partial<Record<keyof SituationDescription, string>>;
}

export interface StepProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
  onPrevious: () => void;
  errors: ValidationErrors;
}

export interface AISuggestion {
  id: string;
  originalText: string;
  suggestedText: string;
  confidence: number;
  timestamp: Date;
}

export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
