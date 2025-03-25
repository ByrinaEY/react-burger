import { ORDER } from '../../components/utils/server';
import { AppDispatch, TOrder } from '../../components/utils/type';

export const GET_ORDER_START:"GET_ORDER_START"= "GET_ORDER_START";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR: "GET_ORDER_ERROR" = "GET_ORDER_ERROR";

import getDataFromServer from '../../components/utils/data-load';

export interface IGetOrderStartAction {
    type: typeof GET_ORDER_START;
}

export interface IGetOrderSuccessAction {
    type: typeof GET_ORDER_SUCCESS;
    order: TOrder;
}

export interface IGetOrderErrorAction {
    type: typeof GET_ORDER_ERROR;
    message: string
}


export type TGetOrderActions = IGetOrderStartAction | IGetOrderSuccessAction | IGetOrderErrorAction;

export function getOrderAction(orderNum?: string) {
    return function(dispatch: AppDispatch) {
        dispatch({ type: GET_ORDER_START });
        getDataFromServer(`${ORDER}/${orderNum}`)
        .then(result => {
            dispatch({ type: GET_ORDER_SUCCESS, order: result.orders[0] });
        })
        .catch(err => {
            dispatch({ type: GET_ORDER_ERROR, message: err.message });
        });
    }
}



