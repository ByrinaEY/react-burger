import {URL} from './server';
 import request from './check-response';



export default function dataLoad(endPoint){
    return request(`${URL}${endPoint}`)
   
}

