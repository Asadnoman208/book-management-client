import {
    UPDATE_LOGIN_FORM,
    RESET_LOGIN_FORM,
    SET_LOGIN_FORM_ERRORS
} from './types';

export const updateLoginForm = (field, value) => ({
    type: UPDATE_LOGIN_FORM,
    payload: { field, value },
});

export const resetLoginForm = () => ({
    type: RESET_LOGIN_FORM,
});

export const setLoginFormErrors = (errors) => ({
    type: SET_LOGIN_FORM_ERRORS,
    payload: errors,
});
