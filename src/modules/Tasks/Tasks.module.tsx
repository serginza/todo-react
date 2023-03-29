import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TasksStats, TasksList, SearchForm } from './components';
import { TasksStoreInstance } from './store';
import { TasksMock, TasksStatsMock } from '__mocks__/index';

function TasksProto() {
  useEffect(() => {
    TasksStoreInstance.getTasks();
  }, []);

  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList tasks={TasksMock} />
    </>
  );
}

export const Tasks = observer(TasksProto);
