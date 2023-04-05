import { action, makeObservable, observable, computed } from 'mobx';
import { PrivateFieldProps } from './Task.store.types';
import { mapToExternalParams, mapToInternalTasks, getInternalInfo } from 'helpers/index';
import { TaskEntity, TasksStatsEntity, SearchFormEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/index';

class TasksStore {
  constructor() {
    makeObservable<this, PrivateFieldProps>(this, {
      _tasks: observable,
      _tasksStats: observable,
      _isTasksLoading: observable,
      _searchForm: observable,

      tasks: computed,
      tasksStats: computed,
      isTasksLoading: computed,

      loadTasks: action,
      changeTaskImportant: action,
      changeTaskCompleted: action,
      deleteTask: action,
    });
  }

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  private _searchForm?: SearchFormEntity = {
    searchValue: '',
    filterType: 'All',
  };

  getTasks = async (searchParams?: SearchFormEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const searchResult = await TaskAgentInstance.getAllTasks(externalSearchParams);

    return {
      tasks: mapToInternalTasks(searchResult),
      tasksStats: getInternalInfo(searchResult),
    };
  };

  loadTasks = async (searchValues?: SearchFormEntity) => {
    this._isTasksLoading = true;

    try {
      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      if (searchValues) {
        this._searchForm = searchValues;
        console.log(searchValues);
      }

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
      console.log('Error of exporn search info!');
    } finally {
      this._isTasksLoading = false;
    }
  };

  changeTaskImportant = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
    console.log(`Task id = ${taskId}, important = ${!currentStatus}`);
    this.loadTasks();
  };

  changeTaskCompleted = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this._isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? undefined : false,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
    console.log(`Task id = ${taskId}, comlpete = ${!currentStatus}`);
    this.loadTasks();
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this._isTasksLoading = true;
    try {
      await TaskAgentInstance.deleteTask(taskId);

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this._tasks = tasks;
      this._tasksStats = tasksStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTasksLoading = false;
    }
    console.log(`Task id = ${taskId} deleted!`);
    this.loadTasks();
  };
}

export const TasksStoreInstance = new TasksStore();
