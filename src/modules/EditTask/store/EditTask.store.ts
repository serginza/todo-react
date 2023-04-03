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

      changeTask: action,
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

  changeTask(key: string, value: unknown) {
    this.editTaskProps = {
      ...this.editTaskProps,
      [key]: value,
    };
  }

  loadEditTask = async () => {
    try {
      this._isEditTaskLoading = true;

      await delay(1000);
      console.log(`
      TaskName: ${this.editTaskProps.name}
      TaskDescription: ${this.editTaskProps.info},
      TaskCheckImportant: ${this.editTaskProps.isImportant},
      TaskCheckDone ${this.editTaskProps.isDone}
    `);
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
    // console.log(task);
  }
}

export const EditTaskInstance = new EditTaskStore();
