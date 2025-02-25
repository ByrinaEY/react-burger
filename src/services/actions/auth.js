// import { registerUser, loginUser, logoutUser, refreshToken, forgotPassword, resetPassword, getUser, patchUser } from "../../utils/api";
import { setCookie, deleteCookie } from "../../components/utils/cookie";
import { FORGOT_PASSWORD, RESET_PASSWORD, REGISTER, LOGIN, API_USER, LOGOUT } from '../../components/utils/server';
import getDataWithPost from '../../components/utils/data-post';
import { getUser, patchUser } from '../../components/utils/load-data-refresh';
import logoutUser from '../../components/utils/logout';


export const AUTH_REGISTER_START = "AUTH_REGISTER_START";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_ERROR = "AUTH_REGISTER_ERROR";

export const AUTH_LOGIN_START = "AUTH_LOGIN_START";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";

export const AUTH_LOGOUT_START = "AUTH_LOGOUT_START";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_ERROR = "AUTH_LOGOUT_ERROR";

export const AUTH_FORGOT_PASSWORD_START = "AUTH_FORGOT_PASSWORD_START";
export const AUTH_FORGOT_PASSWORD_SUCCESS = "AUTH_FORGOT_PASSWORD_SUCCESS";
export const AUTH_FORGOT_PASSWORD_ERROR = "AUTH_FORGOT_PASSWORD_ERROR";

export const AUTH_RESET_PASSWORD_START = "AUTH_RESET_PASSWORD_START";
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS";
export const AUTH_RESET_PASSWORD_ERROR = "AUTH_RESET_PASSWORD_ERROR";

export const AUTH_GET_USER_START = "AUTH_GET_USER_START";
export const AUTH_GET_USER_SUCCESS = "AUTH_GET_USER_SUCCESS";
export const AUTH_GET_USER_ERROR = "AUTH_GET_USER_ERROR";

export const AUTH_PATCH_USER_START = "AUTH_PATCH_USER_START";
export const AUTH_PATCH_USER_SUCCESS = "AUTH_PATCH_USER_SUCCESS";
export const AUTH_PATCH_USER_ERROR = "AUTH_PATCH_USER_ERROR";

export const AUTH_CLEAR_ERRORS = "AUTH_CLEAR_ERRORS";

export function authRegisterAction(form) {
    return function (dispatch) {
        dispatch({ type: AUTH_REGISTER_START });
        getDataWithPost(REGISTER, form)
            .then(result => {
                console.log(result);
                const accessToken = result.accessToken.split("Bearer ")[1];
                const refreshToken = result.refreshToken;
                if (accessToken) {
                    setCookie("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                }

                dispatch({ type: AUTH_REGISTER_SUCCESS, user: result.user });
            })
            .catch(err => {
                dispatch({ type: AUTH_REGISTER_ERROR, message: err.message });
            });
    }
}

export function authLoginAction(user) {
    return function (dispatch) {
        dispatch({ type: AUTH_LOGIN_START });
        getDataWithPost(LOGIN, user)
            .then(result => {
                const accessToken = result.accessToken.split("Bearer ")[1];
                const refreshToken = result.refreshToken;
                if (accessToken) {
                    setCookie("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                }
                dispatch({ type: AUTH_LOGIN_SUCCESS, user: result.user });
            })

            .catch(err => {
                dispatch({ type: AUTH_LOGIN_ERROR, message: err.message });
            });
    }
}

export function authLogoutAction() {
    return function (dispatch) {
        dispatch({ type: AUTH_LOGOUT_START });
        localStorage.removeItem("refreshToken");
        deleteCookie("accessToken");
        logoutUser(LOGOUT)
            .then(result => {
                dispatch({ type: AUTH_LOGOUT_SUCCESS });
            })
            .catch(err => {
                dispatch({ type: AUTH_LOGOUT_ERROR, message: err.message });
            });
    }
}



export function recoverPWAction(email) {
    return function (dispatch) {
        dispatch({ type: AUTH_FORGOT_PASSWORD_START });
        getDataWithPost(FORGOT_PASSWORD, { 'email': email })
            .then(result => {
                console.log(result);
                dispatch({
                    type: AUTH_FORGOT_PASSWORD_SUCCESS,
                    answer: result.success
                });
            })
            .catch(e => {
                dispatch({
                    type: AUTH_FORGOT_PASSWORD_ERROR
                });
            });


    }
}

export function resetPWAction(data) {
    return function (dispatch) {
        dispatch({ type: AUTH_RESET_PASSWORD_START });
        getDataWithPost(RESET_PASSWORD, { data })
            .then(result => {
                dispatch({
                    type: AUTH_RESET_PASSWORD_SUCCESS,
                    answer: result.success
                });
            })
            .catch(e => {
                dispatch({
                    type: AUTH_RESET_PASSWORD_ERROR
                });
            });


    }
}

export function authGetUserAction() {
    return function (dispatch) {
        dispatch({ type: AUTH_GET_USER_START });
        getUser(API_USER)
            .then(result => {
                dispatch({ type: AUTH_GET_USER_SUCCESS, user: result.user });
            })
            .catch(err => {
                dispatch({ type: AUTH_GET_USER_ERROR, message: err.message });
            });
    }
}

export function authPatchUserAction(form) {
    return function (dispatch) {
        dispatch({ type: AUTH_PATCH_USER_START });
        patchUser(form)
            .then(result => {
                dispatch({ type: AUTH_PATCH_USER_SUCCESS, user: result.user });
            })
            .catch(err => {
                dispatch({ type: AUTH_PATCH_USER_ERROR, message: err.message });
            });
    }
}