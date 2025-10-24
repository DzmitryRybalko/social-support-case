export interface FamilyInfo {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
  dependents: number;
  employmentStatus:
    | 'employed'
    | 'unemployed'
    | 'self-employed'
    | 'retired'
    | 'student'
    | 'disabled';
  monthlyIncome: number;
  housingStatus:
    | 'owned'
    | 'rented'
    | 'living-with-family'
    | 'homeless'
    | 'other';
  housingDetails?: string; // Additional details for housing status
}

export interface FamilyInfoFormProps {
  data?: Partial<FamilyInfo>;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitted: boolean;
  errors?: Record<string, string>;
}
