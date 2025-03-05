

function checkResponse(res: Response){
    if (res.status !==200){
        alert(`Ошибка ${res.status}: ${res.statusText}`);
      }
      return res.json();

}

export default  function request(url: string, options?: any) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
  }


 