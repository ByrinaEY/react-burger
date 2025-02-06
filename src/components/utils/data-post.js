import {URL} from './server';
 import request from './check-response';



export default function dataPost(endPoint, data){
    return request(`${URL}${endPoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
   
}
