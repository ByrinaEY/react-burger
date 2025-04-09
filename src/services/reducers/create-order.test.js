import { describe, it, expect } from 'vitest';
import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    CLEAR_ORDER
  } from "../actions/create-order";

  import { createOrderReducer, initialState } from "./create-order";

  const errorMessage = 'fail message';


  describe('create-order reducer', () => {
    it("should return the initial state", () => {
        expect(createOrderReducer(undefined, {}))
            .toEqual(initialState);
    });
    it("should handle CREATE_ORDER_START", () => {
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_START}))
            .toEqual({ ...initialState, hasError: false, isLoading: true });
    });
    it("should handle CREATE_ORDER_SUCCESS", () => {
        const orderNumber = 1234;
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_SUCCESS, orderNumber: orderNumber}))
            .toEqual({ ...initialState, orderNumber: orderNumber, isLoading: false, hasError: false });
    });
    it("should handle CREATE_ORDER_ERROR", () => {
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_ERROR, message: errorMessage}))
            .toEqual({ ...initialState, hasError: true, isLoading: false, orderNumber: null });
    });   
})
       
  