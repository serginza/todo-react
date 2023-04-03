// import * as Yup from 'yup';
import { FILTER_TYPES } from 'constants/statusFilterTypes';
import { SearchFormEntity } from 'domains/index';

export const DEFAULT_SEARCH_FORM: SearchFormEntity = {
  searchValue: '',
  filterType: FILTER_TYPES.ALL,
};

// export const SEARCH_INPUT_VALIDATION_SCHEMA = Yup.object().shape({
//   searchValue: Yup.string().required('Search Input is required!'),
// });
