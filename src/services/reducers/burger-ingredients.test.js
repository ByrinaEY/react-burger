import { describe, it, expect } from 'vitest';
import {LOAD_INGREDIENTS_START, 
    LOAD_INGREDIENTS_SUCCESS, 
    LOAD_INGREDIENTS_ERROR,
} from '../actions/burger-ingredients';

import { loadIngredientsReducer, initialState } from "./burger-ingredients";

const errorMessage = 'fail message';

const data = [
    {
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
    },
    {
        "_id": "60666c42cc7b410027a1a9b7",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    }
];

describe('burger-ingredients reducer', () => {
    it("should return the initial state", () => {
        expect(loadIngredientsReducer(undefined, {}))
            .toEqual(initialState);
    });
    it("should handle LOAD_INGREDIENTS_START", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_INGREDIENTS_START}))
            .toEqual({ ...initialState, hasError: false, isLoading: true });
    });
    it("should handle LOAD_INGREDIENTS_SUCCESS", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_INGREDIENTS_SUCCESS, data: data}))
            .toEqual({ ...initialState, ingredients: data, isLoading: false, hasError: false });
    });
    it("should handle LOAD_INGREDIENTS_ERROR", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_INGREDIENTS_ERROR, message: errorMessage}))
            .toEqual({ ...initialState, hasError: true, isLoading: false, ingredients: null });
    });   
})
