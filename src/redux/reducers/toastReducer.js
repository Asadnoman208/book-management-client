import { SHOW_TOAST, HIDE_TOAST } from './../actions/types';

const initialState = {
    show: false,
    severity: '',
    summary: '',
    detail: '',
    life: 3000,
};

const toastReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_TOAST:
            return {
                ...state,
                show: true,
                ...action.payload,
            };
        case HIDE_TOAST:
            return initialState;
        default:
            return state;
    }
};

export default toastReducer;
