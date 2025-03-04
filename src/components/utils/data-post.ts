import {URL} from './server';
 import request from './check-response';



export default  function getDataWithPost(endPoint:string, data: any){
    return request(`${URL}${endPoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({...data})
    })
   
};


