import { TOrdersList } from '../../components/utils/type';
import {
    ORDERS_USER_ERROR,
    ORDERS_USER_MESSAGE,
    TOrdersUserActions
} from '../actions/orders-user';

type TOrdersUserState = {
    message: TOrdersList | null;
    error: string | null;
};

export const initialState: TOrdersUserState = {
    message: null,
    error: null
};

export function ordersUserReducer(state = initialState, action: TOrdersUserActions): TOrdersUserState {
    switch (action.type) {
        case ORDERS_USER_ERROR:
            return { ...state, error: action.error };
        case ORDERS_USER_MESSAGE:
            return { ...state, error: null, message: action.message };
        default:
            return state;
    }
}
