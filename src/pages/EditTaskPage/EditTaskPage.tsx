import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { EditTask } from 'modules/index';
import { PageContainer } from 'components/index';

export function EditTaskPage() {
  const { taskId } = useParams();
  if (taskId === undefined) {
    return null;
  }

  return (
    <PageContainer>
      <Typography variant="h3" textAlign={'center'}>
        TODO LIST | EDIT TASK {taskId}
      </Typography>
      <EditTask taskId={taskId} />
    </PageContainer>
  );
}
