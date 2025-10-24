import { useState, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with TypeScript support
 * @param key - The localStorage key
 * @param initialValue - Initial value if no data exists in localStorage
 * @returns [storedValue, setValue, removeValue] - Current value, setter function, and remove function
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook specifically for form data persistence
 * Provides additional utilities for form management
 */
export function useFormLocalStorage<T>(key: string, initialValue: T) {
  const [formData, setFormData, clearFormData] = useLocalStorage(
    key,
    initialValue
  );

  const saveFormData = useCallback(
    (data: Partial<T>) => {
      setFormData(prevData => ({ ...prevData, ...data }));
    },
    [setFormData]
  );

  const loadFormData = useCallback(() => {
    return formData;
  }, [formData]);

  const hasFormData = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null;
    } catch (error) {
      return false;
    }
  }, [key]);

  const getFormDataSize = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? new Blob([item]).size : 0;
    } catch (error) {
      return 0;
    }
  }, [key]);

  const isFormDataValid = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return false;
      JSON.parse(item);
      return true;
    } catch (error) {
      return false;
    }
  }, [key]);

  const getFormKeys = useCallback(() => {
    try {
      const keys = Object.keys(window.localStorage);
      return keys.filter(key => key.includes('Form') || key.includes('form'));
    } catch (error) {
      return [];
    }
  }, []);

  const clearAllFormData = useCallback(() => {
    try {
      const formKeys = getFormKeys();
      formKeys.forEach(key => window.localStorage.removeItem(key));
    } catch (error) {
      console.warn('Error clearing all form data:', error);
    }
  }, [getFormKeys]);

  return {
    formData,
    saveFormData,
    loadFormData,
    clearFormData,
    hasFormData,
    setFormData,
    getFormDataSize,
    isFormDataValid,
    getFormKeys,
    clearAllFormData,
  };
}
