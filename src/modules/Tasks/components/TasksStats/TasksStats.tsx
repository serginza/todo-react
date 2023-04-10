import React from 'react';
import { observer } from 'mobx-react';
import { TasksStoreInstance } from 'modules/Tasks/store';
import { Loader } from 'components/Loader';

function TasksStatsProto() {
  const { tasksStats, isTasksLoading } = TasksStoreInstance;

  return (
    <div className="mb-2 d-flex w-100 justify-content-between">
      {tasksStats ? (
        <>
          <div>
            Total:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{` ${tasksStats.total}`}</span>
            </Loader>
          </div>
          <div>
            Important:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{` ${tasksStats.important}`}</span>
            </Loader>
          </div>
          <div>
            Done:
            <Loader isLoading={isTasksLoading} variant="dot">
              <span className="badge bg-secondary">{` ${tasksStats.done}`}</span>
            </Loader>
          </div>
        </>
      ) : (
        <p className="d-flex justify-content-center w-100">Stats is not available</p>
      )}
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
