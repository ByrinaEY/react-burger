import {
    CREATE_ORDER_START,
   CREATE_ORDER_SUCCESS,
   CREATE_ORDER_ERROR 
} from '../actions/create-order';

const initialState ={
    isLoading: false, 
    hasError: false, 
    orderNumber: null
}

export function createOrderReducer (state = initialState, action){
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