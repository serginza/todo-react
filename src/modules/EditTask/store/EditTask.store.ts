import { action, computed, makeObservable, observable } from 'mobx';
import { ERROR_MSG } from 'constants/index';
import { ActionTaskEntity } from 'domains/index';
import { mapToInternalTask } from 'helpers/mappers';
import { TaskAgentInstance } from 'http/agent';

type PrivateFieldEditTaskForm = '_editTaskForm' | '_isEditTaskLoading' | '_taskId';

class EditTaskStore {
  constructor() {
    makeObservable<this, PrivateFieldEditTaskForm>(this, {
      _editTaskForm: observable,
      _isEditTaskLoading: observable,
      _taskId: observable,

      editTaskForm: computed,
      isEditTaskLoading: computed,
      taskId: computed,

      loadEditTask: action,
      getEditForm: action,
    });
  }

  private _editTaskForm: ActionTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isCompleted: false,
  };

  get editTaskForm(): ActionTaskEntity | null {
    return this._editTaskForm;
  }

  set editTaskForm(value: ActionTaskEntity | null) {
    this._editTaskForm = value;
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

  getEditForm = async (editTaskId: string | null) => {
    this.isEditTaskLoading = true;
    try {
      if (!editTaskId) {
        throw new Error(ERROR_MSG.RECEIVING_EDIT_TASK_DATA);
      }
      const taskEditResult = await TaskAgentInstance.getTask(editTaskId);

      this.editTaskForm = mapToInternalTask(taskEditResult);
    } catch {
      this.editTaskForm = null;
      throw new Error(ERROR_MSG.RECEIVING_EDIT_TASK_DATA);
    } finally {
      this.isEditTaskLoading = false;
    }
  };

  loadEditTask = async (editTask: ActionTaskEntity) => {
    this.isEditTaskLoading = true;
    try {
      if (!editTask) {
        throw new Error(ERROR_MSG.CHANGING_DATA);
      }
      await TaskAgentInstance.updateTask(this.taskId, editTask);

      this.editTaskForm = editTask;
    } catch {
      this.editTaskForm = null;
      throw new Error(ERROR_MSG.CHANGING_DATA);
    } finally {
      this.isEditTaskLoading = false;
    }
  };
}

export const EditTaskInstance = new EditTaskStore();
