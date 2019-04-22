import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, } from 'react-native';
import { LinearGradient } from 'expo';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row } from './Row';
import { YELLOW, ORANGE, GRAY, } from '../../colors';

const MONTH = [
    {
        label: 'January',
        value: 1,
    },
    {
        label: 'February',
        value: 2,
    },
    {
        label: 'March',
        value: 3,
    },
    {
        label: 'April',
        value: 4,
    },
    {
        label: 'May',
        value: 5,
    },
    {
        label: 'June',
        value: 6,
    },
    {
        label: 'July',
        value: 7,
    },
    {
        label: 'August',
        value: 8,
    },
    {
        label: 'September',
        value: 9,
    },
    {
        label: 'October',
        value: 10,
    },
    {
        label: 'November',
        value: 11,
    },
    {
        label: 'December',
        value: 12,
    }
];

class SearchBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            years: this.getYearOverall(),
            months: this.getMonthOverall(),
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year && this._isMounted) {
            this.setState({ months: this.getMonthOverall() });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getYearOverall(arr = []) {
        const yearStart = moment(this.props.userInfo.timestamp).format('YYYY');
        const yearNow = moment(new Date()).format('YYYY');
        const num = yearNow - yearStart;
        for (let i = num; i >= 0; i--) {
            const temp = parseInt(yearStart, 10) + i;
            arr.push({
                label: `${temp}`,
                value: temp,
            });
        }
        return arr;
    }

    getMonthOverall() {
        const yearStart = moment(this.props.userInfo.timestamp).format('YYYY');
        const yearNow = moment(new Date()).format('YYYY');
        const monthStart = moment(this.props.userInfo.timestamp).format('M');
        const monthNow = moment(new Date()).format('M');
        const year = this.props.year !== null ? this.props.year.toString() : null;
        if (year === yearStart && year === yearNow) {
            const num = monthNow - monthStart;
            const arr = this.monthList(monthStart, num);
            return arr;
        } else if (year === yearStart) {
            const num = 12 - monthStart;
            const arr = this.monthList(monthStart, num);
            return arr;
        } else if (year === yearNow) {
            const num = monthNow - 1;
            const arr = this.monthList(1, num);
            return arr;
        } else if (year !== null) {
            return MONTH;
        }
        return [];
    }

    monthList(start, num) {
        const arr = [];
        for (let i = 0; i <= num; i++) {
            arr.push(MONTH[(parseInt(start, 10) + i) - 1]);
        }
        return arr;
    }

    renderDate(date) {
        return moment(date).format('DD MMM YYYY');
    }

    renderDatePicker(...content) {
        const { key, text, onPress } = content[0];
        return (
            <TouchableOpacity 
                style={styles.datePickerContainer}
                onPress={onPress}
            >
                <Icon name='ios-calendar' type='ionicon' color={GRAY} />
                <Text 
                    style={{ 
                        ...styles.datePickerText, 
                        color: key === null ? '#CCC' : '#000' 
                    }}
                >
                    {key === null ? text : this.renderDate(key)}
                </Text>
            </TouchableOpacity>
        );
    }

    renderPicker(...content) {
        const { placeholder, items, onValueChange, value } = content[0];
        return (
            <RNPickerSelect
                placeholder={{
                    label: placeholder,
                    value: null,
                    color: '#9EA0A4',
                }}
                items={items}
                onValueChange={onValueChange}
                style={pickerDateStyles}
                value={value}
            />
        );
    }

    renderContent() {
        const { status, } = this.props;
        if (status === 1) {
            return this.renderDatePicker({
                key: this.props.start_date,
                text: 'START DATE',
                onPress: this.props.onPressStartDate,
            });
        } else if (status === 2) {
            return (
                <Row>
                    {this.renderDatePicker({
                        key: this.props.start_date,
                        text: 'START DATE',
                        onPress: this.props.onPressStartDate,
                    })}
                    <Text style={styles.separateText}>TO</Text>
                    {this.renderDatePicker({
                        key: this.props.end_date,
                        text: 'END DATE',
                        onPress: this.props.onPressEndDate,
                    })}
                </Row>
            );
        } else if (status === 3) {
            return (
                <Row>
                    {this.renderPicker({
                        placeholder: 'YEAR',
                        items: this.state.years,
                        onValueChange: this.props.onYearChange,
                        value: this.props.year
                    })}
                    <Text style={styles.separateText}>THEN</Text>
                    {this.renderPicker({
                        placeholder: 'MONTH',
                        items: this.state.months,
                        onValueChange: this.props.onMonthChange,
                        value: this.props.month
                    })}
                </Row>
            );
        } else if (status === 4) {
            return (
                <Row>
                    {this.renderPicker({
                        placeholder: 'YEAR',
                        items: this.state.years,
                        onValueChange: this.props.onYearChange,
                        value: this.props.year
                    })}
                </Row>
            );
        }
        return (
            <Text style={{ fontSize: 24, color: '#FFF', fontWeight: 'bold' }}>
                Joined on {this.renderDate(this.props.userInfo.timestamp)}
            </Text>
        );
    }

    render() {
        const { 
            placeholder,
            choice,
            status, 
            start_date, 
            end_date, 
            isDateTimePickerVisible, 
            select, 
            onValueChange,
            onConfirm,
            onCancel,
            onSearch,
        } = this.props;
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={[ORANGE, YELLOW]}
                    start={{ x: 0.0, y: 0.5 }} 
                    end={{ x: 0.8, y: 0.7 }}
                    style={{ borderRadius: 10, overflow: 'hidden' }}
                >
                    <Row>
                        <RNPickerSelect
                            placeholder={placeholder}
                            items={choice}
                            onValueChange={onValueChange}
                            style={pickerSelectStyles}
                            value={status}
                            Icon={() => 
                                <Icon 
                                    name='chevron-down-circle-outline' 
                                    type='material-community' 
                                    color={ORANGE} 
                                />
                            }
                        />
                        <Row style={styles.inputContainer}>
                            {this.renderContent()}
                        </Row>
                        <DateTimePicker
                            isVisible={isDateTimePickerVisible}
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            minimumDate={
                                start_date === null || select === 'start_date' ? 
                                    new Date(this.props.userInfo.timestamp) : start_date
                            }
                            maximumDate={end_date === null || select === 'end_date' ? new Date() : end_date}
                            date={(this.props[select] === undefined || this.props[select] === null) ?
                                new Date() : this.props[select]}
                        />
                        <TouchableOpacity 
                            style={styles.searchContainer}
                            onPress={onSearch}
                        >
                            <Icon name='ios-search' type='ionicon' color='white' size={32} />
                        </TouchableOpacity>
                    </Row>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        margin: 10, 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    inputContainer: {
        flex: 1, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        alignItems: 'center'
    },
    searchContainer: {
        backgroundColor: ORANGE, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    datePickerContainer: {
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        backgroundColor: '#FFF', 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        width: 250,
    },
    datePickerText: { 
        flex: 1, 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginLeft: 10, 
        textAlign: 'center' 
    },
    separateText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: 'white', 
        paddingHorizontal: 20,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 18,
        paddingHorizontal: 12,
        color: ORANGE,
        paddingRight: 32, // to ensure the text is never behind the icon
        textAlign: 'center',
        backgroundColor: '#FFF',
        width: 200,
    },
    inputAndroid: this.inputIOS,
    placeholder: {
        color: '#CCC'
    },
    iconContainer: {
        top: 20,
        right: 12, 
    }
});

const pickerDateStyles = StyleSheet.create({
    inputIOS: { ...styles.datePickerContainer,
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    inputAndroid: styles.datePickerContainer,
    placeholder: {
        color: '#CCC'
    },
});

const mapStateToProps = ({ auth }) => {
    const { userInfo } = auth;
    return { userInfo };
};

const SearchBar = connect(mapStateToProps)(SearchBarComponent);
export { SearchBar };
