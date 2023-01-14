import { combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ user, wallet }, composeWithDevTools());

export default rootReducer;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
