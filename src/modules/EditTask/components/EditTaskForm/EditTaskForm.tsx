import React, { MouseEvent, useCallback, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { DEFAULT_EDIT_TASK_FORM, EDIT_TASK_INPUT_VALIDATION_SCHEMA } from './EditTaskForm.constants';
import { StyledBox, StyledButton } from './EditTaskForm.styles';
import { EditTaskInstance } from 'modules/EditTask/store';
import { MaterialTextField, MaterialCheckbox, Loader } from 'components/index';
import { ROOT } from 'constants/path';
import { ActionTaskEntity } from 'domains/Task.entity';

function EditTaskFormProto() {
  const redirectRoot = useNavigate();

  const { editTaskForm, isEditTaskLoading, loadEditTask } = EditTaskInstance;

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
    if (editTaskForm) {
      reset(editTaskForm);
    }
  }, [editTaskForm]);

  return (
    <StyledBox component={'form'}>
      <Loader isLoading={isEditTaskLoading}>
        {editTaskForm ? (
          <>
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
                <MaterialCheckbox
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
                <MaterialCheckbox label={'Completed'} onChange={onTaskCheckCompleted} checked={field.value} />
              )}
            />
            <StyledButton type="submit" onClick={onSubmit}>
              Edit task
            </StyledButton>
          </>
        ) : (
          <Typography variant="h5">Not found</Typography>
        )}
      </Loader>
    </StyledBox>
  );
}

export const EditTaskForm = observer(EditTaskFormProto);
