import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'openai_api_key';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    setIsLoading(false);
  }, []);

  const saveApiKey = (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKey(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey(null);
  };

  const hasApiKey = () => {
    return apiKey !== null && apiKey.length > 0;
  };

  return {
    apiKey,
    isLoading,
    saveApiKey,
    clearApiKey,
    hasApiKey,
  };
};
