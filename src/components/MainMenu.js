import React from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    FlatList, 
    LayoutAnimation, 
    Platform, 
    UIManager, 
    Alert 
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Permissions, Notifications } from 'expo';
import { 
    Row, 
    OrderDetail, 
    OrderList, 
    OrderConfirmation, 
    RowCategoryItem,
    SubCategory,
    MenuItem,
    Center,
    Change,
} from './common';
import { EGG, GRAY, } from '../colors';
import { 
    SERVER, 
    GET_MAIN_MENU, 
    CREATE_OFFLINE_ORDER, 
    AUTH_HEADER, 
    UPLOAD_EXPO_TOKEN 
} from '../config';
import { restaurantCollect } from '../actions';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: [],
            currentCategory: 0,
            cart: [],
            subTotal: 0,
            visible: false,
            isPaid: false,
            formData: {},
            loading: false,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${GET_MAIN_MENU}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            if (this._isMounted) {
                const responseData = await response.json();
                this.setState({ data: responseData });
                this.props.restaurantCollect(responseData);
                this.getPermissions();
                this.listener = Notifications.addListener(this.listener);
            }
        } catch (error) {
            Alert.alert('Unstable Network!');
        }
    }

    componentDidUpdate(prevProps) {
        if (this._isMounted && prevProps.restaurant_menu !== this.props.restaurant_menu) {
            this.setState({ data: this.props.restaurant_menu, currentCategory: 0, cart: [] });
        }
    }
    
    componentWillUnmount() {
        if (this.listener && this._isMounted) {
            Notifications.removeListener(this.listener);
        }
        this._isMounted = false;
    }

    async getPermissions() {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            Alert.alert('Please turn on your notification at setting.');
        }
        if (status === 'granted') {
            const token = await Notifications.getExpoPushTokenAsync();
            this.sentNoticeToken(token);
        }
    }

    async sentNoticeToken(token) {
        try {
            const { access_token, token_type, } = this.props.token;
            await fetch(`${SERVER}${UPLOAD_EXPO_TOKEN}`, {
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    Authorization: `${token_type} ${access_token}`,
                },
                body: JSON.stringify({
                    expo_token: token,
                })
            });
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }
    
    listener = ({ origin, data }) => {
        // handle notification here!
        if (origin === 'selected') {
            if (data.status === 200 || data.status === 201) {
                Actions.order();
                Actions.refresh();
            }
        }
    }

    async createOrderAPI() {
        try {
            this.setState({ loading: true });
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${CREATE_OFFLINE_ORDER}`, {
                method: 'POST',
                headers: AUTH_HEADER(token_type, access_token),
                body: JSON.stringify({
                    menus: this.manageFormData(),
                    total: this.state.subTotal,
                    special_request: '',
                    discount: 0,
                })
            });
            if (this._isMounted && response.status === 200) {
                this.renderAnimation();
                this.setState({ isPaid: true, loading: false });
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    addMenu(data) {
        if (this._isMounted) {
            if (this.state.cart.length > 0) {
                let status = true;
                const cart = this.state.cart.reduce((arr, item, index, all) => {
                    if (item.id === data.id) {
                        arr.push({
                            ...item,
                            quantity: item.quantity + 1,
                        });
                        status = false;
                    } else if (index === all.length - 1 && status) {
                        arr.push(item);
                        arr.push({ ...data, quantity: 1 });
                    } else {
                        arr.push(item);
                    }
                    return arr;
                }, []);
                this.setState({ 
                    cart, 
                    subTotal: this.state.subTotal + data.price, 
                });
            } else {
                this.setState({ 
                    cart: [{ ...data, quantity: 1 }],
                    subTotal: this.state.subTotal + data.price,
                });
            }
        }
    }

    decreaseMenu(data) {
        // let status = true;
        const cart = this.state.cart.reduce((arr, item) => {
            if (item.id === data.id) {
                if (item.quantity - 1 !== 0) {
                    arr.push({ 
                        ...item,
                        quantity: item.quantity - 1,
                    });
                }
            } else {
                arr.push(item);
            }
            return arr;
        }, []);
        if (this._isMounted) {
            this.setState({ 
                cart, 
                subTotal: this.state.subTotal - data.price 
            });
        }
    }

    removeMenu(data) {
        let price = 0;
        const cart = this.state.cart.reduce((arr, item) => {
            if (item.id === data.id) {
                price = item.price * item.quantity;
            } else {
                arr.push(item);
            }
            return arr;
        }, []);
        if (this._isMounted) {
            this.renderAnimation();
            this.setState({ 
                cart, 
                subTotal: this.state.subTotal - price,
            });
        }
    }

    manageFormData() {
        const result = this.state.cart.reduce((arr, item) => {
            arr.push({
                menu_id: item.id,
                amount: item.quantity,
            });
            return arr;
        }, []);
        return result;
    }

    _keyExtractor = (item, index) => index;

    renderItem(item) {
        return (
            <MenuItem 
                data={item} 
                onPress={() => {
                    if (!item.is_out_of_stock) {
                        this.renderAnimation();
                        this.addMenu(item);
                    }
                }} 
            />
        );
    }

    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderSubCategory() {
        if (this.state.data.length > 0) {
            return this.state.data[this.state.currentCategory]
            .sub_categories.map((subCategory, index) => {
                    if (subCategory.menus.length > 0) {
                        return (
                            <SubCategory key={index} text={subCategory.name}>
                                {/* {this.renderMenuItem(subCategory.menus)} */}
                                {this.renderMenu(subCategory.menus)}
                            </SubCategory>
                        );
                    }
                    return <View key={index} />;
                }
            );
        }
    }

    renderMenuItem(menus) {
        const data = menus.reduce((arr, menu, index) => {
            if (index % 2 === 0) {
                arr.push([]);
                arr[index / 2].push(menu);
            } else {
                arr[Math.floor(index / 2)].push(menu);
            }
            return arr;
        }, []);
        return data.map((menu, index) => {
            return (
                <Row key={index}>
                    <MenuItem onPress={() => this.addMenu(menu[0])}>
                        {menu[0].name}
                    </MenuItem>
                    { menu.length === 2 ? 
                        <MenuItem onPress={() => this.addMenu(menu[1])}>
                            {menu[1].name}
                        </MenuItem> 
                        : <View style={{ flex: 1, margin: 10, padding: 10 }} /> 
                    }
                </Row>
            ); 
        });
    }

    renderCartList() {
        if (this.state.cart.length > 0) {
            return (
                <ScrollView style={{ flex: 1, }}>
                { this.state.cart.map(item => 
                    <OrderList 
                        key={item.id}
                        name={item.name}
                        amount={item.quantity}
                        price={item.price.toFixed(2)}
                        total={(item.quantity * item.price).toFixed(2)}
                        onIncrease={() => this.addMenu(item)}
                        onDecrease={() => this.decreaseMenu(item)}
                        onClear={() => this.removeMenu(item)}
                    />
                )}
                </ScrollView>
            );  
        }
        return <Center><Text>ไม่มีรายการสินค้า</Text></Center>;
    }

    renderCategory() {
        if (this.state.data.length > 0) {
            return this.state.data.map((mainCategory, index) => 
                <RowCategoryItem 
                    key={index}
                    text={mainCategory.name} 
                    selected={this.state.currentCategory === index} 
                    onPress={() => {
                        if (this._isMounted) {
                            this.renderAnimation();
                            this.setState({ currentCategory: index });
                        }
                    }}
                />
            );
        }
    }

    renderMenu(data) {
        if (this.state.data.length > 0) {
            return (
                <FlatList
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item, }) => 
                        this.renderItem(item)
                    }
                    horizontal={false}
                    numColumns={3}
                />
            );
        }
    }

    render() {
        const { rightContainer } = styles;
        return (
            <Row style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    { this.state.data.length !== 0 ?
                        <View style={{ flex: 1, }}>
                            <Row style={{ marginTop: 5 }}>
                                {this.renderCategory()}
                            </Row>
                            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                                {this.renderSubCategory()}
                            </ScrollView>
                        </View> :
                        <Center>
                            <Text style={{ fontWeight: 'bold', color: GRAY, }}>
                                PLEASE CREATE MENU FOR YOUR RESTAURANT
                            </Text>
                        </Center>
                    }
                </View>
                <View style={rightContainer}>
                    <OrderDetail />
                    {this.renderCartList()}
                    <OrderConfirmation 
                        price={(this.state.subTotal * 0.93).toFixed(2)}
                        vat={(this.state.subTotal * 0.07).toFixed(2)}
                        total={this.state.subTotal.toFixed(2)}
                        onClear={() => {
                            if (this._isMounted) {
                                this.renderAnimation();
                                this.setState({ cart: [], subTotal: 0 });
                            }
                        }}
                        onSubmit={() => {
                            if (this.state.subTotal > 0 && this._isMounted) {
                                this.setState({ visible: true });
                            }
                        }}
                    />
                </View>
                <Change 
                    visible={this.state.visible} 
                    onPay={() => this.createOrderAPI()}
                    onCancel={() => this._isMounted && this.setState({ 
                        visible: false, 
                        isPaid: false, 
                    })}
                    onClose={() => this._isMounted && this.setState({ 
                        visible: false, 
                        isPaid: false, 
                        cart: [], 
                        subTotal: 0 
                    })}
                    total={this.state.subTotal}
                    isPaid={this.state.isPaid}
                    loading={this.state.loading}
                />
            </Row>
        );
    }
}

const styles = {
    rightContainer: {
        flex: 2, 
        backgroundColor: EGG, 
        shadowOffset: {
            width: 0, 
            height: 0 
        }, 
        shadowRadius: 10, 
        shadowOpacity: 0.1,
    }
};

const mapStateToProps = ({ auth, restaurant }) => {
    const { token } = auth;
    const { restaurant_menu } = restaurant;
    return { token, restaurant_menu };
};

export default connect(mapStateToProps, { restaurantCollect })(MainMenu);
