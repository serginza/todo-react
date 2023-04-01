import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { EditTaskInstance } from '../store';
import { TextField, Checkbox, Loader } from 'components/index';

function EditTaskFormProto() {
  const { editTaskProps, isEditTaskLoading } = EditTaskInstance;

  const onInputTaskName = (value: string) => {
    EditTaskInstance.changeTask('name', value);
  };

  const onInputTaskDescription = (value: string) => {
    EditTaskInstance.changeTask('info', value);
  };

  const onInputTaskCheckImportant = (value: boolean) => {
    EditTaskInstance.changeTask('isImportant', value);
  };

  const onInputTaskCheckCompleted = (value: boolean) => {
    EditTaskInstance.changeTask('isDone', value);
  };

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log(editTaskProps.name, editTaskProps.info, editTaskProps.isImportant, editTaskProps.isDone);
  };

  return (
    <form>
      <Loader isLoading={isEditTaskLoading} variant="circle">
        <TextField label={'Task name'} onChange={onInputTaskName} inputType="text" value={editTaskProps.name} />
        <TextField
          label={'What to do(description)'}
          onChange={onInputTaskDescription}
          inputType={'text'}
          value={editTaskProps.info}
        />
        <Checkbox label={'Important'} onChange={onInputTaskCheckImportant} checked={editTaskProps.isImportant} />
        <Checkbox label={'Completed'} onChange={onInputTaskCheckCompleted} checked={editTaskProps.isDone} />
        <button type="submit" className="btn btn-secondary d-block m1-auto w-100" onClick={onSubmit}>
          Edit task
        </button>
      </Loader>
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
