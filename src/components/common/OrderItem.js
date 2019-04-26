import React from 'react';
import { Text, View, Image, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { Row, } from './Row';
import { DARK_RED, GRAY, YELLOW, ORANGE, GREEN, BLUE, VIOLET, } from '../../colors';
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
                    extraButton: 'ACCEPT',
                },
                {
                    description: 'COOKING',
                    source: require('../../images/stew.png'),
                    color: BLUE,
                    extraButton: 'FINISH',
                },
                {
                    description: 'WAITING',
                    source: require('../../images/serve.png'),
                    color: VIOLET,
                    extraButton: 'PAY',
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
            ],
            iconHeaderSize: 24,
            iconDateSize: 14,
        };
    }

    renderButton() {
        const { edgeContainer, textButton, flexCenter, } = styles;
        return (
            <View style={edgeContainer}>
                <Button
                    containerStyle={{ ...flexCenter, backgroundColor: YELLOW, }}
                    textStyle={textButton}
                    onPress={this.props.onMore}
                >
                    MORE
                </Button>
                { this.renderExtraButton() }
            </View>
        );
    }

    renderExtraButton() {
        const { textButton, flexCenter, } = styles;
        if (this.state.data[this.props.status].extraButton) {
            return (
                <Button
                    containerStyle={{ ...flexCenter, backgroundColor: DARK_RED, }}
                    textStyle={textButton}
                    // onPress={() => console.log(this.state.data[this.props.status].extraButton)}
                    onPress={this.props.onExtraButton}
                >
                    {this.props.order.status === 3 && this.props.order.category === 'A' ? 'GRAB' : this.state.data[this.props.status].extraButton} 
                </Button>
            );
        }
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
        } = styles;
        const { data, iconDateSize, iconHeaderSize, } = this.state;
        const { 
            status,
            order,
        } = this.props;
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
                                    size={iconHeaderSize} 
                                />
                                <Text style={textTopic}>{order.id}</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='account-group' 
                                    type='material-community' 
                                    size={iconHeaderSize} 
                                />
                                <Text style={textTopic}>{order.queue_number}</Text>
                            </Row>
                        </Row>
                        <Row>
                            <Row style={{ alignItems: 'center', }}>
                                <Icon 
                                    name='calendar-clock' 
                                    type='material-community' 
                                    size={iconDateSize} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>{order.date}</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='clock-outline' 
                                    type='material-community' 
                                    size={iconDateSize} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>{order.time}</Text>
                            </Row>
                            <Row style={{ alignItems: 'center', marginLeft: 10, }}>
                                <Icon 
                                    name='account-outline' 
                                    type='material-community' 
                                    size={iconDateSize} 
                                    color={GRAY} 
                                />
                                <Text style={textTiny}>{order.customer_id}</Text>
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
                                <Text style={textMoney}>{order.total.toFixed(2)}.-</Text>
                            </Row>
                        </Row>
                    </View>
                    {this.renderButton()}
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
