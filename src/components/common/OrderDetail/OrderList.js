import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Icon } from 'react-native-elements';
import { Row } from '../Row';
import { DARK_RED, ORANGE, GREEN } from '../../../colors';

class OrderList extends React.Component {

    render() {
        const { name, amount, price, total, onDecrease, onIncrease, onClear } = this.props;
        const leftContent = (
            <View style={styles.containerClear} >
                <Icon 
                    name='ios-close-circle' 
                    type='ionicon' 
                    color='white'
                    containerStyle={styles.iconStyle} 
                />
            </View>
        );

        const rightButtons = [
            <TouchableOpacity 
                style={styles.containerDecrease} 
                activeOpacity={1}
                onPress={onDecrease}
            >
                <Icon 
                    name='ios-remove-circle' 
                    type='ionicon' 
                    color='white' 
                    containerStyle={styles.iconStyle} 
                />
            </TouchableOpacity>,
            <TouchableOpacity 
                style={styles.containerIncrease} 
                activeOpacity={1}
                onPress={onIncrease}
            >
                <Icon 
                    name='ios-add-circle' 
                    type='ionicon' 
                    color='white' 
                    containerStyle={styles.iconStyle} 
                />
            </TouchableOpacity>
        ];

        return (
            <Swipeable 
                leftContent={leftContent} 
                rightButtons={rightButtons}
                onLeftActionRelease={onClear}
                leftActionActivationDistance={200}
            >
                <Row style={styles.containerStyle}>
                    <Text style={{ flex: 2, ...styles.textStyle }} numberOfLines={1}>{name}</Text>
                    <Text style={{ flex: 1, ...styles.textStyle }} numberOfLines={1}>{amount}</Text>
                    <Text style={{ flex: 1, ...styles.textStyle }} numberOfLines={1}>{price}</Text>
                    <Text style={{ flex: 1, ...styles.textStyle }} numberOfLines={1}>{total}</Text>
                </Row>
            </Swipeable>
        );
    }
}

const styles = {
    containerClear: {
        flex: 1,
        backgroundColor: DARK_RED, 
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    containerDecrease: {
        flex: 1,
        backgroundColor: ORANGE,
        justifyContent: 'center',
    },
    containerIncrease: {
        flex: 1,
        backgroundColor: GREEN,
        justifyContent: 'center',
    },
    containerStyle: {
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    iconStyle: {
        width: 75,
    },
    textStyle: {
        padding: 10, 
        textAlign: 'center',
    }
};

export { OrderList };
