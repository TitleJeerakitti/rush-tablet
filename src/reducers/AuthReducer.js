import { USER_LOGIN, USER_LOGOUT, AUTH_TOKEN_LOGIN, TOGGLE_SHOP_STATUS } from '../type';

const INITIAL_STATE = {
    userInfo: undefined,
    token: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN:
        case AUTH_TOKEN_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userInfo: action.payload.user_info,
            };
        case TOGGLE_SHOP_STATUS:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    is_open: action.payload,
                }
            };
        case USER_LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
