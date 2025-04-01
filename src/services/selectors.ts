import { RootState } from "../components/utils/type";

export const loadIngredients = (state: RootState) => state.loadIngredients;
export const getIngredientsFromConstructor= (state: RootState) => state.getIngredientsFromConstructor;
export const getOrderDetails = (state: RootState)=> state.getOrderDetails;
export const auth = (state: RootState)=> state.auth;
export const getOrdersAll = (state: RootState) => state.ordersAll;
export const getOrder = (state: RootState)=> state.getOrderReducer;
export const getOrdersUser = (state: RootState) => state.getOrdersUser;