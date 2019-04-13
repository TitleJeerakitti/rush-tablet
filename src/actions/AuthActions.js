import { USER_LOGIN, USER_LOGOUT, AUTH_TOKEN_LOGIN } from '../type';

export const authUserLogin = (user) => {
    return { type: USER_LOGIN, payload: user };
};

export const authTokenLogin = (user_info, token) => {
    return {
        type: AUTH_TOKEN_LOGIN,
        payload: { user_info, token },
    };
};

export const authUserLogout = () => {
    return { type: USER_LOGOUT };
};
