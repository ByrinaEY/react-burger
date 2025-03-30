export const CREATE_ORDER_START: "CREATE_ORDER_STAR"= "CREATE_ORDER_STAR";
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS"= "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR: "CREATE_ORDER_ERROR" = "CREATE_ORDER_ERROR";
import getDataWithPost from '../../components/utils/data-post';
import {TIngredient, AppDispatch} from '../../components/utils/type.js';
import {orderCreate} from '../../components/utils/request-refresh';

export interface ICreateOrderAction {
    type: typeof CREATE_ORDER_START;
}

export interface ICreateOrderSuccessAction {
    type: typeof CREATE_ORDER_SUCCESS;
    orderNumber: number;
}

export interface ICreateOrderErrorAction {
    type: typeof CREATE_ORDER_ERROR;
}

export type TCreateOrderActions = ICreateOrderAction | ICreateOrderSuccessAction | ICreateOrderErrorAction;


export function createOrderAction(orderIngredients: Array<TIngredient>) {
    return function(dispatch: AppDispatch) {
        dispatch({type: CREATE_ORDER_START});
		orderCreate(orderIngredients)
       		.then(result => {
               	dispatch({
					type: CREATE_ORDER_SUCCESS,
					orderNumber: result.order.number
				});
			})
			.catch(e => {
				dispatch({
                    type: CREATE_ORDER_ERROR
                });
			});
		
		
	}
}