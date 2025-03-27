import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root-reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
//import { wsOrdersAllActions } from './actions/orders-all';
//import { wsOrdersUserActions } from './actions/orders-user';
import {ORDERS_ALL_END, ORDERS_ALL_ERROR, ORDERS_ALL_MESSAGE, ORDERS_ALL_START} from "./actions/orders-all";
import {ORDERS_USER_END, ORDERS_USER_ERROR, ORDERS_USER_MESSAGE, ORDERS_USER_START} from "./actions/orders-user";

const feedMiddleware = socketMiddleware({
  connect: ORDERS_ALL_START,
  disconnect: ORDERS_ALL_END,
  onError: ORDERS_ALL_ERROR,
  onMessage: ORDERS_ALL_MESSAGE,
});

const profileFeedMiddleware = socketMiddleware({
  connect: ORDERS_USER_START,
  disconnect: ORDERS_USER_END,
  onError: ORDERS_USER_ERROR,
  onMessage: ORDERS_USER_MESSAGE,
})

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(feedMiddleware, profileFeedMiddleware),
   // .concat(socketMiddleware(wsOrdersUserActions)),
  devTools: process.env.NODE_ENV !== 'production'
});


