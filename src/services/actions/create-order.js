export const CREATE_ORDER_START = "CREATE_ORDER_STAR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
import { ORDER } from '../../components/utils/server';
import getDataWithPost from '../../components/utils/data-post'

export function createOrderAction(orderIngredients) {
    return function(dispatch) {
        dispatch({type: CREATE_ORDER_START});
		getDataWithPost(ORDER, {'ingredients':  orderIngredients})
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