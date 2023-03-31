import { action, makeObservable, observable } from 'mobx';
import { PrivateFieldEditTaskProps } from './EditTask.store.types';
import { EditTaskEntity } from 'domains/index';
import { TasksMock } from '__mocks__/Tasks.mock';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldEditTaskProps>(this, {
      _editTaskProps: observable,

      loadEditTask: action,
    });
  }

  private _editTaskProps: EditTaskEntity = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  get editTasksProps(): EditTaskEntity {
    return this._editTaskProps;
  }

  loadEditTask = async (taskId?: string) => {
    const task = TasksMock.find((task) => task.id === taskId);
    if (task) {
      this._editTaskProps = task;
    }
  };
}

export const EditTaskInstance = new EditTaskStore();
