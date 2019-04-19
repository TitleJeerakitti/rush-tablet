import React from 'react';
import { View, UIManager, LayoutAnimation, Platform, Text, FlatList, Image, } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { SearchBar, Row, CardSection, RankingState, Center, MenuRankingCard, Space } from './common';
import { SERVER, GET_REPORT, AUTH_HEADER } from '../config';
import { GRAY, LIGHT_GRAY, EGG, LIGHT_YELLOW } from '../colors';

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
            revenue: [],
            top_menu: [],
            order: [],
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
                    revenue: responseData.total,
                    top_menu: responseData.top_menu,
                    order: responseData.order,
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

    renderMenuRanking() {
        if (this.state.top_menu.length > 0) {
            return (<RankingState topMenu={this.state.top_menu} />);
        }
        return (
            <Center>
                <Text>NO DATA</Text>
            </Center>
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
                        <CardSection style={{ marginBottom: 5, }}>
                            <Text style={{ fontWeight: 'bold' }}>OTHERS</Text>
                        </CardSection>
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
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text>Test</Text>
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
