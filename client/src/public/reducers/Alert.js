import { SET_ALERT, CLEAR_ALERT } from "../actions/types";
const initialState = {
    alerts: []
};

export const AlertReducer = (state=initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case SET_ALERT:
            return { ...state, alerts: [...state.alerts, payload] }
        case CLEAR_ALERT: 
            return { ...state, alerts: state.alerts.slice(1)}
        default:
            return state;
    }
};
