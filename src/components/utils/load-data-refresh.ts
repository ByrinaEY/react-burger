import {URL, API_USER} from './server';
 import requestRefresh from './request-refresh';
 import {getCookie } from "./cookie";


 export type TLoginUser = {
    email: string;
    password: string;
};

export  function getUser(endPoint: string){
    return requestRefresh(`${URL}${endPoint}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        }
    });
}

export function patchUser(user : TLoginUser) {
    return requestRefresh(`${URL}${API_USER}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        },
        body: JSON.stringify({ ...user })
    });
}