import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldEditTaskProps } from './EditTask.store.types';
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
      const taskEditResult = await TaskAgentInstance.getTask(editTaskId);

      if (taskEditResult) {
        this.editTaskProps = mapToInternalTask(taskEditResult);
      } else {
        return null;
      }
    } catch {
      console.log('Error of receiving data for edit task!');
    } finally {
      this.isEditTaskLoading = false;
    }
  };

  loadEditTask = async (editTask: ActionTaskEntity) => {
    this.isEditTaskLoading = true;
    try {
      if (editTask) {
        this.editTaskProps = editTask;
      }
      await TaskAgentInstance.updateTask(this.taskId, editTask);

      this.editTaskProps = editTask;
      console.log(editTask);
    } catch {
      console.log('Error of changing task!');
    } finally {
      this.isEditTaskLoading = false;
    }
  };
}

export const EditTaskInstance = new EditTaskStore();
