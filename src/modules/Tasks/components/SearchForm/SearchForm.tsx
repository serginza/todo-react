import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { StatusFilter } from '../StatusFilter';
import { DEFAULT_SEARCH_FORM } from './SearchForm.constants';
import { SearchInput } from 'components/index';
import { FiltersType, SearchFormEntity } from 'domains/index';
import { TasksStoreInstance } from 'modules/Tasks/store';
import './SearchForm.css';

function SearchFormProto() {
  const { isTasksLoading, loadTasks } = TasksStoreInstance;

  const { control, handleSubmit, setValue, reset } = useForm<SearchFormEntity>({
    defaultValues: DEFAULT_SEARCH_FORM,
    // resolver: yupResolver(SEARCH_INPUT_VALIDATION_SCHEMA),
  });

  const onSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleSubmit((form) => {
      loadTasks(form);
    })();
  };

  const onTasksTypeChange = (tasksType: FiltersType) => setValue('filterType', tasksType);
  const onSearchInputChange = (searchText: string) => setValue('searchValue', searchText);
  const onSearchInputReset = () => setValue('searchValue', '');

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
