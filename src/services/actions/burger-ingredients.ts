import  {INGREDIENTS}  from '../../components/utils/server';
import getDataFromServer from '../../components/utils/data-load';
import {TIngredient, AppDispatch} from '../../components/utils/type.js';


export const LOAD_INGREDIENTS_START: "LOAD_INGREDIENTS_START"= "LOAD_INGREDIENTS_START";
export const LOAD_INGREDIENTS_SUCCESS: "LOAD_INGREDIENTS_SUCCESS" = "LOAD_INGREDIENTS_SUCCESS";
export const LOAD_INGREDIENTS_ERROR: "LOAD_INGREDIENTS_ERROR"= "LOAD_INGREDIENTS_ERROR";



export interface ILoadDataStartAction {
    type: typeof LOAD_INGREDIENTS_START;
}

export interface ILoadDataSuccessAction {
    type: typeof LOAD_INGREDIENTS_SUCCESS;
    data: Array<TIngredient>;
}

export interface ILoadDataErrorAction {
    type: typeof LOAD_INGREDIENTS_ERROR;
}

export type TLoadIngredientsActions = ILoadDataStartAction | ILoadDataSuccessAction | ILoadDataErrorAction;

export function loadIngredientsAction() {
    return function(dispatch: AppDispatch) {
        dispatch({ type: LOAD_INGREDIENTS_START });
		getDataFromServer(INGREDIENTS)
		.then(result => {
               	dispatch({
					type: LOAD_INGREDIENTS_SUCCESS,
					data: result.data
				});
			})
			.catch(e => {
				dispatch({
                    type: LOAD_INGREDIENTS_ERROR,

                });
			});
		
		
	}
}



