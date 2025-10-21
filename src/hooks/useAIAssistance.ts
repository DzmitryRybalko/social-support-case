/**
 * Custom hook for AI assistance functionality
 */

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { aiService, AISuggestion } from '@/services/aiService';

export interface UseAIAssistanceReturn {
  isLoading: boolean;
  error: string | null;
  suggestions: AISuggestion[];
  generateSuggestion: (text: string, fieldType: string) => Promise<void>;
  generateMultipleSuggestions: (text: string, fieldType: string) => Promise<void>;
  clearSuggestions: () => void;
  clearError: () => void;
}

export const useAIAssistance = (): UseAIAssistanceReturn => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);

  const generateSuggestion = useCallback(async (text: string, fieldType: string) => {
    if (!text.trim()) {
      setError('Please enter some text before requesting suggestions');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const suggestion = await aiService.generateSuggestion(
        text,
        fieldType,
        i18n.language
      );
      
      setSuggestions([suggestion]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestion';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language]);

  const generateMultipleSuggestions = useCallback(async (text: string, fieldType: string) => {
    if (!text.trim()) {
      setError('Please enter some text before requesting suggestions');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const multipleSuggestions = await aiService.generateMultipleSuggestions(
        text,
        fieldType,
        i18n.language
      );
      
      setSuggestions(multipleSuggestions);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate suggestions';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [i18n.language]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    suggestions,
    generateSuggestion,
    generateMultipleSuggestions,
    clearSuggestions,
    clearError,
  };
};
