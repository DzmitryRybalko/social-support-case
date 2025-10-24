import { InputHTMLAttributes } from 'react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  label: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  layout?: 'row' | 'column';
}
