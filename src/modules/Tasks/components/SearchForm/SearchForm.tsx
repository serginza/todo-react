import React, { MouseEvent, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_SEARCH_FORM } from './SearchForm.constants';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store';
import './SearchForm.css';

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
    <form className="search-form d-flex justify-content-between">
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
      <button type="submit" className="btn btn-primary" onClick={onSubmit} disabled={isTasksLoading}>
        Find
      </button>
    </form>
  );
}

export const SearchForm = observer(SearchFormProto);
