import React from 'react';
import { View, ScrollView, Text, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { 
    Row, 
    OrderDetail, 
    OrderList, 
    OrderConfirmation, 
    RowCategoryItem,
    SubCategory,
    MenuItem,
    Center,
} from './common';
import { EGG, } from '../colors';
import { SERVER, GET_MAIN_MENU } from '../config';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: [],
            currentCategory: 0,
            cart: [],
            subTotal: 0,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            const { access_token, token_type } = this.props.token;
            const response = await fetch(`${SERVER}${GET_MAIN_MENU}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            if (this._isMounted) {
                const responseData = await response.json();
                this.setState({ data: responseData });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addMenu(data) {
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
        this.setState({ 
            cart, 
            subTotal: this.state.subTotal - data.price 
        });
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
        this.setState({ 
            cart, 
            subTotal: this.state.subTotal - price,
        });
    }

    renderCategory() {
        if (this.state.data.length > 0) {
            return this.state.data.map((mainCategory, index) => 
                <RowCategoryItem 
                    key={index}
                    text={mainCategory.name} 
                    selected={this.state.currentCategory === index} 
                    onPress={() => this.setState({ currentCategory: index })}
                />
            );
        }
    }

    renderSubCategory() {
        if (this.state.data.length > 0) {
            return this.state.data[this.state.currentCategory]
            .sub_categories.map((subCategory, index) => 
                <SubCategory key={index} text={subCategory.name}>
                    {/* {this.renderMenuItem(subCategory.menus)} */}
                    {this.renderMenu(subCategory.menus)}
                </SubCategory>
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

    _keyExtractor = (item, index) => index;

      renderItem(item) {
          return (
            <MenuItem data={item} onPress={() => this.addMenu(item)} />
          );
      }

    renderMenu(data) {
        if (this.state.data.length > 0) {
            return (
                <FlatList
                    data={data}
                    keyExtractor={this._keyExtractor}     //has to be unique   
                    renderItem={({ item, }) => 
                        this.renderItem(item)
                    } //method to render the data in the way you want using styling u need
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
                    <Row style={{ marginTop: 5 }}>
                        {this.renderCategory()}
                    </Row>
                    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                        {this.renderSubCategory()}
                    </ScrollView>
                </View>
                <View style={rightContainer}>
                    <OrderDetail />
                    {this.renderCartList()}
                    <OrderConfirmation 
                        price={(this.state.subTotal * 0.93).toFixed(2)}
                        vat={(this.state.subTotal * 0.07).toFixed(2)}
                        total={this.state.subTotal.toFixed(2)}
                        onClear={() => this.setState({ cart: [], subTotal: 0 })}
                        onSubmit={() => console.log('submit')}
                    />
                </View>
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

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(MainMenu);
