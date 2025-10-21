/**
 * Test setup for Jest and React Testing Library
 */

import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_OPENAI_API_KEY = 'test-api-key';
process.env.VITE_OPENAI_MODEL = 'gpt-3.5-turbo';
process.env.VITE_API_BASE_URL = 'http://localhost:8000/api';
process.env.VITE_DEBUG_MODE = 'true';
process.env.VITE_MOCK_API = 'true';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as Storage;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
