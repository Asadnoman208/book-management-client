import {
    UPDATE_REGISTRATION_FORM,
    RESET_REGISTRATION_FORM,
    SET_REGISTRATION_FORM_ERRORS
} from '../actions/types';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REGISTRATION_FORM:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case RESET_REGISTRATION_FORM:
            return initialState;
        case SET_REGISTRATION_FORM_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        default:
            return state;
    }
};

export default registrationReducer;
