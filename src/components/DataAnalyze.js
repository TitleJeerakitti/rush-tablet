import React from 'react';
import { View, UIManager, LayoutAnimation, Platform, Text, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import PureChart from 'react-native-pure-chart';
import moment from 'moment';
import { 
    SearchBar, 
    Row, 
    CardSection, 
    RankingState, 
    Center, 
    MenuRankingCard, 
    OrderItem, 
    RevenueCard, 
    LoadingImage 
} from './common';
import { SERVER, GET_REPORT, AUTH_HEADER, GET_ORDER_DETAIL } from '../config';
import { GRAY, ORANGE, } from '../colors';
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
        this._isMounted = false;
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
            loading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getReport() {
        try {
            this.renderAnimation();
            this.setState({ loading: true, });
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
            if (this._isMounted && response.status === 200) {
                this.renderAnimation();
                this.setState({
                    total: responseData.total,
                    top_menu: responseData.top_menu,
                    order: responseData.order,
                    summary: responseData.summary,
                    loading: false,
                });
            }
        } catch (err) {
            Alert.alert('Your network is unstable!');
            this.setState({ loading: false, });
        }
    }

    async getOrderDetailAPI(id) {
        try {
            const { token_type, access_token, } = this.props.token;
            const response = await fetch(`${SERVER}${GET_ORDER_DETAIL}?id=${id}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            if (this._isMounted && response.status === 200) {
                const resposneData = await response.json();
                this.setState({ 
                    orderDetail: resposneData, 
                    isShowDetail: true 
                });
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    selectStartDate() {
        if (this.state.status === 4) {
            return `${this.state.year}-01-01`;
        } else if (this.state.status === 3) {
            return `${this.state.year}-${this.state.month ? '0' : ''}${this.state.month}-01`;
        }
        return moment(this.state.start_date).format('YYYY-M-D');
    }

    changeDate(date) {
        if (this._isMounted) {
            this.setState({ 
                [this.state.select]: date, 
                select: null,
                total: undefined,
                top_menu: [],
                order: undefined,
                summary: undefined,
            });
            this.renderAnimation();
            this.closeDateTimePicker();
        }
    }

    closeDateTimePicker() {
        if (this._isMounted) {
            this.setState({ isDateTimePickerVisible: false, select: null, });
        }
    }

    openDateTimePicker(select) {
        if (this._isMounted) {
            this.setState({ isDateTimePickerVisible: true, select });
        }
    }

    createDataSets() {
        const result = this.state.total.reduce((arr, item) => {
            arr.push({
                x: item.timestamp,
                y: item.total,
            });
            return arr;
        }, []);
        return [
            {
            //   seriesName: 'series1',
              data: result,
              color: ORANGE
            }
        ];
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
                    {moment(this.selectStartDate()).format('MMM-YYYY')}
                    </Text>
                </Row>
            );
        }
        return (
            <Row style={{ alignItems: 'center', padding: 10, }}>
                <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                <Text style={{ marginLeft: 10 }}>
                    {moment(this.selectStartDate()).format('YYYY')}
                </Text>
            </Row>
        );
    }

    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderGraph() {
        if (this.state.total !== undefined && this.state.status > 1) {
            if (this.state.total.length > 0) {
                return (
                    <View style={{ flex: 1, }}>
                        <CardSection>
                            <Text style={{ fontWeight: 'bold' }}>CHART</Text>
                        </CardSection>
                        <View style={{ marginHorizontal: 10, marginTop: 5, padding: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 5, }}>
                                TOTAL REVENUE (THB)
                            </Text>
                            <PureChart 
                                data={this.createDataSets()} 
                                type='bar'
                            />
                        </View>
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

    renderLoading() {
        if (this.state.loading) {
            return <LoadingImage />;
        }
        return (
            <Row style={{ flex: 1, }}>
                <View style={{ flex: 2, ...styles.container, }}>
                    <CardSection>
                        <Text style={{ fontWeight: 'bold' }}>MENU RANKING</Text>
                    </CardSection>
                    { this.renderMenuRanking() }
                </View>
                <View style={{ flex: 3, ...styles.container, }}>
                    <CardSection>
                        <Text style={{ fontWeight: 'bold' }}>REVENUE</Text>
                    </CardSection>
                    {this.renderRevenue()}
                    {this.renderOrderHistory()}
                    {this.renderGraph()}
                </View>
            </Row>
        );
    }

    render() {
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
                        if (this._isMounted) {
                            this.renderAnimation();
                            this.setState({
                                status: value,
                                start_date: null,
                                end_date: null,
                                year: null,
                                month: null,
                                total: undefined,
                                top_menu: [],
                                order: undefined,
                                summary: undefined,
                            });
                        }
                    }} 
                    onPressStartDate={() => this.openDateTimePicker('start_date')}
                    onPressEndDate={() => this.openDateTimePicker('end_date')}
                    onConfirm={this.changeDate.bind(this)}
                    onCancel={() => this.closeDateTimePicker()}
                    onSearch={() => {
                        if (this.state.start_date !== null && this.state.status !== null) {
                            this.getReport();
                        }
                    }}

                    onYearChange={(value) => {
                        if (this._isMounted) {
                            this.renderAnimation();
                            this.setState({ 
                                year: value,
                                total: undefined,
                                top_menu: [],
                                order: undefined,
                                summary: undefined,
                            });
                        }
                    }}
                    year={this.state.year}
                    onMonthChange={(value) => {
                        if (this._isMounted) {
                            this.renderAnimation();
                            this.setState({ 
                                month: value,
                                total: undefined,
                                top_menu: [],
                                order: undefined,
                                summary: undefined,
                            });
                        }
                    }}
                    month={this.state.month}
                />
                {this.renderLoading()}
            </View>
        );
    }
}

const styles = {
    container: {
        marginHorizontal: 10, 
        backgroundColor: '#FFF', 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,
    }
};

const mapStateToProps = ({ auth, }) => {
    const { token } = auth;
    return { token };
};

export default connect(mapStateToProps)(DataAnalyze);
