import type {Middleware, MiddlewareAPI } from 'redux';
import {refreshToken} from '../../components/utils/request-refresh';
import { getCookie } from '../../components/utils/cookie';
import  {getEventMessage} from '../../components/utils/message';

import type { AppDispatch, RootState, wsActionsTypes } from '../../components/utils/type';

export type TWSActionTypes = {
  connect: string,
  disconnect: string,
  onOpen?: string,
  onClose?: string,
  onError: string,
  onMessage: string,
  onSendMessage?: string
}


export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';

    const {
      connect,
      disconnect,
      onOpen,
      onClose,
      onError,
      onMessage,
      onSendMessage
    } = wsActions;

   
      return next => (action) => {
        const { dispatch } = store;
  
        if (action.type === wsActions.connect) {
          url = action.url;
          socket = new WebSocket(url);
          isWsConnected = true;
  
          socket.onclose = event => {
            if (event.code !== 1000) {
              dispatch({ type: wsActions.onError, error: "Error" });
              socket?.close();
            }
            if (isWsConnected) {
              dispatch({ type: wsActions.onClose });
              timerWsReconnect = window.setTimeout(() => {
                dispatch({ type: wsActions.connect, url: url });
              }, 3000)
            }
          };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          // if (!parsedData?.success) {
          //   if (parsedData?.message === 'Invalid or missing token') {
          //     refreshToken()
          //     .then(result  =>{
          //       const wssUrl = new URL(url);
          //       wssUrl.searchParams.set("token", result.accessToken.replace("Bearer ",""));
          //       dispatch({ type: wsActions.connect, url: url });
          //     })
          //     .catch((err:any): void =>{
          //       dispatch({ type: wsActions.onError, error: err });
          //     })
          //   }
          //   dispatch({ type: wsActions.onError, error: parsedData?.message });
          // } else {
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: wsActions.onMessage, message: restParsedData });
        //  }
        };

        socket.onerror = event => {
          dispatch({ type: wsActions.onError, error: getEventMessage(event) });
        };

        if (action.type === wsActions.disconnect) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket.close();
          dispatch({ type: wsActions.onClose });
        }
      }
      next(action);
    };
  };
}

