export interface PersonalInfo {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface PersonalInfoFormProps {
  data?: Partial<PersonalInfo>;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitted: boolean;
  errors?: Record<string, string>;
}
