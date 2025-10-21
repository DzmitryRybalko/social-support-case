/**
 * Success page after form submission
 */

import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '@/contexts/FormContext';

const Success: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetForm } = useFormContext();

  const handleNewApplication = () => {
    resetForm();
    navigate('/step1');
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />

        <Typography variant="h4" gutterBottom color="success.main">
          {t('success.title', 'Application Submitted Successfully!')}
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {t('success.subtitle', 'Thank you for your application')}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {t(
            'success.message',
            'Your social support application has been submitted successfully. You will receive a confirmation email shortly, and our team will review your application within 5-7 business days.'
          )}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t('success.reference', 'Reference Number:')} #
          {Date.now().toString().slice(-8)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleNewApplication}>
            {t('success.newApplication', 'Submit New Application')}
          </Button>

          <Button variant="outlined" onClick={() => window.print()}>
            {t('success.print', 'Print Confirmation')}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Success;
