export const SET_BUN = "SET_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENTS";
export const SET_TOTAL = "SET_TOTAL";
export const SWAP_INGREDIENT = "SWAP_INGREDIENT";


export function createUniqKeyForIngredientAction(ingredients){
    return function(dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            item: {...ingredients,  key:Math.random()}
           
        });
    }
}