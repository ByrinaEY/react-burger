import {URL} from './server';
 import request from './check-response';



export default function getDataFromServer(endPoint){
    return request(`${URL}${endPoint}`)
   
}

