import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import loginReducer from './loginReducer';
import toastReducer from './toastReducer'; // Import the toast reducer
import bookReducer from './bookReducer'; // Import the toast reducer


const rootReducer = combineReducers({
  registration: registrationReducer,
  login: loginReducer,
  toast: toastReducer,
  books: bookReducer,
});

export default rootReducer;