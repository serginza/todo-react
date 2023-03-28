import React, { useState, MouseEvent, useEffect } from 'react';
import { EditTasksProps } from './EditTask.types';
import { TextField, Checkbox } from 'components/index';
import { TasksMock } from '__mocks__/index';

export function EditTask({ taskId }: EditTasksProps) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCheckImportant, setTaskCheckImportant] = useState(false);
  const [taskCheckCompleted, setTaskCheckCompleted] = useState(false);

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

  useEffect(() => {
    const task = TasksMock.find((task) => task.id === taskId);
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.info);
      setTaskCheckImportant(task.isImportant);
      setTaskCheckCompleted(task.isDone);
    }
  }, []);

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
