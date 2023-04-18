import React from 'react';
import { Typography } from '@mui/material';
import { Tasks } from 'modules/index';
import { PageContainer } from 'components/index';

export function TasksPage() {
  return (
    <PageContainer>
      <Typography variant="h3">TODO LIST</Typography>
      <Tasks />
    </PageContainer>
  );
}
