import React from 'react';
import { AddTask } from 'modules/index';
import { PageContainer } from 'components/index';

export function AddTaskPage() {
  return (
    <PageContainer>
      <h1 className="text-center">TODO LIST | ADD TASK</h1>
      <AddTask />
    </PageContainer>
  );
}
