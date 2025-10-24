import React from 'react';
import clsx from 'clsx';
import { RadioGroupProps } from './RadioGroup.type';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  className = '',
  disabled = false,
  layout = 'column',
  ...rest
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  return (
    <div className={clsx('h-full space-y-1', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div
        className={clsx(
          layout === 'row'
            ? 'mt-4 flex flex-1 flex-wrap items-center gap-4'
            : 'space-y-2'
        )}
      >
        {options.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              className={clsx(
                'h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              disabled={disabled}
              {...rest}
            />
            <span
              className={clsx(
                'ml-2 text-sm text-gray-700',
                disabled && 'opacity-50'
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
