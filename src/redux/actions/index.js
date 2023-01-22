export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const EXPENSES_VALUE = 'EXPENSES_VALUE';
export const REMOVE_EXPENSES_VALUE = 'REMOVE_EXPENSES_VALUE';
export const SET_TABLE_TRUE = 'SET_TABLE_TRUE';
export const EDIT_EXPENSE_VALUES = 'EDIT_EXPENSE_VALUES';
const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
  payload: {
    email,
  },
});

const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    const currencies = Object.keys(data).filter((currencie) => currencie !== 'USDT');
    dispatch(requestSuccessful(currencies));
  } catch (error) {
    // console.error(error);
  }
};
export const addExpenses = (values) => ({
  type: EXPENSES_VALUE,
  payload: { ...values },
});

export const RemoveExpenses = (expenses) => ({
  type: REMOVE_EXPENSES_VALUE,
  payload: expenses,
});

export const setEditorTrue = (id) => ({
  type: SET_TABLE_TRUE,
  payload: id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE_VALUES,
  payload: expense,
});

export default saveEmail;
