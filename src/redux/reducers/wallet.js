import { REQUEST_SUCCESSFUL,
  EXPENSES_VALUE,
  REMOVE_EXPENSES_VALUE,
  SET_TABLE_TRUE,
  EDIT_EXPENSE_VALUES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES_VALUE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSES_VALUE:
    return {
      ...state,
      expenses: action.payload,
    };
  case SET_TABLE_TRUE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EDIT_EXPENSE_VALUES:
    return {
      ...state,
      editor: false,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
