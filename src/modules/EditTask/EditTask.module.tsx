import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EditTasksId } from './EditTask.types';
import { EditTaskInstance } from './store';
import { EditTaskForm } from './components/EditTaskForm';

function EditTaskProto({ taskId }: EditTasksId) {
  useEffect(() => {
    EditTaskInstance.getEditProps(taskId);
  }, []);

  return <EditTaskForm />;
}

export const EditTask = observer(EditTaskProto);
