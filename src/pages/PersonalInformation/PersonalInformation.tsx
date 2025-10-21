/**
 * Personal Information Form
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/useFormContext';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { personalInfoSchema } from '@/types/validation';
import { PersonalInfo } from '@/types/FormData';

const PersonalInformation: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, updateData, validateStep } = useFormContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: state.data.personalInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      idNumber: '',
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: '',
      },
    },
  });

  const onSubmit = async (data: PersonalInfo) => {
    setIsSubmitting(true);

    try {
      updateData({ personalInfo: data });

      // Validate step before proceeding
      if (validateStep(1)) {
        navigate('/family-financial-info');
      }
    } catch (error) {
      console.error('Personal Information submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <ProgressIndicator currentStep={1} totalSteps={3} />

      <Card
        title={t('personalInfo.title')}
        subtitle={t('personalInfo.subtitle')}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.firstName')}
                value={watch('firstName') || ''}
                onChange={value => setValue('firstName', value)}
                error={errors.firstName?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.lastName')}
                value={watch('lastName') || ''}
                onChange={value => setValue('lastName', value)}
                error={errors.lastName?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.email')}
                type="email"
                value={watch('email') || ''}
                onChange={value => setValue('email', value)}
                error={errors.email?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.phone')}
                type="tel"
                value={watch('phone') || ''}
                onChange={value => setValue('phone', value)}
                error={errors.phone?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.dateOfBirth')}
                type="date"
                value={watch('dateOfBirth') || ''}
                onChange={value => setValue('dateOfBirth', value)}
                error={errors.dateOfBirth?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.nationality')}
                value={watch('nationality') || ''}
                onChange={value => setValue('nationality', value)}
                error={errors.nationality?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                label={t('personalInfo.idNumber')}
                value={watch('idNumber') || ''}
                onChange={value => setValue('idNumber', value)}
                error={errors.idNumber?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('personalInfo.address.title')}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Input
                label={t('personalInfo.address.street')}
                value={watch('address.street') || ''}
                onChange={value => setValue('address.street', value)}
                error={errors.address?.street?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.address.city')}
                value={watch('address.city') || ''}
                onChange={value => setValue('address.city', value)}
                error={errors.address?.city?.message}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('personalInfo.address.postalCode')}
                value={watch('address.postalCode') || ''}
                onChange={value => setValue('address.postalCode', value)}
                error={errors.address?.postalCode?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                label={t('personalInfo.address.country')}
                value={watch('address.country') || ''}
                onChange={value => setValue('address.country', value)}
                error={errors.address?.country?.message}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {t('common.next')}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default PersonalInformation;
