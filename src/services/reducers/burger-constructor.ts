import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_TOTAL,
    SWAP_INGREDIENT
} from '../actions/burger-constructor';
import {TIngredient, TIngredientConstructor} from "../../components/utils/type";
import {TBurgerConstructorActions} from "../actions/burger-constructor";

export type TBurgerConstructorState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredientConstructor>;
    total: number;
}

const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: [],
    total: 0
}


export function burgerConstructorReducer(state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState {
    switch (action.type) {
        case SET_BUN:
            return { ...state, bun: action.item };
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.item] };
        case DELETE_INGREDIENT:
            return {...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index)};
        case SWAP_INGREDIENT:
            const newState = { ...state, ingredients: [...state.ingredients] };
            [newState.ingredients[action.index1], newState.ingredients[action.index2]] = [newState.ingredients[action.index2], newState.ingredients[action.index1]];
            return newState;
            case SET_TOTAL:
            return { ...state, total: action.sum };
        default:
            return state;
    }
}