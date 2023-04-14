import { action, computed, makeObservable, observable } from 'mobx';
import { ERROR_MSG } from 'constants/index';
import { ActionTaskEntity } from 'domains/index';
import { TaskAgentInstance } from 'http/agent';

type PrivateFieldAddTaskForm = '_isAddTaskLoading' | '_addTaskForm';

class AddTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldAddTaskForm>(this, {
      _addTaskForm: observable,
      _isAddTaskLoading: observable,

      isAddTaskLoading: computed,

      loadAddTask: action,
    });
  }

  private _addTaskForm: ActionTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get addTaskForm(): ActionTaskEntity | null {
    return this._addTaskForm;
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

        this._addTaskForm = addTaskValues;
      }
    } catch {
      this._addTaskForm = null;
      throw new Error(ERROR_MSG.SENDING_DATA);
    } finally {
      this.isAddTaskLoading = false;
    }
  };
}

export const AddTaskInstance = new AddTaskStore();
