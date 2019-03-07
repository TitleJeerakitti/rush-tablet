import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Row, SeleteItem, OrderItem, } from './common';
import { ORANGE, DARK_ORANGE, DARK_RED, } from '../colors';

const config = {
    data: [
        {
            status: 'Online Order',
            url: 'online_order',
            iconName: 'cellphone-link',
            iconType: 'material-community',
        },
        {
            status: 'Walk-In Order',
            url: 'walkin_order',
            iconName: 'restaurant-menu',
            iconType: 'material',
        },
        {
            status: 'In Progress',
            url: 'inprogress_order',
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
            currentType: config.data[0].status,
            orders: [],
        };
    }

    componentWillMount() {
        this.getOrderAPI(config.data[0].url);
    }

    async getOrderAPI(url) {
        try {
            const response = await fetch(`http://localhost:3000/${url}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                }
            });
            const resposneData = await response.json();
            await this.setState({ orders: resposneData });
        } catch (error) {
            console.log(error);
        }
    }

    changeType(type, url) {
        if (this.state.currentType !== type) {
            this.getOrderAPI(url);
            this.setState({ currentType: type });
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

    renderSelectItem() {
        return config.data.map((value, index) => 
            <SeleteItem 
                key={index}
                iconName={value.iconName}
                iconType={value.iconType}
                text={value.status}
                selected={this.state.currentType === value.status}
                onPress={() => this.changeType(value.status, value.url)}
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
        if (this.state.orders.length > 0) {
            return this.state.orders.map((order) => 
                <OrderItem 
                    key={order.order_id}
                    status={order.status - 1}
                    order={order}
                />
            );
        }
    }

    render() {
        const { dateContainer, dateTextStyle, leftContainer, } = styles;
        return (
            <Row style={{ flex: 1, }}>
                <View style={leftContainer}>
                    <TouchableOpacity 
                        style={dateContainer}
                        onPress={() => this.setState({ visible: !this.state.visible })}
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
                    <ScrollView style={{ flex: 1 }}>
                        {this.renderOrderList()}
                    </ScrollView>
                </View>
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

export default OrderManagement;
