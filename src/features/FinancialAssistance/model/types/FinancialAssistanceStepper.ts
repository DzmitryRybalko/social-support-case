import React from 'react';
import { PersonalInfoStep } from '../../ui/steps/PersonalInfoStep';
import { SituationDescriptionStep } from '../../ui/steps/SituationDescriptionStep';
import { FamilyInfoStep } from '../../ui/steps/FamilyInfoStep';

export enum FinancialAssistanceSteps {
  PersonalInformation = 'personalInformation',
  SituationDescription = 'situationDescription',
  FamilyInfo = 'familyInfo',
}

export interface StepConfig {
  id: FinancialAssistanceSteps;
  component: React.ComponentType<{
    onNext: () => void;
    onPrevious: () => void;
    onSubmit: () => void;
    isSubmitted: boolean;
  }>;
  translationKey: string;
}

export const STEP_CONFIG: StepConfig[] = [
  {
    id: FinancialAssistanceSteps.PersonalInformation,
    component: PersonalInfoStep,
    translationKey: 'financialAssistance.steps.personalInformation',
  },
  {
    id: FinancialAssistanceSteps.FamilyInfo,
    component: FamilyInfoStep,
    translationKey: 'financialAssistance.steps.familyInfo',
  },
  {
    id: FinancialAssistanceSteps.SituationDescription,
    component: SituationDescriptionStep,
    translationKey: 'financialAssistance.steps.situationDescription',
  },
];

// Helper functions for step management
export const getStepConfig = (
  stepId: FinancialAssistanceSteps
): StepConfig | undefined => {
  return STEP_CONFIG.find(config => config.id === stepId);
};

export const getStepIndex = (stepId: FinancialAssistanceSteps): number => {
  return STEP_CONFIG.findIndex(config => config.id === stepId);
};

export const getCurrentStepIndex = (
  currentStep: FinancialAssistanceSteps
): number => {
  return getStepIndex(currentStep);
};

export const isStepCompleted = (
  stepId: FinancialAssistanceSteps,
  currentStep: FinancialAssistanceSteps
): boolean => {
  const stepIndex = getStepIndex(stepId);
  const currentIndex = getCurrentStepIndex(currentStep);
  return stepIndex < currentIndex;
};

export const getNextStep = (
  currentStep: FinancialAssistanceSteps
): FinancialAssistanceSteps | null => {
  const currentIndex = getCurrentStepIndex(currentStep);
  const nextConfig = STEP_CONFIG[currentIndex + 1];
  return nextConfig ? nextConfig.id : null;
};

export const getPreviousStep = (
  currentStep: FinancialAssistanceSteps
): FinancialAssistanceSteps | null => {
  const currentIndex = getCurrentStepIndex(currentStep);
  const prevConfig = STEP_CONFIG[currentIndex - 1];
  return prevConfig ? prevConfig.id : null;
};
