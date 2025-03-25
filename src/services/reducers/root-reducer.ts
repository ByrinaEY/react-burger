import { combineReducers } from "redux";
import {loadIngredientsReducer} from './burger-ingredients';
import {burgerConstructorReducer} from './burger-constructor';
import { ordersAllReducer } from "./orders-all";

import{createOrderReducer} from './create-order';
import {authReducer} from './auth';
import {getOrderReducer} from './get-order';
import {ordersUserReducer} from './orders-user';


export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    getIngredientsFromConstructor: burgerConstructorReducer,
    getOrderDetails: createOrderReducer,
    auth :authReducer,
    ordersAll: ordersAllReducer,
    getOrderReducer: getOrderReducer,
    getOrdersUser: ordersUserReducer,
});