import { Box } from '@mui/material';
import React from 'react';
import { PageContainerProps } from './PageContainer.types';

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box maxWidth={'700px'} margin={'2rem auto 0 auto'}>
      {children}
    </Box>
  );
}
