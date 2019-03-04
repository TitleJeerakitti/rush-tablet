import React from 'react';
import { Text, View, Image, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { Row, } from './Row';
import { DARK_RED, GRAY, YELLOW, ORANGE, GREEN, BLUE, VIOLET, } from '../../config';
import { Button } from './Button';

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    description: 'PENDING',
                    source: require('../../images/order-food.png'),
                    color: ORANGE,
                },
                {
                    description: 'COOKING',
                    source: require('../../images/stew.png'),
                    color: BLUE,
                },
                {
                    description: 'WAITING',
                    source: require('../../images/serve.png'),
                    color: VIOLET,
                },
                {
                    description: 'CANCEL',
                    source: require('../../images/cancel.png'),
                    color: GRAY,
                },
                {
                    description: 'DONE!',
                    source: require('../../images/sold.png'),
                    color: GREEN,
                },
                {
                    description: 'TIMEOUT',
                    source: require('../../images/warning.png'),
                    color: '#000',
                },
            ]
        };
    }

    render() {
        const { 
            container, 
            edgeContainer, 
            statusText, 
            detailContainer, 
            textTopic, 
            textTiny, 
            textMoney,
            textButton,
            flexCenter,
        } = styles;
        const { data, } = this.state;
        const { status, } = this.props;
        return (
            <View style={container}>
                <Row style={{ borderRadius: 10, overflow: 'hidden', }}>
                    <View style={{ ...edgeContainer, backgroundColor: data[status].color, }}>
                        <Image 
                            source={data[status].source}
                            style={{ width: 40, height: 40, }} 
                        />
                        <Text style={statusText} numberOfLines={1}>{data[status].description}</Text>
                    </View>
                    <View style={detailContainer}>
                        <Row>
                            <Row style={{ alignItems: 'center', }}>
                                <Icon 
                                    name='clipboard-text-outline' 
                                    type='material-community' 
                                    size={24} 
                                />
                                <Text style={textTopic}>12345678</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='account-group' 
                                    type='material-community' 
                                    size={24} 
                                />
                                <Text style={textTopic}>A 001</Text>
                            </Row>
                        </Row>
                        <Row>
                            <Row style={{ alignItems: 'center', }}>
                                <Icon 
                                    name='calendar-clock' 
                                    type='material-community' 
                                    size={14} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>09-09-2018</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='clock-outline' 
                                    type='material-community' 
                                    size={14} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>12:00 PM</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='account-outline' 
                                    type='material-community' 
                                    size={14} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>00001234</Text>
                            </Row>
                        </Row>
                        <Row style={{ marginTop: 5, }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Icon 
                                    name='money' 
                                    type='font-awesome' 
                                    size={18} 
                                    color={DARK_RED} 
                                />
                                <Text style={textMoney}>1240.00.-</Text>
                            </Row>
                        </Row>
                    </View>
                    <View style={edgeContainer}>
                        <Button
                            containerStyle={{ ...flexCenter, backgroundColor: YELLOW, }}
                            textStyle={textButton}
                        >
                            See More
                        </Button>
                        <Button
                            containerStyle={{ ...flexCenter, backgroundColor: DARK_RED, }}
                            textStyle={textButton}
                        >
                            Cancel
                        </Button>
                    </View>
                </Row>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 10, 
        marginHorizontal: 10, 
        backgroundColor: 'white', 
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    edgeContainer: {
        width: 86.5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        color: 'white', 
        textAlign: 'center', 
        fontSize: 12, 
        fontWeight: 'bold', 
        marginTop: 5,
    },
    detailContainer: {
        flex: 1, 
        padding: 10,
    },
    textTopic: {
        fontWeight: 'bold', 
        marginLeft: 5,
    },
    textTiny: {
        marginLeft: 5, 
        color: GRAY, 
        fontSize: 10,
    },
    textMoney: {
        marginLeft: 10, 
        color: DARK_RED, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    textButton: {
        color: 'white', 
        textAlign: 'center', 
        fontWeight: 'bold',
    },
    flexCenter: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export { OrderItem };
