import {
    UPDATE_REGISTRATION_FORM,
    RESET_REGISTRATION_FORM,
    SET_REGISTRATION_FORM_ERRORS
} from './types';

export const updateRegistrationForm = (field, value) => ({
    type: UPDATE_REGISTRATION_FORM,
    payload: { field, value },
});

export const resetRegistrationForm = () => ({
    type: RESET_REGISTRATION_FORM,
});

export const setRegistrationFormErrors = (errors) => ({
    type: SET_REGISTRATION_FORM_ERRORS,
    payload: errors,
});
