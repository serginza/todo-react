import * as Yup from 'yup';
import { AddTaskEntity } from 'domains/index';

export const DEFAULT_ADD_TASK_FORM: AddTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
};

export const ADD_TASK_INPUT_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Search Input is required!').min(3, 'Task name must be at least 3 characters'),
  info: Yup.string().required('Search Input is required!'),
});
