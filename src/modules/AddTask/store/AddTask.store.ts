import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldAddTaskProps } from './AddTask.store.types';
import { ERROR_SENDING_DATA_MSG } from './AddTask.store.constants';
import { ActionTaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/agent';

class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldAddTaskProps>(this, {
      _addTaskProps: observable,
      _isAddTaskLoading: observable,

      isAddTaskLoading: computed,

      loadAddTask: action,
    });
  }

  private _addTaskProps: ActionTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get addTaskProps(): ActionTaskEntity | null {
    return this._addTaskProps;
  }

  private _isAddTaskLoading = false;

  get isAddTaskLoading(): boolean {
    return this._isAddTaskLoading;
  }

  set isAddTaskLoading(value: boolean) {
    this._isAddTaskLoading = value;
  }

  loadAddTask = async (addTaskValues?: ActionTaskEntity) => {
    this.isAddTaskLoading = true;
    try {
      if (addTaskValues) {
        await TaskAgentInstance.createTask(addTaskValues);

        this._addTaskProps = addTaskValues;
      }
    } catch {
      throw new Error(ERROR_SENDING_DATA_MSG);
    } finally {
      this.isAddTaskLoading = false;
    }
  };
}

export const AddTaskInstance = new AddTaskStore();
