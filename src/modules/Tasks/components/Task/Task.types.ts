import { TaskEntity } from 'domains/index';

export type TaskProps = {
  task: TaskEntity;
  changeTaskImportant: (taskId: TaskEntity['id'], currentStatus: boolean) => void;
  changeTaskCompleted: (taskId: TaskEntity['id'], targetStatus: boolean) => void;
  deleteTask: (taskId: TaskEntity['id']) => void;
};
