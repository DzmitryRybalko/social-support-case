import { ReactNode } from 'react';

export type ModalMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  maxWidth?: ModalMaxWidth;
  showCloseButton?: boolean;
  headerText?: string;
  showHeader?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}
