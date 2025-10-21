/**
 * Custom Input component with Material-UI
 */

import { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { InputProps } from '@/types/Components';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 1,
  helperText,
  className,
  ...props
}, ref) => {
  return (
    <TextField
      ref={ref}
      label={label}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      error={!!error}
      helperText={error || helperText}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      className={className}
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
});
