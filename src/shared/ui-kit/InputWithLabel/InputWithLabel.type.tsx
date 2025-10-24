import { InputHTMLAttributes } from 'react';

export interface InputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: 'default' | 'error';
  error?: string;
}
