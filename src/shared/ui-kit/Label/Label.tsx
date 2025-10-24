import React from 'react';
import { LabelProps } from './Label.type';


export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  children,
  className = '',
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};
