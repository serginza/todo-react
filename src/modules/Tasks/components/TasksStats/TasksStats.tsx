import React from 'react';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';

function TasksStatsProto() {
  const { tasksStats, isTasksLoading } = TasksStoreInstance;

  return (
    <div className="d-flex w-100 justify-content-between">
      <p>
        Total:
        <Loader isLoading={isTasksLoading} variant="dot">
          <span className="badge bg-secondary">{` ${tasksStats.total}`}</span>
        </Loader>
      </p>
      <p>
        Important:
        <Loader isLoading={isTasksLoading} variant="dot">
          <span className="badge bg-secondary">{` ${tasksStats.important}`}</span>
        </Loader>
      </p>
      <p>
        Done:
        <Loader isLoading={isTasksLoading} variant="dot">
          <span className="badge bg-secondary">{` ${tasksStats.done}`}</span>
        </Loader>
      </p>
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
