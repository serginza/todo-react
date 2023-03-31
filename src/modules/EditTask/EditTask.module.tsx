import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { EditTasksProps } from './EditTask.types';
import { EditTaskInstance } from './store';
import { EditTaskForm } from './components';

function EditTaskProto({ taskId }: EditTasksProps) {
  useEffect(() => {
    EditTaskInstance.loadEditTask(taskId);
  }, []);

  return <EditTaskForm />;
}

export const EditTask = observer(EditTaskProto);
