
import {setCookie } from "./cookie";


export default async function requestRefresh(url, options) {
    try {
        const res = await fetch(url, options);
        return checkResponse(res);
    } catch (err) {
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
    }
}

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}