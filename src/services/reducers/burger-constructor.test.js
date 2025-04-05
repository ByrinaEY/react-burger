import { describe, it, expect } from 'vitest';
import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_TOTAL,
    SWAP_INGREDIENT
} from '../actions/burger-constructor';

import { burgerConstructorReducer, initialState } from "./burger-constructor";

const ingredient = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
};

describe('burger-constructor reducer', () => {
    it("should return the initial state", () => {
        expect(burgerConstructorReducer(undefined, {}))
            .toEqual(initialState);
    });
    it("should handle SET_BUN", () => {
        expect(burgerConstructorReducer(initialState, { type: SET_BUN, item: ingredient }))
            .toEqual({ ...initialState, bun: ingredient });
    });
    it("should handle ADD_INGREDIENT", () => {
        expect(burgerConstructorReducer(initialState, { type: ADD_INGREDIENT, item: ingredient }))
            .toEqual({ ...initialState,  ingredients: [ingredient] });
    });
    it("should handle DELETE_INGREDIENT", () => {
        expect(burgerConstructorReducer(initialState, { type: DELETE_INGREDIENT, item: ingredient }), { type: DELETE_INGREDIENT, index: 0 })
            .toEqual({ ...initialState,  ingredients: [] });
    });
    it("should handle SWAP_INGREDIENT", () => {
        const ingredient2 = { ...ingredient, name: "abc" };
        expect(burgerConstructorReducer({ ...initialState, ingredients: [ingredient, ingredient2]}, { type: SWAP_INGREDIENT, index1: 0, index2: 1 }))
            .toEqual({ ...initialState, ingredients: [ingredient2, ingredient]});
    });
    it("should handle SET_TOTAL", () => {
        const sum = 1000;
        expect(burgerConstructorReducer(initialState, { type: SET_TOTAL, sum: sum }))
            .toEqual({ ...initialState,  total: sum });
    });
})

   