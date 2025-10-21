/**
 * Custom Button component with Material-UI
 */

import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { ButtonProps } from '@/types/Components';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className,
  startIcon,
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      className={className}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
    >
      {children}
    </MuiButton>
  );
};
