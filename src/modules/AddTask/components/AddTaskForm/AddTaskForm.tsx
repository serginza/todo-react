import React, { MouseEvent, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTaskInstance } from '../../store';
import { DEFAULT_ADD_TASK_FORM, ADD_TASK_INPUT_VALIDATION_SCHEMA } from './AddTaskForm.constants';
import { StyledBox } from './AddTaskForm.styles';
import { MaterialTextField, MaterialCheckbox, Loader } from 'components/index';
import { ROOT } from 'constants/index';
import { ActionTaskEntity } from 'domains/Task.entity';
import { ActionButton } from 'components/ActionButton';

function AddTaskFormProto() {
  const redirectRoot = useNavigate();

  const { loadAddTask, isAddTaskLoading } = AddTaskInstance;

  const { control, handleSubmit, setValue, reset } = useForm<ActionTaskEntity>({
    defaultValues: DEFAULT_ADD_TASK_FORM,
    resolver: yupResolver(ADD_TASK_INPUT_VALIDATION_SCHEMA),
  });

  const onSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      handleSubmit((addTaskPaarams) => {
        loadAddTask(addTaskPaarams).then(() => {
          redirectRoot(ROOT);
        });
        reset();
      })();
    },
    [handleSubmit]
  );

  const onInputTaskName = useCallback(
    (taskName: string) => {
      setValue('name', taskName);
    },
    [setValue]
  );

  const onInputTaskDescription = useCallback(
    (taskInfo: string) => {
      setValue('info', taskInfo);
    },
    [setValue]
  );

  const onTaskCheckImportant = useCallback(
    (taskCheckImportant: boolean) => {
      setValue('isImportant', taskCheckImportant);
    },
    [setValue]
  );

  return (
    <StyledBox component="form">
      <Loader isLoading={isAddTaskLoading}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <MaterialTextField
              label={'Task name'}
              onChange={onInputTaskName}
              placeholder={'Buy pizza'}
              value={field.value}
              errorText={error?.message}
              error
            />
          )}
        />
        <Controller
          control={control}
          name="info"
          render={({ field, fieldState: { error } }) => (
            <MaterialTextField
              label={'What to do(description)'}
              onChange={onInputTaskDescription}
              placeholder={'Destroy pizza with friends'}
              value={field.value}
              errorText={error?.message}
              error
            />
          )}
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field }) => (
            <MaterialCheckbox label={'Important'} onChange={onTaskCheckImportant} checked={field.value} />
          )}
        />
        <ActionButton label="Add Task" type="submit" onClick={onSubmit}></ActionButton>
      </Loader>
    </StyledBox>
  );
}

export const AddTaskForm = observer(AddTaskFormProto);
