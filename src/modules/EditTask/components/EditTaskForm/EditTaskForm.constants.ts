import * as Yup from 'yup';
import { ActionTaskEntity } from 'domains/index';
import { ERROR_VALIDATION_MSG } from 'constants/index';

export const DEFAULT_EDIT_TASK_FORM: ActionTaskEntity = {
  name: '',
  info: '',
  isImportant: false,
  isCompleted: false,
};

export const EDIT_TASK_INPUT_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required(ERROR_VALIDATION_MSG.REQUIRED_MSG).min(3, ERROR_VALIDATION_MSG.MIN_CHARACTERS_MSG),
  info: Yup.string().required(ERROR_VALIDATION_MSG.REQUIRED_MSG),
});
