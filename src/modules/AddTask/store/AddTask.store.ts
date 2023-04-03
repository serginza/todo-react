import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldAddTaskProps } from './AddTask.store.types';
import { AddTaskEntity } from 'domains/index';
// import { delay } from 'helpers/delay';

class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldAddTaskProps>(this, {
      _addTaskProps: observable,
      _isAddTaskLoading: observable,

      isAddTaskLoading: computed,

      loadAddTask: action,
    });
  }

  private _addTaskProps: AddTaskEntity = {
    taskName: '',
    taskDescription: '',
    taskCheckImportant: false,
  };

  get addTaskProps(): AddTaskEntity {
    return this._addTaskProps;
  }

  private _isAddTaskLoading = false;

  get isAddTaskLoading(): boolean {
    return this._isAddTaskLoading;
  }

  loadAddTask = async (addTaskValues?: AddTaskEntity) => {
    try {
      this._isAddTaskLoading = true;

      // await delay(1000);
      if (addTaskValues) {
        console.log(addTaskValues);
      }
    } catch {
      console.log('Error of requiring data!');
    } finally {
      this._isAddTaskLoading = false;
    }
  };
}

export const AddTaskInstance = new AddTaskStore();
