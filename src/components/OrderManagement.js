import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { Row, SeleteItem, } from './common';
import { ORANGE, DARK_ORANGE, DARK_RED, YELLOW, GRAY, LIGHT_GRAY } from '../config';

const config = {
    online: 'Online',
    walkIn: 'WalkIn',
    inProgress: 'InProgress',
};

class OrderManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            endDate: this.formatDate(new Date()),
            startDate: this.formatDate(new Date()),
            currentType: config.online,
        };
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
                        <SeleteItem 
                            iconName='cellphone-link'
                            iconType='material-community'
                            text='Online Order'
                            selected={this.state.currentType === config.online}
                            onPress={() => this.setState({ currentType: config.online })}
                        />
                        <SeleteItem 
                            iconName='restaurant-menu'
                            iconType='material'
                            text='Walk-In Order'
                            selected={this.state.currentType === config.walkIn}
                            onPress={() => this.setState({ currentType: config.walkIn })}
                        />
                        <SeleteItem 
                            iconName='calendar-clock'
                            iconType='material-community'
                            text='In Progress'
                            selected={this.state.currentType === config.inProgress}
                            onPress={() => this.setState({ currentType: config.inProgress })}
                        />
                    </View>
                </View>
                <View style={{ flex: 2, }}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ marginTop: 10, marginHorizontal: 10, backgroundColor: 'white', borderRadius: 10 }}>
                            <Row>
                                <View style={{ padding: 10, backgroundColor: DARK_RED, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: 100, }}>
                                    <Icon name='home' color='white' size={30} />
                                    <Text style={{ color: 'white', textAlign: 'center', }} numberOfLines={1}>Payment</Text>
                                </View>
                                <View style={{ flex: 1, padding: 10, }}>
                                    <Row>
                                        <Row style={{ alignItems: 'center' }}>
                                            <Icon name='basket' type='material-community' />
                                            <Text>12345678</Text>
                                        </Row>
                                        <Row style={{ alignItems: 'center' }}>
                                            <Icon name='account-group' type='material-community' />
                                            <Text>A 001</Text>
                                        </Row>
                                    </Row>
                                    
                                </View>
                            </Row>
                        </View>
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
