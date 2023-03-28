import React from 'react';
import { useParams } from 'react-router-dom';
import { EditTask } from 'modules/index';
import { PageContainer } from 'components/index';

export function EditTaskPage() {
  const { taskId } = useParams();

  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | EDIT TASK {taskId}</h1>
      <EditTask taskId={taskId} />
    </PageContainer>
  );
}
