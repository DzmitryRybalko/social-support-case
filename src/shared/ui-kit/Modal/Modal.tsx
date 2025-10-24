import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalProps } from './Modal.type';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  maxWidth = '2xl',
  showCloseButton = true,
  headerText,
  showHeader = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headerText ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={`w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {showHeader && headerText && (
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h3
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {headerText}
            </h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                aria-label={t('common.aria.close', 'Close')}
              >
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
        {!showHeader && showCloseButton && (
          <div className="flex justify-end p-4 pb-0">
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              aria-label={t('common.aria.close', 'Close')}
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
