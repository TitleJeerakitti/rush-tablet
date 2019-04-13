import { RESTAURANT_MENU_COLLECT } from '../type';

const INITIAL_STATE = {
    restaurant_menu: undefined,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_MENU_COLLECT:
            return {
                ...state,
                restaurant_menu: action.payload,
            };
        default:
            return state;
    }
};
