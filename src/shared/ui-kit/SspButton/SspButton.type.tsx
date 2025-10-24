import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface SspButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}
