/**
 * Form Context for managing multi-step form state
 */

import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { FormData, ValidationErrors } from '@/types/FormData';
import { formDataSchema } from '@/types/validation';

interface FormState {
  data: Partial<FormData>;
  currentStep: number;
  errors: ValidationErrors;
  isDirty: boolean;
  isSubmitting: boolean;
}

type FormAction =
  | { type: 'UPDATE_DATA'; payload: Partial<FormData> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ERRORS'; payload: ValidationErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' };

interface FormContextType {
  state: FormState;
  updateData: (data: Partial<FormData>) => void;
  setStep: (step: number) => void;
  setErrors: (errors: ValidationErrors) => void;
  clearErrors: () => void;
  setDirty: (isDirty: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateStep: (step: number) => boolean;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

const initialState: FormState = {
  data: {},
  currentStep: 1,
  errors: {},
  isDirty: false,
  isSubmitting: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isDirty: true,
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {},
      };
    case 'SET_DIRTY':
      return {
        ...state,
        isDirty: action.payload,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export { FormContext };
export type { FormContextType };

const STORAGE_KEY = 'social-support-form-data';

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const saveToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }, [state.data]);

  // Load form data from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Save form data to localStorage whenever data changes
  useEffect(() => {
    if (state.isDirty) {
      saveToStorage();
    }
  }, [state.data, state.isDirty, saveToStorage]);

  const updateData = (data: Partial<FormData>) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  };

  const setStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const setErrors = (errors: ValidationErrors) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const setDirty = (isDirty: boolean) => {
    dispatch({ type: 'SET_DIRTY', payload: isDirty });
  };

  const setSubmitting = (isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
    localStorage.removeItem(STORAGE_KEY);
  };

  const validateStep = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          formDataSchema.shape.personalInfo.parse(state.data.personalInfo);
          break;
        case 2:
          formDataSchema.shape.familyInfo.parse(state.data.familyInfo);
          formDataSchema.shape.financialInfo.parse(state.data.financialInfo);
          break;
        case 3:
          formDataSchema.shape.situationDescription.parse(
            state.data.situationDescription
          );
          break;
        default:
          return false;
      }
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const loadFromStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'UPDATE_DATA', payload: parsedData });
        dispatch({ type: 'SET_DIRTY', payload: false });
      }
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
    }
  };

  const contextValue: FormContextType = {
    state,
    updateData,
    setStep,
    setErrors,
    clearErrors,
    setDirty,
    setSubmitting,
    resetForm,
    validateStep,
    saveToStorage,
    loadFromStorage,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
