import { SituationDescriptionFormData } from '../constants/formConstants';

export type { SituationDescriptionFormData };

export interface SituationDescriptionFormProps {
  data?: Partial<SituationDescriptionFormData>;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isSubmitted: boolean;
  errors?: Record<string, string>;
}
