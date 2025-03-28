import { setCookie, getCookie } from "./cookie";
import {API_TOKEN, URL} from './server';

export default async function requestRefresh(
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

function checkResponse(res: Response) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  
// if (res.ok) {
//   localStorage.setItem("refreshToken", res.refreshToken);
//             return res;
//         } else {
//             return Promise.reject(new Error(res.message || 'Unknown error'));
//         }
}

// export function refreshToken() {
//   return request(
//     `${URL}${API_TOKEN}`,
//     postOptions({ token: localStorage.getItem("refreshToken") })
//   );}

  function request(url: string, options?: RequestInit) {
    return fetch(url, options).then(checkResponse);
  }


// function postOptions(obj: {}, auth?: boolean) {
//   return requestOptions("POST", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {} , obj);
// }

// function requestOptions(method: 'GET' | 'POST' | 'PATCH', headers: {} = {}, body?: {}) {
//   let opt: RequestInit = {
//       method,
//       headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           'accept': 'application/json',
//           ...headers
//       }
//   };
//   if (body) {
//       opt.body = JSON.stringify(body);
//   }
//   return opt;
// }

// export const refreshToken = async () => {
//   try {
//       const response = await fetch(`${URL}${API_TOKEN}`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json;charset=utf-8'
//           },
//           body: JSON.stringify({
//               token: refreshToken
//           })
//       });

//       const data = await checkResponse(response);

//       if (data.success) {
//           localStorage.setItem('accessToken', data.accessToken);
//           return data;
//       } else {
//           return Promise.reject(new Error(data.message || 'Unknown error'));
//       }
//   } catch (error) {
//       return Promise.reject(error);
//   }
// };

export const refreshToken = async () => {
  try {
    const res = await fetch(
      `${URL}${API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      }
    );

    if (!res.ok) {
      Promise.reject(err);
    }

    const { accessToken, refreshToken } = await res.json();

    localStorage.setItem('accessToken', accessToken.split("Bearer ")[1]);
    localStorage.setItem('refreshToken', refreshToken);

    return localStorage.getItem('accessToken');
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};