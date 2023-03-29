import { action, makeObservable, observable } from 'mobx';
import { PrivateFieldProps } from './Task.store.types';
import { TaskEntity, TasksStatsEntity } from 'domains/index';
import { TasksMock } from '__mocks__/index';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateFieldProps>(this, {
      _tasksStats: observable,
      _tasks: observable,

      // changeTaskImportant: action,
      // changeTaskCompleted: action,
      // deleteTask: action,
    });
  }

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }
}

export const StoreInstance = new TasksStore();
