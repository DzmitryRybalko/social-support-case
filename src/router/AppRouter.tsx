/**
 * React Router configuration for multi-step form
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Loading } from '@/components/common/Loading';

// Lazy load step components
const PersonalInformation = React.lazy(
  () => import('@/pages/PersonalInformation/PersonalInformation')
);
const FamilyFinancialInfo = React.lazy(
  () => import('@/pages/FamilyFinancialInfo/FamilyFinancialInfo')
);
const SituationDescription = React.lazy(
  () => import('@/pages/SituationDescription/SituationDescription')
);
const Success = React.lazy(() => import('@/pages/Success/Success'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Layout>
        <Suspense fallback={<Loading overlay />}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/personal-information" replace />}
            />
            <Route
              path="/personal-information"
              element={<PersonalInformation />}
            />
            <Route
              path="/family-financial-info"
              element={<FamilyFinancialInfo />}
            />
            <Route
              path="/situation-description"
              element={<SituationDescription />}
            />
            <Route path="/success" element={<Success />} />
            <Route
              path="*"
              element={<Navigate to="/personal-information" replace />}
            />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
