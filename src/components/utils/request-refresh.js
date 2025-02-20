
import {setCookie , getCookie} from "./cookie";


export default function requestRefresh(url, options) {
    return fetch(url, options)
        .then(checkResponse)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    setCookie("accessToken", refreshData.accessToken);
                    options.headers.authorization = refreshData.accessToken;
                    return request(url, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}