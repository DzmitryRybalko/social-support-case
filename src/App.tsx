import React from 'react';
import { AppRouter } from './router/AppRouter';
import { Layout } from './shared/layout';
import { RTLProvider } from './shared/contexts';
import { ErrorBoundary } from './shared/components/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RTLProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </RTLProvider>
    </ErrorBoundary>
  );
};
