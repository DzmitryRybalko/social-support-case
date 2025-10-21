/**
 * Loading component with Material-UI
 */

import React from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { LoadingProps } from '@/types/Components';

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  message = 'Loading...',
  overlay = false,
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  const content = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (overlay) {
    return (
      <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {content}
      </Backdrop>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      {content}
    </Box>
  );
};
