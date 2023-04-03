import { action, makeObservable, observable } from 'mobx';
import { PrivateFieldProps } from './Task.store.types';
import { TaskEntity, TasksStatsEntity, SearchFormEntity } from 'domains/index';
import { TasksMock, TasksStatsMock } from '__mocks__/index';
import { delay } from 'helpers/index';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateFieldProps>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,

      loadTasks: action,
      changeTaskImportant: action,
      changeTaskCompleted: action,
      deleteTask: action,
    });
  }

  private _tasks: TaskEntity[] = [];

  get tasks(): TaskEntity[] {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity {
    return this._tasksStats;
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadTasks = async (searchValues?: SearchFormEntity) => {
    try {
      this._isTasksLoading = true;
      this._tasks = TasksMock;
      this._tasksStats = TasksStatsMock;

      await delay(1000);

      if (searchValues) {
        console.log(searchValues);
      }
    } catch {
      console.log('Error of exporn search info!');
    } finally {
      this._isTasksLoading = false;
    }
  };

  changeTaskImportant = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    console.log(`Task id = ${taskId}, important = ${!currentStatus}`);
    this.loadTasks();
  };

  changeTaskCompleted = (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    console.log(`Task id = ${taskId}, comlpete = ${!currentStatus}`);
    this.loadTasks();
  };

  deleteTask = (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;
    console.log(`Task id = ${taskId} deleted!`);
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
