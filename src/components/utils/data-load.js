import {URL} from './server';
 import request from './check-response';
 import {getCookie } from "./cookie";



 export default function getDataFromServer(endPoint){
    return request(`${URL}${endPoint}`)
   
};


