import {
    UPDATE_LOGIN_FORM,
    RESET_LOGIN_FORM,
    SET_LOGIN_FORM_ERRORS
} from '../actions/types';

const initialState = {
    email: '',
    password: '',
    errors: {},
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_FORM:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case RESET_LOGIN_FORM:
            return initialState;
        case SET_LOGIN_FORM_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
};

export default loginReducer;
