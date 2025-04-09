import { TOrdersList } from '../../components/utils/type';

export const ORDERS_USER_START = "ORDERS_USER_START";
export const ORDERS_USER_END = "ORDERS_USER_END";
export const ORDERS_USER_ERROR = "ORDERS_USER_ERROR";
export const ORDERS_USER_MESSAGE = "ORDERS_USER_MESSAGE";

export interface IOrdersUserStartAction {
    readonly type: typeof ORDERS_USER_START;
    readonly url: string;
}

export interface IOrdersUserEndAction {
    readonly type: typeof ORDERS_USER_END;
}

export interface IOrdersUserErrorAction {
    readonly type: typeof ORDERS_USER_ERROR;
    readonly error: string;
}

export interface IOrdersUserMessageAction {
    readonly type: typeof ORDERS_USER_MESSAGE;
    readonly message: TOrdersList;
}


export type TOrdersUserActions =
    IOrdersUserStartAction | IOrdersUserEndAction | 
    IOrdersUserErrorAction |  IOrdersUserMessageAction;

