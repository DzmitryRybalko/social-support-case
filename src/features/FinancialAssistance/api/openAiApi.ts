import axios from 'axios';

const API_KEY_STORAGE_KEY = 'openai_api_key';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60_000,
});

apiClient.interceptors.request.use(config => {
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  const apiKey = envApiKey || storedApiKey;

  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }

  return config;
});

export const hasApiKey = (): boolean => {
  const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  return !!(envApiKey || storedApiKey);
};

export interface AIAssistanceRequest {
  fieldType:
    | 'currentFinancialSituation'
    | 'employmentCircumstances'
    | 'reasonForApplying';
  currentText?: string;
}

export const getAIAssistance = async (
  request: AIAssistanceRequest
): Promise<string> => {
  if (!hasApiKey()) {
    throw new Error('API_KEY_REQUIRED');
  }

  const commonPromptPart =
    'Return for me only the plain text ready to past in the application form, no other text or comments. Maximum 1000 characters.';

  try {
    const prompts = {
      currentFinancialSituation: `I am unemployed with no income. Help me describe my financial hardship. ${commonPromptPart}`,
      employmentCircumstances: `Help me describe my employment circumstances and job situation. ${commonPromptPart}`,
      reasonForApplying: `Help me explain why I am applying for financial assistance. ${commonPromptPart}`,
    };

    const basePrompt = prompts[request.fieldType];
    const prompt = request.currentText
      ? `${basePrompt} Current text: "${request.currentText}". Please improve this description.`
      : basePrompt;

    const response = await apiClient.post('/chat/completions', {
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in getAIAssistance', error);

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.response && error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    }

    throw new Error('Failed to get AI assistance. Please try again.');
  }
};
