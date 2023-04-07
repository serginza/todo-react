import { FILTER_TYPES } from 'constants/index';
import { TaskEntity, SearchFormEntity, TasksStatsEntity, EditTaskEntity } from 'domains/index';
import { GetAllTasksQuery, GetAllTasksResponse, GetTaskResponse } from 'http/index';

export const mapToExternalParams = (params?: SearchFormEntity): GetAllTasksQuery | undefined => {
  if (!params) {
    return undefined;
  }

  const { searchValue, filterType } = params;
  let isCompleted = undefined;

  if (filterType === FILTER_TYPES.DONE) {
    isCompleted = true;
  } else if (filterType === FILTER_TYPES.ACTIVE) {
    isCompleted = false;
  }

  return {
    name_like: searchValue ?? undefined,
    isImportant: filterType === FILTER_TYPES.IMPORTANT ? true : undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (tasks: GetAllTasksResponse): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        name: task.name || 'Unknown value',
        id: String(task.id),
        info: task.info || 'Unknown value',
        isImportant: task.isImportant || false,
        isDone: task.isCompleted || false,
      });
    }
  });

  return internalTasks;
};

export const mapToInternalTask = (task: GetTaskResponse): EditTaskEntity => {
  return {
    name: task.name || 'Unknown value',
    info: task.info || 'Unknown value',
    isImportant: task.isImportant || false,
    isCompleted: task.isCompleted || false,
  };
};

export const getInternalInfo = (tasks: GetAllTasksResponse): TasksStatsEntity => {
  const total = tasks.length;
  const anotherStats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isCompleted ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...anotherStats,
  };
};
