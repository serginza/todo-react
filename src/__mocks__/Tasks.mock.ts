import { TaskEntity, TasksStatsEntity } from 'domains/index';

export const TasksStatsMock: TasksStatsEntity = {
  total: 5,
  important: 4,
  done: 10,
};

export const TasksMock: TaskEntity[] = [
  {
    name: 'Wash',
    id: '50',
    info: 'Lorem',
    isImportant: false,
    isDone: true,
  },
  {
    name: 'Clean',
    id: '51',
    info: 'Lorem ipsum',
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Watch',
    id: '52',
    info: 'Lorem ipsum dolor',
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Make',
    id: '53',
    info: 'Lorem ipsum dolor sit amet',
    isImportant: false,
    isDone: false,
  },
];
