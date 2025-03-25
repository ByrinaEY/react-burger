import {
    CREATE_ORDER_START,
   CREATE_ORDER_SUCCESS,
   CREATE_ORDER_ERROR,
   TCreateOrderActions
} from '../actions/create-order';

export type TCreateOrderState = {
    isLoading: boolean; 
    hasError: boolean; 
    orderNumber: number | null;
}

const initialState: TCreateOrderState ={
    isLoading: false, 
    hasError: false, 
    orderNumber: null
}

export function createOrderReducer (state = initialState, action: TCreateOrderActions): TCreateOrderState{
    switch(action.type){
       case CREATE_ORDER_START:
           return {...state, hasError: false, isLoading: true};
       case CREATE_ORDER_SUCCESS:
           return{ ...state, orderNumber: action.orderNumber, isLoading: false, hasError: false};
       case CREATE_ORDER_ERROR:
           return{...state, hasError: true, isLoading: false, orderNumber: initialState.orderNumber };
       default:
           return state;
    }
   }