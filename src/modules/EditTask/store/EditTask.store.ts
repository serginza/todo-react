import { action, computed, makeObservable, observable } from 'mobx';
import { PrivateFieldEditTaskProps } from './EditTask.store.types';
import { EditTaskEntity } from 'domains/index';
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
      // getEditTasks: action,
    });
  }

  private _editTaskProps: EditTaskEntity | null = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  get editTaskProps(): EditTaskEntity | null {
    return this._editTaskProps;
  }

  set editTaskProps(value: EditTaskEntity | null) {
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
    this._isEditTaskLoading = true;
    try {
      const taskEditResult = await TaskAgentInstance.getTask(editTaskId);

      if (taskEditResult) {
        this._editTaskProps = mapToInternalTask(taskEditResult);
        console.log(this._editTaskProps);
      } else {
        return null;
      }
    } catch {
      console.log('Error of receiving data for edit task!');
    } finally {
      this._isEditTaskLoading = false;
    }
  };

  loadEditTask = async (editTask: EditTaskEntity) => {
    this._isEditTaskLoading = true;
    try {
      if (editTask) {
        this._editTaskProps = editTask;
        console.log(editTask);
      }
      // const { task } = await this.getEditTasks();
      await TaskAgentInstance.updateTask(this.taskId, editTask);

      this._editTaskProps = editTask;
      console.log(editTask);
    } catch {
      console.log('Error of changing task!');
    } finally {
      this._isEditTaskLoading = false;
    }
  };

  // getEditProps(taskId?: string) {
  //   const task = TasksMock.find((task) => task.id === taskId);
  //   if (task) {
  //     this._editTaskProps = task;
  //   }
  //   this.loadEditTask();
  // }
}

export const EditTaskInstance = new EditTaskStore();
