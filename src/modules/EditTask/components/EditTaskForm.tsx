import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { EditTaskInstance } from '../store';
import { TextField, Checkbox } from 'components/index';

function EditTaskFormProto() {
  const { editTasksProps } = EditTaskInstance;
  console.log(EditTaskInstance.editTasksProps.name);

  const [taskName, setTaskName] = useState(editTasksProps.name);
  const [taskDescription, setTaskDescription] = useState(editTasksProps.info);
  const [taskCheckImportant, setTaskCheckImportant] = useState(editTasksProps.isImportant);
  const [taskCheckCompleted, setTaskCheckCompleted] = useState(editTasksProps.isDone);

  const onInputTaskName = (value: string) => {
    setTaskName(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescription(value);
  };

  const onInputTaskCheckImportant = (value: boolean) => {
    setTaskCheckImportant(value);
  };

  const onInputTaskCheckCompleted = (value: boolean) => {
    setTaskCheckCompleted(value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log({ taskName, taskDescription, taskCheckImportant, taskCheckCompleted });
  };

  return (
    <form>
      <TextField label={'Task name'} onChange={onInputTaskName} inputType="text" value={taskName} />
      <TextField
        label={'What to do(description)'}
        onChange={onInputTaskDescription}
        inputType={'text'}
        value={taskDescription}
      />
      <Checkbox label={'Important'} onChange={onInputTaskCheckImportant} checked={taskCheckImportant} />
      <Checkbox label={'Completed'} onChange={onInputTaskCheckCompleted} checked={taskCheckCompleted} />
      <button type="submit" className="btn btn-secondary d-block m1-auto w-100" onClick={onSubmit}>
        Edit task
      </button>
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
