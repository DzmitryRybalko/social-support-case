/**
 * Custom Card component with Material-UI
 */

import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions } from '@mui/material';
import { CardProps } from '@/types/Components';

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  className,
  elevation = 1,
}) => {
  return (
    <MuiCard className={className} elevation={elevation}>
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {actions && (
        <CardActions>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
};
