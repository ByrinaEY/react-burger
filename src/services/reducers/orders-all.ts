import { TOrdersList } from '../../components/utils/type';
import {
    ORDERS_ALL_ERROR,
    ORDERS_ALL_MESSAGE,
    TOrdersAllActions
} from '../actions/orders-all';

type TOrdersAllState = {
    message: TOrdersList | null;
    error: string | null;
};

const initialState: TOrdersAllState = {
    message: null,
    error: null
};

export function ordersAllReducer(state = initialState, action: TOrdersAllActions): TOrdersAllState {
    switch (action.type) {
        case ORDERS_ALL_ERROR:
            return { ...state, error: action.error };
        case ORDERS_ALL_MESSAGE:
            return { ...state, error: null, message: action.message };
        default:
            return state;
    }
}