import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldEditTaskProps } from './EditTask.store.types';
import { ERROR_CHANGING_DATA_MSG, ERROR_RECEIVING_EDIT_TASK_DATA_MSG } from './EditTask.store.constants';
import { ActionTaskEntity } from 'domains/index';
import { mapToInternalTask } from 'helpers/mappers';
import { TaskAgentInstance } from 'http/agent';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldEditTaskProps>(this, {
      _editTaskProps: observable,
      _isEditTaskLoading: observable,
      _taskId: observable,

      editTaskProps: computed,
      isEditTaskLoading: computed,
      taskId: computed,

      loadEditTask: action,
      getEditProps: action,
    });
  }

  private _editTaskProps: ActionTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get editTaskProps(): ActionTaskEntity | null {
    return this._editTaskProps;
  }

  set editTaskProps(value: ActionTaskEntity | null) {
    this._editTaskProps = value;
  }

  private _isEditTaskLoading = false;

  get isEditTaskLoading(): boolean {
    return this._isEditTaskLoading;
  }

  set isEditTaskLoading(value: boolean) {
    this._isEditTaskLoading = value;
  }

  private _taskId: string | null = '0';

  get taskId(): string | null {
    return this._taskId;
  }

  set taskId(id: string | null) {
    this._taskId = id;
  }

  getEditProps = async (editTaskId: string | null) => {
    this.isEditTaskLoading = true;
    try {
      if (!editTaskId) {
        throw new Error(ERROR_RECEIVING_EDIT_TASK_DATA_MSG);
      }
      const taskEditResult = await TaskAgentInstance.getTask(editTaskId);

      this.editTaskProps = mapToInternalTask(taskEditResult);
    } catch {
      this.editTaskProps = null;
      throw new Error(ERROR_RECEIVING_EDIT_TASK_DATA_MSG);
    } finally {
      this.isEditTaskLoading = false;
    }
  };

  loadEditTask = async (editTask: ActionTaskEntity) => {
    this.isEditTaskLoading = true;
    try {
      if (!editTask) {
        throw new Error(ERROR_CHANGING_DATA_MSG);
      }
      await TaskAgentInstance.updateTask(this.taskId, editTask);

      this.editTaskProps = editTask;
    } catch {
      throw new Error(ERROR_CHANGING_DATA_MSG);
    } finally {
      this.isEditTaskLoading = false;
    }
  };
}

export const EditTaskInstance = new EditTaskStore();
