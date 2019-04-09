import { USER_LOGIN } from '../type';

const INITIAL_STATE = {
    userInfo: undefined,
    token: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.user_info,
            };
        default:
            return state;
    }
};
