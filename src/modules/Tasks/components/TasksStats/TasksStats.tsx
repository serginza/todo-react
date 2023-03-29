import React from 'react';
import { observer } from 'mobx-react';
// import { TasksStatsProps } from './TasksStats.types';
import { TasksStoreInstance } from 'modules/Tasks/store';

// export function TasksStats({ total, important, done }: TasksStatsProps) {
function TasksStatsProto() {
  const { tasksStats } = TasksStoreInstance;

  return (
    <div className="d-flex w-100 justify-content-between">
      <p>
        Total: <span className="badge bg-secondary">{tasksStats.total}</span>
      </p>
      <p>
        Important: <span className="badge bg-secondary">{tasksStats.important}</span>
      </p>
      <p>
        Done: <span className="badge bg-secondary">{tasksStats.done}</span>
      </p>
    </div>
  );
}

export const TasksStats = observer(TasksStatsProto);
