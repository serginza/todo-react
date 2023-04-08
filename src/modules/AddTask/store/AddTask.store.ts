import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldAddTaskProps } from './AddTask.store.types';
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
        console.log(addTaskValues);
      }
    } catch {
      console.log('Error of receiving data!');
    } finally {
      this.isAddTaskLoading = false;
    }
  };
}

export const AddTaskInstance = new AddTaskStore();
