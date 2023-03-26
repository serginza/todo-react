import React from 'react';
import { Link } from 'react-router-dom';
import { EditTask } from 'modules/index';
import { PageContainer } from 'components/index';

export function EditTaskPage() {
  return (
    <PageContainer>
      <h1>TODO LIST | EDIT TASK</h1>
      <EditTask />
      <Link className="btn btn-secondary d-block ml-auto" to={''}>
        Edit task
      </Link>
    </PageContainer>
  );
}
