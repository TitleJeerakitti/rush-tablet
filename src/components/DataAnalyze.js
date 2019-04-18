import React from 'react'
import { View, Text, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Row } from './common';
import { BLACK_PINK, PINK, ORANGE, YELLOW, BLACK_RED, DARK_RED, DARK_ORANGE } from '../colors';

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
            start_date: 'START DATE',
            end_date: 'END DATE',
            isDateTimePickerVisible: false,
            select: null,
        };
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

    render() {
        return (
            <View style={{ flex: 1, }}>
                <LinearGradient
                    colors={[ORANGE, YELLOW]}
                    start={{ x: 0.0, y: 0.5 }} 
                    end={{ x: 0.8, y: 0.7 }}
                    style={{ margin: 10, borderRadius: 10 }}
                >
                    <Row>
                        <RNPickerSelect
                            placeholder={placeholder}
                            items={CHOICE}
                            onValueChange={value => {
                                this.setState({
                                    status: value,
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.status}
                            Icon={() => <Icon name='chevron-down-circle-outline' type='material-community' color={ORANGE} />}
                        />
                        <Row style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center' }}>
                            <TouchableOpacity 
                                style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#FFF', borderRadius: 5, flexDirection: 'row', alignItems: 'center', width: 250, }}
                                onPress={() => this.openDateTimePicker('start_date')}
                            >
                                <Icon name='ios-calendar' type='ionicon' />
                                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', marginLeft: 10, textAlign: 'center' }}>{this.state.start_date === 'START DATE' ? this.state.start_date : this.state.start_date.toDateString()}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', paddingHorizontal: 20, }}>TO</Text>
                            <TouchableOpacity 
                                style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#FFF', borderRadius: 5, flexDirection: 'row', alignItems: 'center', width: 250, }}
                                onPress={() => this.openDateTimePicker('end_date')}
                            >
                                <Icon name='ios-calendar' type='ionicon' />
                                <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', marginLeft: 10, textAlign: 'center' }}>{this.state.end_date === 'END DATE' ? this.state.end_date : this.state.end_date.toDateString()}</Text>
                            </TouchableOpacity>
                        </Row>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.changeDate.bind(this)}
                            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                            minimumDate={this.state.start_date === 'START DATE' ? undefined : this.state.start_date} // bug
                            maximumDate={this.state.end_date === 'END DATE' ? new Date() : this.state.end_date} // bug
                            date={(this.state[this.state.select] === undefined || (this.state[this.state.select] === 'START DATE') || (this.state[this.state.select] === 'END DATE')) ?
                                new Date() : this.state[this.state.select]}
                        />
                        <TouchableOpacity 
                            style={{ backgroundColor: ORANGE, paddingVertical: 10, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}
                            // onPress={() => this.setState({ isDateTimePickerVisible: true, })}
                        >
                            <Icon name='ios-search' type='ionicon' color='white' size={32} />
                        </TouchableOpacity>
                    </Row>
                </LinearGradient>
            </View>
        );
    }
}

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
    inputAndroid: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        color: 'white',
        paddingRight: 40, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: '#CCC'
    },
    iconContainer: {
        top: 20,
        right: 12, 
    }
});

// const mapStateToProps = ({ restaurant, auth, }) => {
//     const { userInfo } = restaurant;
// };

export default connect()(DataAnalyze);
