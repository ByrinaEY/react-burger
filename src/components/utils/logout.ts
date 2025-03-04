import {URL} from './server';
 import request from './check-response';


export default function logoutUser(endPoint: string) {
    return request(`${URL}${endPoint}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
            token: localStorage.getItem("refreshToken") 
        })
    });
}
