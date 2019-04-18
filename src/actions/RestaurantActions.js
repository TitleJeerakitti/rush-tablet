import { RESTAURANT_MENU_COLLECT } from '../type';

export const restaurantCollect = (data) => {
    return { type: RESTAURANT_MENU_COLLECT, payload: data };
};
