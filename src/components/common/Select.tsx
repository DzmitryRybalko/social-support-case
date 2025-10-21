/**
 * Custom Select component with Material-UI
 */

import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { SelectProps } from '@/types/Components';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  placeholder,
  className,
}) => {
  return (
    <FormControl
      fullWidth
      margin="normal"
      error={!!error}
      required={required}
      disabled={disabled}
      className={className}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
