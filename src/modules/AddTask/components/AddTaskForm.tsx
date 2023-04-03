import React, { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { AddTaskInstance } from '../store';
import { TextField, Checkbox } from 'components/index';
import { ROOT } from 'constants/index';

function AddTaskFormProto() {
  const redirectRoot = useNavigate();

  const { loadAddTask } = AddTaskInstance;

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCheckImportant, setTaskCheckImportant] = useState(false);

  const onInputTaskName = (value: string) => {
    setTaskName(value);
  };

  const onInputTaskDescription = (value: string) => {
    setTaskDescription(value);
  };

  const onInputTaskCheckImportant = (value: boolean) => {
    setTaskCheckImportant(value);
  };

  // const values = { taskName, taskDescription, taskCheckImportant };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    try {
      loadAddTask({ taskName, taskDescription, taskCheckImportant }).then(() => {
        redirectRoot(ROOT);
      });
    } catch {
      console.log('Error of requiring data!');
    }
    // console.log({ taskName, taskDescription, taskCheckImportant });
  };

  return (
    <form>
      <TextField
        label={'Task name'}
        onChange={onInputTaskName}
        placeholder={'test'}
        inputType="text"
        value={taskName}
      />
      <TextField
        label={'What to do(description)'}
        onChange={onInputTaskDescription}
        placeholder={'test description'}
        inputType={'text'}
        value={taskDescription}
      />
      <Checkbox label={'Important'} onChange={onInputTaskCheckImportant} checked={taskCheckImportant} />
      <button type="submit" className="btn btn-secondary d-block m1-auto w-100" onClick={onSubmit}>
        Add task
      </button>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
