import { TextareaHTMLAttributes } from 'react';

export interface TextareaWithLabelProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  variant?: 'default' | 'error';
  error?: string;
}
