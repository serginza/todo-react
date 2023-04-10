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

  set tasks(value: TaskEntity[] | null) {
    this._tasks = value;
  }

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  set tasksStats(value: TasksStatsEntity | null) {
    this._tasksStats = value;
  }

  private _isTasksLoading = false;

  get isTasksLoading(): boolean {
    return this._isTasksLoading;
  }

  set isTasksLoading(value: boolean) {
    this._isTasksLoading = value;
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
    this.isTasksLoading = true;

    try {
      if (searchValues) {
        this._searchForm = searchValues;
      }

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch {
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskImportant = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch {
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  changeTaskCompleted = async (taskId: TaskEntity['id'], currentStatus: boolean) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? undefined : false,
      });

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch {
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };

  deleteTask = async (taskId: TaskEntity['id']) => {
    this.isTasksLoading = true;
    try {
      await TaskAgentInstance.deleteTask(taskId);

      const { tasks, tasksStats } = await this.getTasks(this._searchForm);

      this.tasks = tasks;
      this.tasksStats = tasksStats;
    } catch {
      this.tasks = null;
      this.tasksStats = null;
    } finally {
      this.isTasksLoading = false;
    }
  };
}

export const TasksStoreInstance = new TasksStore();
