import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, UIManager, LayoutAnimation, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Row, SeleteItem, OrderItem, EmptyView, } from './common';
import { ORANGE, DARK_ORANGE, DARK_RED, } from '../colors';
import { GET_ORDER, SERVER, AUTH_HEADER, UPDATE_ORDER_STATUS, GET_ORDER_DETAIL } from '../config';
import { OrderDetailPopup } from './common/Popup';

const config = {
    data: [
        {
            status: 'Waiting Order',
            url: 'waiting_order',
            iconName: 'cellphone-link',
            iconType: 'material-community',
        },
        {
            status: 'Cooking Order',
            url: 'cooking_order',
            iconName: 'restaurant-menu',
            iconType: 'material',
        },
        {
            status: 'Done Order',
            url: 'done_order',
            iconName: 'calendar-clock',
            iconType: 'material-community',
        },
    ]
};

class OrderManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            endDate: this.formatDate(new Date()),
            startDate: this.formatDate(new Date()),
            currentType: config.data[0].url,
            data: {},
            orderDetail: {},
            isShowDetail: false,
        };
    }

    componentDidMount() {
        this.getOrderAPI();
    }

    async getOrderAPI() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${GET_ORDER}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            const resposneData = await response.json();
            await this.setState({ data: resposneData, isShowDetail: false, orderDetail: {} });
        } catch (error) {
            console.log(error);
        }
    }
    
    async getOrderDetailAPI(id) {
        try {
            const { token_type, access_token, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_ORDER_DETAIL}?id=${id}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            if (response.status === 200) {
                // this.getOrderAPI();
                const resposneData = await response.json();
                this.setState({ orderDetail: resposneData, isShowDetail: true });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async updateAPI(order, status) {
        try {
            const { token_type, access_token, } = this.props.token;
            const response = await fetch(`${SERVER}${UPDATE_ORDER_STATUS}`, {
                method: 'POST',
                headers: AUTH_HEADER(token_type, access_token),
                body: JSON.stringify({
                    id: order.id,
                    status,
                })
            });
            if (response.status === 200) {
                this.renderAnimation();
                this.getOrderAPI();
            }
        } catch (err) {
            console.log(err);
        }
    }

    statusUpdate(order) {
        const { category, status } = order;
        if ((category === 'A' || category === 'R') && status !== 3) {
            this.updateAPI(order, status + 1);
        } else if (category === 'A' && status === 3) {
            this.updateAPI(order, 5);
        }
    }

    changeType(url) {
        if (this.state.currentType !== url) {
            this.getOrderAPI(url);
            this.setState({ currentType: url });
        }
    }

    formatDate(date) {
        const dateStr = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        const month = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        return `${date.getFullYear()}-${month}-${dateStr}`;
    }

    canRight(date) {
        this.setState({ 
            canRight: date.year < new Date().getFullYear() || 
                (date.month < new Date().getMonth() + 1 && date.year <= new Date().getFullYear()),
        });
    }
    
    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderSelectItem() {
        return config.data.map((value, index) => 
            <SeleteItem 
                key={index}
                iconName={value.iconName}
                iconType={value.iconType}
                text={value.status}
                selected={this.state.currentType === value.url}
                onPress={() => {
                    this.changeType(value.url);
                    this.renderAnimation();
                }}
            />
        );
    }

    renderCalendar() {
        if (this.state.visible) {
            return (
                <View>
                    <Calendar 
                        onDayPress={(day) => this.setState({ 
                            endDate: day.dateString, 
                            visible: false, 
                        })}
                        markedDates={{
                            [this.state.endDate]: { selected: true, },
                            }}
                        maxDate={new Date()}
                        hideExtraDays
                        onMonthChange={(month) => this.canRight(month)}
                        onPressArrowRight={addMonth => { 
                            if (this.state.canRight) {
                                addMonth(); 
                            }
                        }}
                        theme={{
                            selectedDayBackgroundColor: ORANGE,
                            todayTextColor: DARK_ORANGE,
                            arrowColor: DARK_RED,
                        }}
                    />
                </View>
            );
        }
    }

    renderOrderList() {
        const orders = this.state.data[this.state.currentType] || [];
        if (orders.length > 0) {
            return (
                <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <OrderItem 
                            status={item.status - 1}
                            order={item}
                            onMore={() => this.getOrderDetailAPI(parseInt(item.id, 10))}
                            onExtraButton={() => this.statusUpdate(item)}
                        />
                    }
                />
            );
        }
        return <EmptyView emptyText='EMPTY ORDER LIST' />;
    }

    render() {
        const { dateContainer, dateTextStyle, leftContainer, } = styles;
        return (
            <Row style={{ flex: 1, }}>
                <View style={leftContainer}>
                    <TouchableOpacity 
                        style={dateContainer}
                        // onPress={() => this.setState({ visible: !this.state.visible })}
                        activeOpacity={1}
                    >
                        <Text style={dateTextStyle}>{this.state.endDate}</Text>
                    </TouchableOpacity>
                    {this.renderCalendar()}
                    <View style={{ marginTop: 10, }}>
                        {this.renderSelectItem()}
                    </View>
                </View>
                <View style={{ flex: 2, }}>
                    {this.renderOrderList()}
                </View>
                <OrderDetailPopup 
                    visible={this.state.isShowDetail}
                    data={this.state.orderDetail}
                    onClose={() => this.setState({ isShowDetail: false, })}
                    onCancel={() => this.updateAPI(this.state.orderDetail, 4)}
                    onConfirm={() => this.statusUpdate(this.state.orderDetail)}
                />
            </Row>
        );
    }
}

const styles = {
    dateContainer: {
        backgroundColor: 'white', 
        paddingVertical: 20, 
        alignItems: 'center', 
        margin: 10, 
        shadowOffset: { 
            width: 0,
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        borderRadius: 10,
    },
    dateTextStyle: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: ORANGE,
    },
    leftContainer: {
        flex: 1,
        backgroundColor: 'white',
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(OrderManagement);
