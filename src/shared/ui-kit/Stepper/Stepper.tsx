import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { StepperProps } from './Stepper.type';

export const Stepper: React.FC<StepperProps> = ({
  steps,
  onStepClick,
  className = '',
}) => {
  const handleStepClick = (stepId: string) => {
    if (onStepClick) {
      onStepClick(stepId);
    }
  };

  return (
    <div className={`mb-8 ${className}`}>
      <div className="hidden items-center justify-between md:flex">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 ${
                step.isCompleted
                  ? 'bg-green-600 text-white'
                  : step.isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              {step.isCompleted ? (
                <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>

            <div className="mx-3">
              <p
                className={`text-sm font-medium ${
                  step.isCompleted
                    ? 'text-green-600'
                    : step.isActive
                      ? 'text-blue-600'
                      : 'text-gray-500'
                }`}
              >
                {step.title}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-4 h-0.5 flex-1 ${
                  step.isCompleted ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative space-y-4 md:hidden">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex items-start">
            <div
              className={`z-10 flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 ${
                step.isCompleted
                  ? 'bg-green-600 text-white'
                  : step.isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              {step.isCompleted ? (
                <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
              ) : (
                index + 1
              )}
            </div>

            <div className="ml-3 flex-1">
              <p
                className={`text-sm leading-5 font-medium ${
                  step.isCompleted
                    ? 'text-green-600'
                    : step.isActive
                      ? 'text-blue-600'
                      : 'text-gray-500'
                }`}
              >
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
