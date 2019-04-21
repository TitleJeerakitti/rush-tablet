import React from 'react';
import { View, UIManager, LayoutAnimation, Platform, Text, FlatList, Image, } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { SearchBar, Row, CardSection, RankingState, Center, MenuRankingCard, Space, OrderItem, RevenueCard } from './common';
import { SERVER, GET_REPORT, AUTH_HEADER, GET_ORDER_DETAIL } from '../config';
import { GRAY, LIGHT_GRAY, EGG, LIGHT_YELLOW, ORANGE } from '../colors';
import { OrderDetailPopup } from './common/Popup';

const CHOICE = [
    {
        label: 'DATE',
        value: 1,
    },
    {
        label: 'DATE RANGE',
        value: 2,
    },
    {
        label: 'MONTH',
        value: 3,
    },
    {
        label: 'YEAR',
        value: 4,
    }
];

const placeholder = {
    label: 'Select...',
    value: null,
    color: '#9EA0A4',
};

class DataAnalyze extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            start_date: null,
            end_date: null,
            isDateTimePickerVisible: false,
            select: null,
            month: null,
            year: null,
            total: undefined,
            top_menu: [],
            order: undefined,
            summary: undefined,
            orderDetail: {},
            isShowDetail: false,
        };
    }

    async getReport() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${GET_REPORT}`, {
                method: 'POST',
                headers: AUTH_HEADER(token_type, access_token),
                body: JSON.stringify({
                    status: this.state.status,
                    start_date: this.selectStartDate(),
                    end_date: moment(this.state.end_date).format('YYYY-M-D'),
                }),
            });
            const responseData = await response.json();
            // console.log(responseData);
            if (response.status === 200) {
                this.setState({
                    total: responseData.total,
                    top_menu: responseData.top_menu,
                    order: responseData.order,
                    summary: responseData.summary,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getOrderDetailAPI(id) {
        try {
            const { token_type, access_token, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_ORDER_DETAIL}?id=${id}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            if (response.status === 200) {
                const resposneData = await response.json();
                this.setState({ 
                    orderDetail: resposneData, 
                    isShowDetail: true 
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    selectStartDate() {
        if (this.state.status === 4) {
            return `${this.state.year}-01-01`;
        } else if (this.state.status === 3) {
            return `${this.state.year}-${this.state.month}-01`;
        }
        return moment(this.state.start_date).format('YYYY-M-D');
    }

    changeDate(date) {
        this.setState({ [this.state.select]: date, select: null });
        this.closeDateTimePicker();
    }

    closeDateTimePicker() {
        this.setState({ isDateTimePickerVisible: false, select: null, });
    }

    openDateTimePicker(select) {
        this.setState({ isDateTimePickerVisible: true, select });
    }

    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderOtherMenu() {
        if (this.state.top_menu.length > 3) {
            return (
                <FlatList 
                    data={this.state.top_menu.slice(3)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => 
                        <MenuRankingCard 
                            name={item.name}
                            amount={item.amount}
                            rank={index + 4}
                            image={item.image}
                        />
                    }
                    ListFooterComponent={() => <View style={{ marginTop: 10, }} />}
                />
            );
        }
        return (
            <Center>
                <Text>NO DATA</Text>
            </Center>
        );
    }

    renderMenuRanking() {
        if (this.state.top_menu.length > 0) {
            return (
                <View style={{ flex: 1, }}>
                    <RankingState topMenu={this.state.top_menu} />
                    <CardSection style={{ marginBottom: 5, }}>
                        <Text style={{ fontWeight: 'bold' }}>OTHERS</Text>
                    </CardSection>
                    {this.renderOtherMenu()}
                </View>
            );
        }
        return (
            <Center>
                <Text>NO DATA</Text>
            </Center>
        );
    }

    renderOrderHistory() {
        if (this.state.order !== undefined && this.state.status === 1) {
            if (this.state.order.length > 0) {
                return (
                    <View style={{ flex: 1, }}>
                        <CardSection>
                            <Text style={{ fontWeight: 'bold' }}>ORDER HISTORY</Text>
                        </CardSection>
                        <FlatList 
                            data={this.state.order}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => 
                                <OrderItem
                                    status={item.status - 1}
                                    order={item}
                                    onMore={() => this.getOrderDetailAPI(parseInt(item.id, 10))}
                                />
                            }
                            ListFooterComponent={() => <View style={{ marginTop: 10, }} />}
                        />
                        <OrderDetailPopup
                            visible={this.state.isShowDetail}
                            data={this.state.orderDetail}
                            onClose={() => this.setState({ 
                                isShowDetail: false, 
                            })}
                        />
                    </View>
                );
            }
            return (
                <View style={{ flex: 1, }}>
                    <CardSection>
                        <Text style={{ fontWeight: 'bold' }}>ORDER HISTORY</Text>
                    </CardSection>
                    <Center>
                        <Text>NO DATA</Text>
                    </Center>
                </View>
            );
        }
    }

    renderRevenue() {
        if (this.state.summary !== undefined) {
            return (
                <RevenueCard
                    total={this.state.summary.total}
                    totalOrder={this.state.summary.total_order}
                    orderSuccess={this.state.summary.order_success}
                    orderFail={this.state.summary.order_fail}
                >
                    {this.renderRevenueContent(this.state.status)}
                </RevenueCard>
            );
        }
        return (
            <Center>
                <Text>NO DATA</Text>
            </Center>
        );
    }

    renderRevenueContent(status) {
        if (status === 1) {
            return (
                <Row style={{ alignItems: 'center', padding: 10, }}>
                    <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                    <Text style={{ marginLeft: 10 }}>
                        {moment(this.state.start_date).format('DD-MMM-YYYY')}
                    </Text>
                </Row>
            );
        } else if (status === 2) {
            return (
                <Row style={{ alignItems: 'center', padding: 10, }}>
                    <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                    <Text style={{ marginLeft: 10 }}>
                        {moment(this.state.start_date).format('DD-MMM-YYYY')}
                    </Text>
                    <Text style={{ marginHorizontal: 10, }}>to</Text>
                    <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                    <Text style={{ marginLeft: 10 }}>
                        {moment(this.state.end_date).format('DD-MMM-YYYY')}
                    </Text>
                </Row>
            );
        } else if (status === 3) {
            return (
                <Row style={{ alignItems: 'center', padding: 10, }}>
                    <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                    <Text style={{ marginLeft: 10 }}>
                        {moment(this.state.start_date).format('MMM-YYYY')}
                    </Text>
                </Row>
            );
        }
        return (
            <Row style={{ alignItems: 'center', padding: 10, }}>
                <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                <Text style={{ marginLeft: 10 }}>
                    {moment(this.state.start_date).format('YYYY')}
                </Text>
            </Row>
        );
    }

    createLabelList() {
        const result = this.state.total.reduce((arr, item) => {
            arr.push(item.timestamp);
            return arr;
        }, []);
        return result;
    }

    createDataSets() {
        const result = this.state.total.reduce((arr, item) => {
            arr.push(item.total);
            return arr;
        }, []);
        return result;
    }

    renderGraph() {
        if (this.state.total !== undefined && this.state.status > 1) {
            if (this.state.total.length > 0) {
                return (
                    <View style={{ flex: 1, }}>
                        <CardSection>
                            <Text style={{ fontWeight: 'bold' }}>CHART</Text>
                        </CardSection>
                        <LineChart
                            data={{
                                labels: this.createLabelList(),
                                datasets: [{
                                    data: this.createDataSets()
                                }]
                            }}
                            width={500} // from react-native
                            height={220}
                            // yAxisLabel={'THB'}
                            chartConfig={{
                                backgroundColor: '#e26a00',
                                backgroundGradientFrom: '#fb8c00',
                                backgroundGradientTo: '#ffa726',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                // style: {
                                //     borderRadius: 10,
                                //     padding: 20,
                                // }
                            }}
                            bezier
                            style={{
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                        />
                    </View>
                );
            }
            return (
                <View style={{ flex: 1, }}>
                    <CardSection>
                        <Text style={{ fontWeight: 'bold' }}>CHART</Text>
                    </CardSection>
                    <Center>
                        <Text>NO DATA</Text>
                    </Center>
                </View>
            );
        }
    }

    render() {
        console.log('render')
        return (
            <View style={{ flex: 1, }}>
                <SearchBar 
                    placeholder={placeholder}
                    choice={CHOICE}
                    status={this.state.status} 
                    start_date={this.state.start_date} 
                    end_date={this.state.end_date} 
                    isDateTimePickerVisible={this.state.isDateTimePickerVisible} 
                    select={this.state.select} 
                    onValueChange={value => {
                        this.renderAnimation();
                        this.setState({
                            status: value,
                        });
                    }} 
                    onPressStartDate={() => this.openDateTimePicker('start_date')}
                    onPressEndDate={() => this.openDateTimePicker('end_date')}
                    onConfirm={this.changeDate.bind(this)}
                    onCancel={() => this.closeDateTimePicker()}
                    onSearch={() => this.getReport()}

                    onYearChange={(value) => this.setState({ year: value })}
                    year={this.state.year}
                    onMonthChange={(value) => this.setState({ month: value })}
                    month={this.state.month}
                />
                <Row style={{ flex: 1, }}>
                    <View style={{ flex: 2, marginHorizontal: 10, backgroundColor: '#FFF', borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
                        <CardSection>
                            <Text style={{ fontWeight: 'bold' }}>MENU RANKING</Text>
                        </CardSection>
                        { this.renderMenuRanking() }
                    </View>
                    <View style={{ flex: 3, marginHorizontal: 10, backgroundColor: '#FFF', borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
                        <CardSection>
                            <Text style={{ fontWeight: 'bold' }}>REVENUE</Text>
                        </CardSection>
                        {this.renderRevenue()}
                        {this.renderOrderHistory()}
                        {this.renderGraph()}
                    </View>
                </Row>
            </View>
        );
    }
}

const mapStateToProps = ({ auth, }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(DataAnalyze);
