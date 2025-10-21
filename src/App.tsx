/**
 * Main App component with providers
 */

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { FormProvider } from '@/contexts/FormContext';
import { AppRouter } from '@/router/AppRouter';
import '@/locales/i18n';

// Create theme with RTL support
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  direction: 'ltr', // Will be updated based on language
});

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider>
        <AppRouter />
      </FormProvider>
    </ThemeProvider>
  );
};
