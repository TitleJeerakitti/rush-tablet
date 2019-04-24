export const SERVER = 'http://161.246.6.1:8010';
// export const SERVER = 'http://10.66.4.133:8000';
export const CLIENT_SECRET = '20gLSwtsfYqqsamMYLj7GGYxziYRaoQXzCcdIARLY1XkQ7tzpv0pJQXxqzMIi5f3kIxgMkLeJKfoEBmOUda8Dj7RmysnwU4yUOL4CZgqVI9gtkwfqS1cqEs2evvgpmla';
export const CLIENT_ID = '55lYZd3VS5vcHGFvm2KpUKB0tdiBET8gLAXC8TSX';

export const SHOP_STATUS = '/api/restaurant/open-close-shop/';
export const LOG_IN = '/api/restaurant/login/';
export const TOKEN_LOGIN = '/api/restaurant/get-supplier-data/';
export const LOG_OUT = '/api/restaurant/logout/';
export const GET_MAIN_MENU = '/api/restaurant/home/';
export const CREATE_OFFLINE_ORDER = '/api/restaurant/create-offline-order/';
export const GET_ORDER = '/api/restaurant/get-order-management/';
export const GET_ORDER_DETAIL = '/api/restaurant/order-detail/';
export const UPDATE_ORDER_STATUS = '/api/restaurant/update-order-status/';
export const MENU_MODIFY = '/api/restaurant/create-edit-menu/';
export const MAIN_CATEGORY_MODIFY = '/api/restaurant/create-edit-main-category/';
export const SUB_CATEGORY_MODIFY = '/api/restaurant/create-edit-sub-category/';
export const GET_QUEUE = '/api/restaurant/get-queue/'; 
export const GET_REPORT = '/api/restaurant/get-report/';
export const UPLOAD_EXPO_TOKEN = '/api/upload_expo_token';
export const CALL_QUEUE = '/api/restaurant/call-queue-again/';
// export const RE
export const ONLINE_QUEUE = 'online_queue';
export const WALKIN_QUEUE = 'walkin_queue';
export const MENU_MANAGEMENT = 'menu';
export const MAIN_CATEGORIES = 'mainCategories';
export const SUB_CATEGORIES = 'subCategories';
export const MENUS = 'menus';

export const GET_API_HEADERS = {
    'Cache-Control': 'no-cache',
};

export const CONTENT_TYPE_JSON_HEADERS = {
    'Content-Type': 'application/json',
};

export const AUTH_HEADER = (token_type, access_token) => {
    return ({
        'Content-Type': 'application/json',
        Authorization: `${token_type} ${access_token}`
    });
};
