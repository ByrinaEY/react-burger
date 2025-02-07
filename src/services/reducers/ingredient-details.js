import {SET_DISPLAYES_INGREDIENT} from '../actions/ingredients-details';

 const initialState ={
    ingredient: null
 }

export function ingredientModalWindowReducer (state = initialState, action){
    switch (action.type){
        case SET_DISPLAYES_INGREDIENT:
            return{
                ...state, ingredient: action.ingredient
            };
            default:
                return state;
    }
}