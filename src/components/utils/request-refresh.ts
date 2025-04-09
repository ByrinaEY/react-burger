import { setCookie, getCookie } from "./cookie";
import {API_TOKEN, URL, ORDER} from './server';
import {TIngredient} from '../../components/utils/type.js';

export async function requestRefresh(
  url: string,
  options: RequestInit
) {
  return request(url, options)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }

                    const accessToken = refreshData.accessToken.split("Bearer ")[1];
                    const refreshToken = refreshData.refreshToken;
                    if (accessToken) {
                        setCookie("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                    }

                    const reqHeaders = new Headers(options.headers);
                    reqHeaders.set('Authorization', refreshData.accessToken);
                    options.headers = reqHeaders;
                    return request(url, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

async function checkResponse(res: Response) {
  return res.ok ? await res.json() : res.json().then((err) => Promise.reject(err));}
  
export function refreshToken() {
  return request(
    `${URL}${API_TOKEN}`,
    postOptions({ token: localStorage.getItem("refreshToken") })
  );}

  async function request(url: string, options?: RequestInit) {
    return await fetch(url, options).then(await checkResponse);
  }


function postOptions(obj: {}, auth?: boolean) {
  return requestOptions("POST", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {} , obj);
}

function requestOptions(method: 'GET' | 'POST' | 'PATCH', headers: {} = {}, body?: {}) {
  let opt: RequestInit = {
      method,
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'accept': 'application/json',
          ...headers
      }
  };
  if (body) {
      opt.body = JSON.stringify(body);
  }
  return opt;
}

export function orderCreate(orderIngredients: Array<TIngredient>) {
  return request(`${URL}${ORDER}`, postOptions({"ingredients":orderIngredients}, true));
}

export function orderGet(orderNum?: string) {
  return request(`${URL}${ORDER}/${orderNum}`);
}