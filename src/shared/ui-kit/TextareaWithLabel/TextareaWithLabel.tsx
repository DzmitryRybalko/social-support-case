import React from 'react';
import clsx from 'clsx';
import { TextareaWithLabelProps } from './TextareaWithLabel.type.tsx';

export const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  TextareaWithLabelProps
>(
  (
    {
      label,
      description,
      variant = 'default',
      error,
      className = '',
      id,
      required = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'ssp-textarea block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm resize-vertical';

    const variants = {
      default:
        'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400',
      error:
        'border-red-300 bg-white text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500',
    };

    const currentVariant = error ? 'error' : variant;
    const variantStyles = variants[currentVariant];

    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(baseStyles, variantStyles, className)}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

TextareaWithLabel.displayName = 'TextareaWithLabel';
