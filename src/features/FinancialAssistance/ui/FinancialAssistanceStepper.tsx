import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Stepper, StepperStep } from '../../../shared/ui-kit';
import {
  FinancialAssistanceSteps,
  STEP_CONFIG,
  getStepConfig,
  getNextStep,
  getPreviousStep,
} from '../model/types/FinancialAssistanceStepper';

export const FinancialAssistanceStepper: React.FC = () => {
  const { t } = useTranslation();
  const stepperRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(
    FinancialAssistanceSteps.PersonalInformation
  );

  const [submittedSteps, setSubmittedSteps] = useState<
    Set<FinancialAssistanceSteps>
  >(new Set());

  const [shouldScroll, setShouldScroll] = useState(false);

  const stepperSteps = useMemo((): StepperStep[] => {
    return STEP_CONFIG.map(config => ({
      id: config.id,
      title: t(config.translationKey),
      isActive: currentStep === config.id,
      isCompleted: submittedSteps.has(config.id),
    }));
  }, [currentStep, t, submittedSteps]);

  // Scroll to stepper when step changes (only on navigation, not on reload)
  useEffect(() => {
    if (shouldScroll && stepperRef.current) {
      stepperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setShouldScroll(false); // Reset the flag after scrolling
    }
  }, [currentStep, shouldScroll]);

  const currentStepConfig = getStepConfig(currentStep);
  const nextStep = getNextStep(currentStep);
  const previousStep = getPreviousStep(currentStep);

  const handleStepChange = (stepId: string) => {
    const targetStep = stepId as FinancialAssistanceSteps;
    const targetStepIndex = STEP_CONFIG.findIndex(
      config => config.id === targetStep
    );
    const currentStepIndex = STEP_CONFIG.findIndex(
      config => config.id === currentStep
    );

    // Allow navigation to previous steps or current step
    if (targetStepIndex <= currentStepIndex) {
      setShouldScroll(true);
      setCurrentStep(targetStep);
      return;
    }

    // For next steps, only allow if current step is submitted
    if (submittedSteps.has(currentStep)) {
      setShouldScroll(true);
      setCurrentStep(targetStep);
    }
  };

  const handleStepSubmit = (stepId: FinancialAssistanceSteps) => {
    setSubmittedSteps(prev => new Set([...prev, stepId]));
  };

  const handleNext = () => {
    if (nextStep) {
      setShouldScroll(true);
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    if (previousStep) {
      setShouldScroll(true);
      setCurrentStep(previousStep);
    }
  };

  if (!currentStepConfig) {
    return null;
  }

  return (
    <div
      ref={stepperRef}
      className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6"
    >
      {/* Stepper Header */}
      <Stepper steps={stepperSteps} onStepClick={handleStepChange} />

      {/* Step Content */}
      <div className="min-h-96 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">
          {t(currentStepConfig.translationKey)}
        </h2>
        <div className="text-gray-600">
          <currentStepConfig.component
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={() => handleStepSubmit(currentStep)}
            isSubmitted={submittedSteps.has(currentStep)}
          />
        </div>
      </div>
    </div>
  );
};
