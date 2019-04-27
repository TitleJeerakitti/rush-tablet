import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RestaurantReducer from './RestaurantReducer';

export default combineReducers({
    auth: AuthReducer,
    restaurant: RestaurantReducer,
});
