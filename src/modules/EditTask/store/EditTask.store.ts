import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldEditTaskProps } from './EditTask.store.types';
import { EditTaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/Tasks.mock';
import { delay } from 'helpers/delay';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldEditTaskProps>(this, {
      _editTaskProps: observable,
      _isEditTaskLoading: observable,

      editTaskProps: computed,
      isEditTaskLoading: computed,

      loadEditTask: action,
      getEditProps: action,
    });
  }

  private _editTaskProps: EditTaskEntity = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  get editTaskProps(): EditTaskEntity {
    return this._editTaskProps;
  }

  set editTaskProps(task: EditTaskEntity) {
    this._editTaskProps = task;
  }

  private _isEditTaskLoading = false;

  get isEditTaskLoading(): boolean {
    return this._isEditTaskLoading;
  }

  loadEditTask = async (editTaskValues?: EditTaskEntity) => {
    try {
      this._isEditTaskLoading = true;

      await delay(1000);
      if (editTaskValues) {
        console.log(editTaskValues);
      }
    } catch {
      console.log('Error of changing task!');
    } finally {
      this._isEditTaskLoading = false;
    }
  };

  getEditProps(taskId?: string) {
    const task = TasksMock.find((task) => task.id === taskId);
    if (task) {
      this._editTaskProps = task;
    }
    this.loadEditTask();
  }
}

export const EditTaskInstance = new EditTaskStore();
