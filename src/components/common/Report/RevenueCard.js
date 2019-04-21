import React from 'react';
import { View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';
import { GRAY, ORANGE, DARK_RED, BLACK_PINK } from '../../../colors';
import { Row } from '../Row';

const RevenueCard = ({ children, total, totalOrder, orderSuccess, orderFail }) => {
    return (
        <View style={styles.container}>
            {children}
            <Row style={styles.revenueContainer}>
                <Text style={{ fontWeight: 'bold', flex: 1, fontSize: 20, }}>
                    REVENUE
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, }}>
                    {total.toFixed(2)} THB
                </Text>
            </Row>
            <Row style={styles.cardSection}>
                <Row style={styles.orderDetail}>
                    <Icon 
                        name='food' 
                        type='material-community' 
                        color='#FFF'
                        containerStyle={{ 
                            ...styles.iconContainer, 
                            backgroundColor: BLACK_PINK, 
                        }}
                    />
                    <View style={styles.orderDetailCard}>
                        <Text style={{ fontWeight: 'bold', }}>
                            Total Order
                        </Text>
                        <Row style={{ alignItems: 'center' }}>
                            <Text style={{ color: GRAY, marginRight: 5, }}>
                                {totalOrder}
                            </Text>
                            <Icon 
                                name='restaurant-menu' 
                                type='material' 
                                size={16} 
                                color={GRAY} 
                            /> 
                        </Row>
                    </View>
                </Row>
                <Row style={styles.orderDetail}>
                    <Icon 
                        name='clipboard-check' 
                        type='material-community' 
                        color='#FFF'
                        containerStyle={{ 
                            ...styles.iconContainer, 
                            backgroundColor: ORANGE, 
                        }}
                    />
                    <View style={styles.orderDetailCard}>
                        <Text style={{ fontWeight: 'bold', }}>
                            Success Order
                        </Text>
                        <Row style={{ alignItems: 'center' }}>
                            <Text style={{ color: GRAY, marginRight: 5, }}>
                                {orderSuccess}
                            </Text>
                            <Icon 
                                name='restaurant-menu' 
                                type='material' 
                                size={16} 
                                color={GRAY} 
                            /> 
                        </Row>
                    </View>
                </Row>
                <Row style={styles.orderDetail}>
                    <Icon 
                        name='clipboard-alert' 
                        type='material-community' 
                        color='#FFF'
                        containerStyle={{ 
                            ...styles.iconContainer, 
                            backgroundColor: DARK_RED, 
                        }}
                    />
                    <View style={styles.orderDetailCard}>
                        <Text style={{ fontWeight: 'bold', }}>
                            Failed Order
                        </Text>
                        <Row style={{ alignItems: 'center' }}>
                            <Text style={{ color: GRAY, marginRight: 5, }}>
                                {orderFail}
                            </Text>
                            <Icon 
                                name='restaurant-menu' 
                                type='material' 
                                size={16} 
                                color={GRAY} 
                            /> 
                        </Row>
                    </View>
                </Row>
            </Row>
        </View>
    );
};

const styles = {
    container: { 
        backgroundColor: '#FFF', 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        margin: 10, 
        borderRadius: 10, 
    },
    cardSection: {
        alignItems: 'center', 
        padding: 10,
    },
    iconContainer: { 
        width: 40,
        height: 40,
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    revenueContainer: { 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#F0F0F0' 
    },
    orderDetail: { 
        flex: 1, 
        justifyContent: 'center' 
    },
    orderDetailCard: {
        marginLeft: 10, 
        justifyContent: 'center'
    }
};

export { RevenueCard };
