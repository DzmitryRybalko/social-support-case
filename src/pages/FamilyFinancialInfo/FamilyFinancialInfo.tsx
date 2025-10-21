/**
 * Family & Financial Information Form
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Grid, IconButton, Divider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/useFormContext';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { familyInfoSchema, financialInfoSchema } from '@/types/validation';
import { FamilyInfo, FinancialInfo } from '@/types/FormData';

const FamilyFinancialInfo: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, updateData, validateStep } = useFormContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const familyForm = useForm<FamilyInfo>({
    resolver: zodResolver(familyInfoSchema),
    defaultValues: state.data.familyInfo || {
      maritalStatus: 'single',
      numberOfChildren: 0,
      dependents: [],
      householdIncome: 0,
      monthlyExpenses: 0,
    },
  });

  const financialForm = useForm<FinancialInfo>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: state.data.financialInfo || {
      employmentStatus: 'unemployed',
      monthlyIncome: 0,
      savings: 0,
      debts: [],
      assets: [],
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const familyData = familyForm.getValues();
      const financialData = financialForm.getValues();

      updateData({
        familyInfo: familyData,
        financialInfo: financialData,
      });

      if (validateStep(2)) {
        navigate('/situation-description');
      }
    } catch (error) {
      console.error('Family & Financial Information submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDependent = () => {
    const currentDependents = familyForm.getValues('dependents') || [];
    familyForm.setValue('dependents', [
      ...currentDependents,
      { name: '', relationship: '', age: 0 },
    ]);
  };

  const removeDependent = (index: number) => {
    const currentDependents = familyForm.getValues('dependents') || [];
    familyForm.setValue(
      'dependents',
      currentDependents.filter((_, i) => i !== index)
    );
  };

  const addDebt = () => {
    const currentDebts = financialForm.getValues('debts') || [];
    financialForm.setValue('debts', [
      ...currentDebts,
      { creditor: '', amount: 0, monthlyPayment: 0 },
    ]);
  };

  const removeDebt = (index: number) => {
    const currentDebts = financialForm.getValues('debts') || [];
    financialForm.setValue(
      'debts',
      currentDebts.filter((_, i) => i !== index)
    );
  };

  const addAsset = () => {
    const currentAssets = financialForm.getValues('assets') || [];
    financialForm.setValue('assets', [
      ...currentAssets,
      { type: '', value: 0 },
    ]);
  };

  const removeAsset = (index: number) => {
    const currentAssets = financialForm.getValues('assets') || [];
    financialForm.setValue(
      'assets',
      currentAssets.filter((_, i) => i !== index)
    );
  };

  return (
    <Box>
      <ProgressIndicator currentStep={2} totalSteps={3} />

      {/* Family Information */}
      <Card title={t('familyInfo.title')} subtitle={t('familyInfo.subtitle')}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Select
                label={t('familyInfo.maritalStatus')}
                value={familyForm.watch('maritalStatus') || 'single'}
                onChange={value =>
                  familyForm.setValue(
                    'maritalStatus',
                    value as FamilyInfo['maritalStatus']
                  )
                }
                options={[
                  {
                    value: 'single',
                    label: t('familyInfo.maritalStatusOptions.single'),
                  },
                  {
                    value: 'married',
                    label: t('familyInfo.maritalStatusOptions.married'),
                  },
                  {
                    value: 'divorced',
                    label: t('familyInfo.maritalStatusOptions.divorced'),
                  },
                  {
                    value: 'widowed',
                    label: t('familyInfo.maritalStatusOptions.widowed'),
                  },
                ]}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('familyInfo.numberOfChildren')}
                type="number"
                value={familyForm.watch('numberOfChildren')?.toString() || '0'}
                onChange={value =>
                  familyForm.setValue('numberOfChildren', parseInt(value) || 0)
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {t('familyInfo.dependents')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addDependent}
                  startIcon={<AddIcon />}
                >
                  {t('common.add')}
                </Button>
              </Box>

              {familyForm.watch('dependents')?.map((dependent, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Input
                        label={t('familyInfo.dependent.name')}
                        value={dependent.name}
                        onChange={value => {
                          const dependents =
                            familyForm.getValues('dependents') || [];
                          dependents[index].name = value;
                          familyForm.setValue('dependents', dependents);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Input
                        label={t('familyInfo.dependent.relationship')}
                        value={dependent.relationship}
                        onChange={value => {
                          const dependents =
                            familyForm.getValues('dependents') || [];
                          dependents[index].relationship = value;
                          familyForm.setValue('dependents', dependents);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Input
                        label={t('familyInfo.dependent.age')}
                        type="number"
                        value={dependent.age.toString()}
                        onChange={value => {
                          const dependents =
                            familyForm.getValues('dependents') || [];
                          dependents[index].age = parseInt(value) || 0;
                          familyForm.setValue('dependents', dependents);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => removeDependent(index)}
                        sx={{ mt: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('familyInfo.householdIncome')}
                type="number"
                value={familyForm.watch('householdIncome')?.toString() || '0'}
                onChange={value =>
                  familyForm.setValue('householdIncome', parseFloat(value) || 0)
                }
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('familyInfo.monthlyExpenses')}
                type="number"
                value={familyForm.watch('monthlyExpenses')?.toString() || '0'}
                onChange={value =>
                  familyForm.setValue('monthlyExpenses', parseFloat(value) || 0)
                }
                required
              />
            </Grid>
          </Grid>
        </form>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Financial Information */}
      <Card
        title={t('financialInfo.title')}
        subtitle={t('financialInfo.subtitle')}
      >
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Select
                label={t('financialInfo.employmentStatus')}
                value={financialForm.watch('employmentStatus') || 'unemployed'}
                onChange={value =>
                  financialForm.setValue(
                    'employmentStatus',
                    value as FinancialInfo['employmentStatus']
                  )
                }
                options={[
                  {
                    value: 'employed',
                    label: t('financialInfo.employmentStatusOptions.employed'),
                  },
                  {
                    value: 'unemployed',
                    label: t(
                      'financialInfo.employmentStatusOptions.unemployed'
                    ),
                  },
                  {
                    value: 'self-employed',
                    label: t(
                      'financialInfo.employmentStatusOptions.self-employed'
                    ),
                  },
                  {
                    value: 'retired',
                    label: t('financialInfo.employmentStatusOptions.retired'),
                  },
                  {
                    value: 'student',
                    label: t('financialInfo.employmentStatusOptions.student'),
                  },
                ]}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('financialInfo.monthlyIncome')}
                type="number"
                value={financialForm.watch('monthlyIncome')?.toString() || '0'}
                onChange={value =>
                  financialForm.setValue(
                    'monthlyIncome',
                    parseFloat(value) || 0
                  )
                }
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label={t('financialInfo.savings')}
                type="number"
                value={financialForm.watch('savings')?.toString() || '0'}
                onChange={value =>
                  financialForm.setValue('savings', parseFloat(value) || 0)
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">{t('financialInfo.debts')}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addDebt}
                  startIcon={<AddIcon />}
                >
                  {t('common.add')}
                </Button>
              </Box>

              {financialForm.watch('debts')?.map((debt, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Input
                        label={t('financialInfo.debt.creditor')}
                        value={debt.creditor}
                        onChange={value => {
                          const debts = financialForm.getValues('debts') || [];
                          debts[index].creditor = value;
                          financialForm.setValue('debts', debts);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Input
                        label={t('financialInfo.debt.amount')}
                        type="number"
                        value={debt.amount.toString()}
                        onChange={value => {
                          const debts = financialForm.getValues('debts') || [];
                          debts[index].amount = parseFloat(value) || 0;
                          financialForm.setValue('debts', debts);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Input
                        label={t('financialInfo.debt.monthlyPayment')}
                        type="number"
                        value={debt.monthlyPayment.toString()}
                        onChange={value => {
                          const debts = financialForm.getValues('debts') || [];
                          debts[index].monthlyPayment = parseFloat(value) || 0;
                          financialForm.setValue('debts', debts);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton
                        color="error"
                        onClick={() => removeDebt(index)}
                        sx={{ mt: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {t('financialInfo.assets')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addAsset}
                  startIcon={<AddIcon />}
                >
                  {t('common.add')}
                </Button>
              </Box>

              {financialForm.watch('assets')?.map((asset, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        label={t('financialInfo.asset.type')}
                        value={asset.type}
                        onChange={value => {
                          const assets =
                            financialForm.getValues('assets') || [];
                          assets[index].type = value;
                          financialForm.setValue('assets', assets);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Input
                        label={t('financialInfo.asset.value')}
                        type="number"
                        value={asset.value.toString()}
                        onChange={value => {
                          const assets =
                            financialForm.getValues('assets') || [];
                          assets[index].value = parseFloat(value) || 0;
                          financialForm.setValue('assets', assets);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton
                        color="error"
                        onClick={() => removeAsset(index)}
                        sx={{ mt: 2 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </form>
      </Card>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/personal-information')}
        >
          {t('common.previous')}
        </Button>
        <Button variant="contained" onClick={onSubmit} loading={isSubmitting}>
          {t('common.next')}
        </Button>
      </Box>
    </Box>
  );
};

export default FamilyFinancialInfo;
