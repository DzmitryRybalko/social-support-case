import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '../shared/ui-kit/Spinner/Spinner';

const FinancialAssistance = lazy(() => 
  import('../pages/FinancialAssistance/FinancialAssistance').then(module => ({
    default: module.FinancialAssistance
  }))
);

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<FinancialAssistance />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
