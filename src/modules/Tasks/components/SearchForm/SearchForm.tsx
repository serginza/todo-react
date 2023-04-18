import React, { MouseEvent, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_SEARCH_FORM } from './SearchForm.constants';
import { StyledButton } from './SearchForm.styles';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store';

function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const { control, handleSubmit, setValue } = useForm<SearchFormEntity>({
    defaultValues: DEFAULT_SEARCH_FORM,
  });

  const onSubmit = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      handleSubmit((form) => {
        loadTasks(form);
      })();
    },
    [handleSubmit]
  );

  const onTasksTypeChange = useCallback(
    (tasksType: FiltersType) => {
      setValue('filterType', tasksType);
    },
    [setValue]
  );

  const onSearchInputChange = useCallback(
    (searchText: string) => {
      setValue('searchValue', searchText);
    },
    [setValue]
  );

  const onSearchInputReset = useCallback(() => {
    setValue('searchValue', '');
  }, [setValue]);

  return (
    <Box component="form" display={'flex'} justifyContent={'space-between'} margin={'1rem 0'} gap={'20px'}>
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            disabled={isTasksLoading}
            value={field.value}
            onChange={onSearchInputChange}
            onReset={onSearchInputReset}
          />
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter tasksType={field.value} onChange={onTasksTypeChange} disabled={isTasksLoading} />
        )}
      />
      <StyledButton variant="contained" onClick={onSubmit} disabled={isTasksLoading}>
        Find
      </StyledButton>
    </Box>
  );
}

export const SearchForm = observer(SearchFormProto);
