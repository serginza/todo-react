import React, { MouseEvent, useCallback, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_EDIT_TASK_FORM, EDIT_TASK_INPUT_VALIDATION_SCHEMA } from './EditTaskForm.constants';
import { EditTaskInstance } from 'modules/EditTask/store';
import { TextField, Checkbox, Loader } from 'components/index';
import { ROOT } from 'constants/path';
import { ActionTaskEntity } from 'domains/Task.entity';
import './editTaskForm.css';

function EditTaskFormProto() {
  const redirectRoot = useNavigate();

  const { editTaskProps, isEditTaskLoading, loadEditTask } = EditTaskInstance;

  const { control, handleSubmit, setValue, reset } = useForm<ActionTaskEntity>({
    defaultValues: DEFAULT_EDIT_TASK_FORM,
    resolver: yupResolver(EDIT_TASK_INPUT_VALIDATION_SCHEMA),
  });

  const watchIsCompleted = useWatch({ name: 'isCompleted', control });

  const onSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      handleSubmit((editTaskValues) => {
        loadEditTask(editTaskValues).then(() => {
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

  const onTaskCheckCompleted = useCallback(
    (taskCheckCompleted: boolean) => {
      if (taskCheckCompleted) {
        setValue('isImportant', false);
      }
      setValue('isCompleted', taskCheckCompleted);
    },
    [setValue]
  );

  useEffect((): void => {
    if (editTaskProps) {
      reset(editTaskProps);
    }
  }, [editTaskProps]);

  return (
    <form className="edit-task-form d-flex flex-column justify-content-center">
      <Loader isLoading={isEditTaskLoading} variant="circle">
        {editTaskProps ? (
          <>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label={'Task name'}
                  onChange={onInputTaskName}
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
                  inputType={'text'}
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
                <Checkbox
                  label={'Important'}
                  onChange={onTaskCheckImportant}
                  checked={field.value}
                  disabled={watchIsCompleted}
                />
              )}
            />
            <Controller
              control={control}
              name="isCompleted"
              render={({ field }) => (
                <Checkbox label={'Completed'} onChange={onTaskCheckCompleted} checked={field.value} />
              )}
            />
            <button type="submit" className="btn btn-secondary d-block m1-auto w-100" onClick={onSubmit}>
              Edit task
            </button>
          </>
        ) : (
          <p>Not found</p>
        )}
      </Loader>
    </form>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
