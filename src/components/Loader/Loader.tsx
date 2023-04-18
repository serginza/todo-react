import { CircularProgress } from '@mui/material';
import React from 'react';
import { LoaderProps } from './Loader.types';

export function Loader({ isLoading, children, variant }: LoaderProps) {
  const loaderSize = variant === 'small' ? '15px' : '40px';

  return isLoading ? <CircularProgress size={loaderSize} /> : <>{children}</>;
}
