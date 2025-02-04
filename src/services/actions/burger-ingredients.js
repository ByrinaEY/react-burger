
export const LOAD_INGREDIENTS_START = "LOAD_INGREDIENTS_START";
export const LOAD_INGREDIENTS_SUCCESS = "LOAD_INGREDIENTS_SUCCESS";
export const LOAD_INGREDIENTS_ERROR = "LOAD_INGREDIENTS_ERROR";
import { DOMAIN } from '../../components/utils/server';

export function loadIngredientsAction() {
    return function(dispatch) {
        dispatch({type: LOAD_INGREDIENTS_START});
		fetch(DOMAIN)
        .then(res => {
            if (res.status !==200){
              alert(`Ошибка ${res.status}: ${res.statusText}`);
            }
            return res.json();
            })
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



