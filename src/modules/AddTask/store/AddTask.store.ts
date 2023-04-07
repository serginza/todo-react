import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldAddTaskProps } from './AddTask.store.types';
import { AddTaskEntity } from 'domains/index';
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

  private _addTaskProps: AddTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get addTaskProps(): AddTaskEntity | null {
    return this._addTaskProps;
  }

  private _isAddTaskLoading = false;

  get isAddTaskLoading(): boolean {
    return this._isAddTaskLoading;
  }

  loadAddTask = async (addTaskValues?: AddTaskEntity) => {
    this._isAddTaskLoading = true;
    try {
      if (addTaskValues) {
        await TaskAgentInstance.createTask(addTaskValues);

        this._addTaskProps = addTaskValues;
        console.log(addTaskValues);
      }
    } catch {
      console.log('Error of receiving data!');
    } finally {
      this._isAddTaskLoading = false;
    }
  };
}

export const AddTaskInstance = new AddTaskStore();
