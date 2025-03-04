
export const LOAD_INGREDIENTS_START = "LOAD_INGREDIENTS_START";
export const LOAD_INGREDIENTS_SUCCESS = "LOAD_INGREDIENTS_SUCCESS";
export const LOAD_INGREDIENTS_ERROR = "LOAD_INGREDIENTS_ERROR";
import { INGREDIENTS } from '../../components/utils/server';
import getDataFromServer from '../../components/utils/data-load.ts';

export function loadIngredientsAction() {
    return function(dispatch) {
        dispatch({type: LOAD_INGREDIENTS_START});
		getDataFromServer(INGREDIENTS)
		.then(result => {
               	dispatch({
					type: LOAD_INGREDIENTS_SUCCESS,
					data: result.data
				});
			})
			.catch(e => {
				dispatch({
                    type: LOAD_INGREDIENTS_ERROR
                });
			});
		
		
	}
}



