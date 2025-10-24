import React from 'react';
import { FinancialAssistanceStepper } from '../../features/FinancialAssistance/ui/FinancialAssistanceStepper';

export const FinancialAssistance: React.FC = () => {
  return (
    <div className="py-2">
      <div className="container mx-auto px-4">
        <FinancialAssistanceStepper />
      </div>
    </div>
  );
};
