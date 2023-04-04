import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskInstance } from '../../store';
import { DEFAULT_ADD_TASK_FORM, ADD_TASK_INPUT_VALIDATION_SCHEMA } from './AddTaskForm.constants';
import { TextField, Checkbox } from 'components/index';
import { ROOT } from 'constants/index';
import { AddTaskEntity } from 'domains/Task.entity';
import './AddPageForm.css';

function AddTaskFormProto() {
  const redirectRoot = useNavigate();

  const { loadAddTask } = AddTaskInstance;

  const { control, handleSubmit, setValue, reset } = useForm<AddTaskEntity>({
    defaultValues: DEFAULT_ADD_TASK_FORM,
    resolver: yupResolver(ADD_TASK_INPUT_VALIDATION_SCHEMA),
  });

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    try {
      handleSubmit((addTaskPaarams) => {
        loadAddTask(addTaskPaarams).then(() => {
          redirectRoot(ROOT);
        });
        reset();
      })();
    } catch {
      console.log('Error of requiring data!');
    }
  };

  const onInputTaskName = (taskName: string) => setValue('name', taskName);
  const onInputTaskDescription = (taskInfo: string) => setValue('info', taskInfo);
  const onInputTaskCheckImportant = (taskCheckImportant: boolean) => setValue('isImportant', taskCheckImportant);

  return (
    <form>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={'Task name'}
            onChange={onInputTaskName}
            placeholder={'test'}
            inputType="text"
            value={field.value}
            containerClassName={`${error?.message ? 'on-add-input-invalid' : ''}`}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="info"
        render={({ field, fieldState: { error } }) => (
          <TextField
            label={'What to do(description)'}
            onChange={onInputTaskDescription}
            placeholder={'test description'}
            inputType="text"
            value={field.value}
            containerClassName={`${error?.message ? 'on-add-input-invalid' : ''}`}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="isImportant"
        render={({ field }) => (
          <Checkbox label={'Important'} onChange={onInputTaskCheckImportant} checked={field.value} />
        )}
      />
      <button type="submit" className="btn btn-secondary d-block m1-auto w-100" onClick={onSubmit}>
        Add task
      </button>
    </form>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
