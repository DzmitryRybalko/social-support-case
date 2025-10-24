import { PersonalInfo } from '../model/types/PersonalInfo';
import { FamilyInfo } from '../model/types/FamilyInfo';
import { SituationDescriptionFormData } from '../model/types/SituationDescription';

// Combined form data interface for complete application submission
export interface CompleteApplicationData {
  personalInfo: PersonalInfo;
  familyInfo: FamilyInfo;
  situationDescription: SituationDescriptionFormData;
  submissionDate: string;
  applicationId?: string;
}

// API response interface
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: CompleteApplicationData;
}

// Mock API function that simulates server communication with complete form data
export const submitCompleteApplication = async (
  data: CompleteApplicationData
): Promise<ApiResponse> => {
  console.log(data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    success: true,
    message: 'Application submitted successfully',
    data: {
      ...data,
      applicationId: Math.random().toString(36).substring(2, 15),
    },
  };
};
