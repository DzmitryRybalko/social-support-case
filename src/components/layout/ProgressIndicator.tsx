/**
 * Progress indicator component for multi-step form
 */

import React from 'react';
import { Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { t } = useTranslation();

  const steps = [
    t('navigation.step1'),
    t('navigation.step2'),
    t('navigation.step3'),
  ];

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" gutterBottom align="center">
        {t('navigation.progress')} ({currentStep}/{totalSteps})
      </Typography>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
