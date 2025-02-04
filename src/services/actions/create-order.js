export const CREATE_ORDER_START = "CREATE_ORDER_STAR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
import { ORDER } from '../../components/utils/server';

export function createOrderAction(orderIngredients) {
    return function(dispatch) {
        dispatch({type: CREATE_ORDER_START});
		fetch(ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'ingredients':  orderIngredients})
        })
        .then(res => {
            if (res.status !==200){
              alert(`Ошибка ${res.status}: ${res.statusText}`);
            }
            return res.json();
            })
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