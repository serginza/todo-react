import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AddTaskInstance } from './store';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';

function AddTaskProto() {
  useEffect(() => {
    AddTaskInstance.loadAddTask();
  }, []);

  return <AddTaskForm />;
}

export const AddTask = observer(AddTaskProto);
