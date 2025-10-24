import React from 'react';

interface HelperTextProps {
  error?: string;
  description?: string;
  className?: string;
}

export const HelperText: React.FC<HelperTextProps> = ({
  error,
  description,
  className = '',
}) => {
  if (!error && !description) {
    return null;
  }

  return (
    <div className={`mt-1 text-xs ${className}`}>
      {error && (
        <p className="text-red-600" role="alert">
          {error}
        </p>
      )}
      {description && !error && (
        <p className="text-gray-500">{description}</p>
      )}
    </div>
  );
};
