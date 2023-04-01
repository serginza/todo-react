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

  changeTask(key: string, value: unknown) {
    this.editTaskProps = {
      ...this.editTaskProps,
      [key]: value,
    };
  }

  private _isEditTaskLoading = false;

  get isEditTaskLoading(): boolean {
    return this._isEditTaskLoading;
  }

  loadEditTask = async (taskId?: string) => {
    this._isEditTaskLoading = true;
    const task = TasksMock.find((task) => task.id === taskId);
    if (task) {
      this._editTaskProps = task;
    }

    await delay(1000);
    console.log(task);
    this._isEditTaskLoading = false;
  };
}

export const EditTaskInstance = new EditTaskStore();
