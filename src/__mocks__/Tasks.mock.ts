import { TaskEntity, TasksStatsEntity } from 'domains/index';

export const TasksStatsMock: TasksStatsEntity = {
  total: 4,
  important: 2,
  done: 1,
};

export const TasksMock: TaskEntity[] = [
  {
    name: 'Buy pizza',
    id: '1',
    info: 'Destroy pizza',
    isImportant: true,
    isDone: true,
  },
  {
    name: 'Clean',
    id: '51',
    info: 'Lorem ipsum',
    isImportant: false,
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
    isImportant: true,
    isDone: false,
  },
  {
    name: 'Make',
    id: '54',
    info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae maxime ducimus ex temporibus reiciendis dolor laboriosam molestias, debitis officiis cupiditate.',
    isImportant: true,
    isDone: false,
  },
];
