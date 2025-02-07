import { combineReducers } from "redux";
import {loadIngredientsReducer} from './burger-ingredients';
import {burgerConstructorReducer} from './burger-constructor';
import {ingredientModalWindowReducer} from './ingredient-details';
import{createOrderReducer} from './create-order';

export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    getIngredientsFromConstructor: burgerConstructorReducer,
    getDataOfIngredient: ingredientModalWindowReducer,
    getOrderDetails: createOrderReducer
});