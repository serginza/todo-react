import React from 'react';
import { Typography } from '@mui/material';
import { AddTask } from 'modules/index';
import { PageContainer } from 'components/index';

export function AddTaskPage() {
  return (
    <PageContainer>
      <Typography variant="h3" textAlign={'center'}>
        TODO LIST | ADD TASK
      </Typography>
      <AddTask />
    </PageContainer>
  );
}
