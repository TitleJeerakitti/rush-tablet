import { USER_LOGIN } from '../type';

export const authUserLogin = (user) => {
    return { type: USER_LOGIN, payload: user };
};
