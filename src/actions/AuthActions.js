import { USER_LOGIN, USER_LOGOUT } from '../type';

export const authUserLogin = (user) => {
    return { type: USER_LOGIN, payload: user };
};

export const authUserLogout = () => {
    return { type: USER_LOGOUT };
};
