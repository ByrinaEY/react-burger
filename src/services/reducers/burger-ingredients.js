import {LOAD_INGREDIENTS_START, 
    LOAD_INGREDIENTS_SUCCESS, 
    LOAD_INGREDIENTS_ERROR} from '../actions/burger-ingredients.js';

const initialState = {
    isLoading: false, 
    hasError: false, 
    ingredients: null
}

export function loadIngredientsReducer (state = initialState, action){
 switch(action.type){
    case LOAD_INGREDIENTS_START:
        return {...state, hasError: false, isLoading: true};
    case LOAD_INGREDIENTS_SUCCESS:
        return{ ...state, ingredients: action.data, isLoading: false, hasError: false};
    case LOAD_INGREDIENTS_ERROR:
        return{...state, hasError: true, isLoading: false, ingredients: initialState.ingredients };
    default:
        return state;
 }
}