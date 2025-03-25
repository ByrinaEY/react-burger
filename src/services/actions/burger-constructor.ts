import { TIngredient, TIngredientConstructor } from "../../components/utils/type";

export const SET_BUN: "SET_BUN"  = "SET_BUN";
export const ADD_INGREDIENT: "ADD_INGREDIENT"= "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENTS"= "DELETE_INGREDIENTS";
export const SET_TOTAL:"SET_TOTAL" = "SET_TOTAL";
export const SWAP_INGREDIENT:  "SWAP_INGREDIENT" = "SWAP_INGREDIENT";

export interface SetBunAction {
    type: typeof SET_BUN;
    item: TIngredient;
}

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    item: TIngredientConstructor;
}

export interface DeleteIngredientAction {
    type: typeof DELETE_INGREDIENT;
    index: number;
}

export interface SwapIngredientAction {
    type: typeof SWAP_INGREDIENT;
    index1: number;
    index2: number;
}

export interface SetSumAction {
    type: typeof SET_TOTAL;
    sum: number;
}

export type TBurgerConstructorActions = SetBunAction | AddIngredientAction | DeleteIngredientAction | 
    SwapIngredientAction | SetSumAction;

export function createUniqKeyForIngredientAction(ingredients: TIngredient): AddIngredientAction {
    return  {
            type: ADD_INGREDIENT,
            item: {...ingredients,  key :Math.random()}
    }
}