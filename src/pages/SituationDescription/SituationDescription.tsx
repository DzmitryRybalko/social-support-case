/**
 * Situation Description Form with AI Assistance
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  Grid,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '@/contexts/useFormContext';
import { useAIAssistance } from '@/hooks/useAIAssistance';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { situationDescriptionSchema } from '@/types/validation';
import { SituationDescription } from '@/types/FormData';

const SituationDescription: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, updateData, validateStep, setSubmitting } = useFormContext();
  const {
    isLoading: aiLoading,
    error: aiError,
    suggestions,
    generateSuggestion,
    clearSuggestions,
  } = useAIAssistance();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestionDialog, setSuggestionDialog] = useState<{
    open: boolean;
    field: string;
    originalText: string;
  }>({ open: false, field: '', originalText: '' });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SituationDescription>({
    resolver: zodResolver(situationDescriptionSchema),
    defaultValues: state.data.situationDescription || {
      currentSituation: '',
      financialHardship: '',
      requestedAssistance: '',
      supportingDocuments: [],
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: SituationDescription) => {
    setIsSubmitting(true);
    setSubmitting(true);

    try {
      updateData({ situationDescription: data });

      if (validateStep(3)) {
        // Here you would typically submit to your API
        console.log('Form submitted:', {
          ...state.data,
          situationDescription: data,
        });
        navigate('/success');
      }
    } catch (error) {
      console.error('Situation Description submission error:', error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleAISuggestion = async (field: keyof SituationDescription) => {
    const currentValue = watch(field);
    const textValue = Array.isArray(currentValue)
      ? currentValue.join('\n')
      : currentValue || '';

    if (!textValue.trim()) {
      return;
    }

    try {
      await generateSuggestion(textValue, field);
      setSuggestionDialog({
        open: true,
        field,
        originalText: textValue,
      });
    } catch (error) {
      console.error('AI suggestion error:', error);
    }
  };

  const acceptSuggestion = (suggestedText: string) => {
    const field = suggestionDialog.field as keyof SituationDescription;
    setValue(field, suggestedText);
    setSuggestionDialog({ open: false, field: '', originalText: '' });
    clearSuggestions();
  };

  const discardSuggestion = () => {
    setSuggestionDialog({ open: false, field: '', originalText: '' });
    clearSuggestions();
  };

  return (
    <Box>
      <ProgressIndicator currentStep={3} totalSteps={3} />

      <Card
        title={t('situationDescription.title')}
        subtitle={t('situationDescription.subtitle')}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="h6">
                  {t('situationDescription.currentSituation')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAISuggestion('currentSituation')}
                  loading={aiLoading}
                  disabled={!watch('currentSituation')?.trim()}
                >
                  {t('ai.suggestions')}
                </Button>
              </Box>
              <Input
                label=""
                multiline
                rows={4}
                value={watch('currentSituation') || ''}
                onChange={value => setValue('currentSituation', value)}
                placeholder={t(
                  'situationDescription.currentSituationPlaceholder'
                )}
                error={errors.currentSituation?.message}
                required
                helperText={t('validation.minLength', { count: 50 })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="h6">
                  {t('situationDescription.financialHardship')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAISuggestion('financialHardship')}
                  loading={aiLoading}
                  disabled={!watch('financialHardship')?.trim()}
                >
                  {t('ai.suggestions')}
                </Button>
              </Box>
              <Input
                label=""
                multiline
                rows={4}
                value={watch('financialHardship') || ''}
                onChange={value => setValue('financialHardship', value)}
                placeholder={t(
                  'situationDescription.financialHardshipPlaceholder'
                )}
                error={errors.financialHardship?.message}
                required
                helperText={t('validation.minLength', { count: 50 })}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="h6">
                  {t('situationDescription.requestedAssistance')}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleAISuggestion('requestedAssistance')}
                  loading={aiLoading}
                  disabled={!watch('requestedAssistance')?.trim()}
                >
                  {t('ai.suggestions')}
                </Button>
              </Box>
              <Input
                label=""
                multiline
                rows={4}
                value={watch('requestedAssistance') || ''}
                onChange={value => setValue('requestedAssistance', value)}
                placeholder={t(
                  'situationDescription.requestedAssistancePlaceholder'
                )}
                error={errors.requestedAssistance?.message}
                required
                helperText={t('validation.minLength', { count: 30 })}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('situationDescription.supportingDocuments')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t(
                  'situationDescription.supportingDocumentsHelp',
                  'Please list any documents that support your application (e.g., medical reports, employment termination letters, bills, etc.)'
                )}
              </Typography>
              <Input
                label=""
                multiline
                rows={3}
                value={watch('supportingDocuments')?.join('\n') || ''}
                onChange={value =>
                  setValue(
                    'supportingDocuments',
                    value.split('\n').filter(doc => doc.trim())
                  )
                }
                placeholder="Document 1&#10;Document 2&#10;Document 3"
                error={errors.supportingDocuments?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('situationDescription.additionalInfo')}
              </Typography>
              <Input
                label=""
                multiline
                rows={3}
                value={watch('additionalInfo') || ''}
                onChange={value => setValue('additionalInfo', value)}
                placeholder={t(
                  'situationDescription.additionalInfoPlaceholder'
                )}
                error={errors.additionalInfo?.message}
              />
            </Grid>

            {aiError && (
              <Grid item xs={12}>
                <Alert severity="error">{aiError}</Alert>
              </Grid>
            )}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/family-financial-info')}
            >
              {t('common.previous')}
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {t('common.submit')}
            </Button>
          </Box>
        </form>
      </Card>

      {/* AI Suggestion Dialog */}
      <Dialog
        open={suggestionDialog.open}
        onClose={discardSuggestion}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('ai.suggestions')}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t(
              'ai.suggestionHelp',
              'Here are some suggestions to improve your text:'
            )}
          </Typography>

          {suggestions.map(suggestion => (
            <Box key={suggestion.id} sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                {t('ai.originalText', 'Original:')}
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1, mb: 1 }}>
                <Typography variant="body2">
                  {suggestion.originalText}
                </Typography>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                {t('ai.suggestedText', 'Suggested:')}
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2">
                  {suggestion.suggestedText}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={`${t('ai.confidence', 'Confidence')}: ${Math.round(suggestion.confidence * 100)}%`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={discardSuggestion}>{t('ai.discard')}</Button>
          <Button
            variant="contained"
            onClick={() =>
              acceptSuggestion(suggestions[0]?.suggestedText || '')
            }
            disabled={suggestions.length === 0}
          >
            {t('ai.accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SituationDescription;
