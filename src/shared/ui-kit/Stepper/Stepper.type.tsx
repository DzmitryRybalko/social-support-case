export interface StepperStep {
  id: string;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  onStepClick?: (stepId: string) => void;
  className?: string;
}
