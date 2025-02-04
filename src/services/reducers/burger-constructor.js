import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_TOTAL,
    SWAP_INGREDIENTS
} from '../actions/burger-constructor';


const initialState = {
    bun: null,
    ingredients: [],
    total: 0
}


export function burgerConstructorReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BUN:
            return { ...state, bun: action.item };
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.item] };
        case DELETE_INGREDIENT:
            return {...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index)};
        case SWAP_INGREDIENTS:
            const newState = { ...state, ingredients: [...state.ingredients] };
            [newState.ingredients[action.index1], newState.ingredients[action.index2]] = [newState.ingredients[action.index2], newState.ingredients[action.index1]];
            return newState;
            // const contentItems = [...state.burgerIngredients.contentItems];
			// contentItems.splice(action.toIndex, 0,contentItems.splice(action.fromIndex,1)[0]);
			// return {
			// 	...state,
			// 	burgerIngredients: {
			// 		...state.burgerIngredients,
			// 		contentItems: contentItems
			// 	}
			// };
        case SET_TOTAL:
            return { ...state, total: action.sum };
        default:
            return state;
    }
}