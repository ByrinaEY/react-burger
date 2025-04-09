import { TOrdersList } from '../../components/utils/type';

export const ORDERS_ALL_START = "ORDERS_ALL_START";
export const ORDERS_ALL_END = "ORDERS_ALL_END";
export const ORDERS_ALL_ERROR = "ORDERS_ALL_ERROR";
export const ORDERS_ALL_MESSAGE = "ORDERS_ALL_MESSAGE";

export interface IOrdersAllStartAction {
    readonly type: typeof ORDERS_ALL_START;
    readonly url: string;
}

export interface IOrdersAllEndAction {
    readonly type: typeof ORDERS_ALL_END;
}

export interface IOrdersAllErrorAction {
    readonly type: typeof ORDERS_ALL_ERROR;
    readonly error: string;
}

export interface IOrdersAllMessageAction {
    readonly type: typeof ORDERS_ALL_MESSAGE;
    readonly message: TOrdersList;
}


export type TOrdersAllActions = 
    IOrdersAllStartAction | IOrdersAllEndAction | 
    IOrdersAllErrorAction |  IOrdersAllMessageAction;

