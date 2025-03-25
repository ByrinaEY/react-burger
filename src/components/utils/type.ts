import { TAuthActions } from "../../services/actions/auth";
import { TBurgerConstructorActions} from "../../services/actions/burger-constructor";
import {TCreateOrderActions} from "../../services/actions/create-order";
import {TLoadIngredientsActions} from "../../services/actions/burger-ingredients";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from "../../services/store";
import { TOrdersAllActions, TwsOrdersAllActions } from "../../services/actions/orders-all";
import {TOrdersUserActions, TwsOrdersUserActions} from '../../services/actions/orders-user'
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TIngredientQty = TIngredient & {
    qty: number;
}

export type TIngredientConstructor = TIngredient & {
    key: number;
};

export type TUser = {
    name: string;
    email: string;
};

export type TRegisterUser = TUser & {
    password: string;
};

export type TPatchUser = TUser & {
    password: string;
};

export type TResetPassword = {
    password: string;
    token: string;
};

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TOrdersList = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}
//export type AppActions = WSActions | TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type TApplicationActions = TAuthActions 
 | TBurgerConstructorActions | TCreateOrderActions | TLoadIngredientsActions | TOrdersAllActions | TOrdersUserActions   ;
//   |  TIngredientWindowActions  | TTabInfoActions | 
//      | TGetOrderActions;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type wsActionsTypes = TwsOrdersAllActions | TwsOrdersUserActions;