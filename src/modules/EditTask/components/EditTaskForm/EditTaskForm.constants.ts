import * as Yup from 'yup';
import { EditTaskEntity } from 'domains/index';

export const DEFAULT_EDIT_TASK_FORM: EditTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isDone: false,
};

export const EDIT_TASK_INPUT_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Search Input is required!').min(3, 'Task Name must be at least 3 characters'),
  info: Yup.string().required('Search Input is required!'),
});
