import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { Row } from '../Row';
import { LIGHT_RED, BLACK_RED } from '../../../colors';

const MenuNumItem = ({ number, text, selected, onPress }) => {
    return (
        <TouchableOpacity 
            style={{ 
                ...styles.container, 
                backgroundColor: selected ? LIGHT_RED : '#FFF',
            }}
        >
            <Row style={styles.overflow}>
                <View style={styles.numberContainer}>
                    <Text style={styles.numberStyle}>{number}</Text>
                </View>
                <Text 
                    style={{ 
                        ...styles.textStyle, 
                        color: selected ? '#FFF' : '#000', 
                    }} 
                    numberOfLines={1}
                >
                    {text}
                </Text>
                <Icon 
                    name='settings' 
                    containerStyle={{ padding: 10, }} 
                    onPress={onPress} 
                    color={selected ? '#FFF' : '#000'}
                />
            </Row>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        marginHorizontal: 10, 
        marginTop: 10,
        borderRadius: 10, 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
    },
    overflow: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    numberContainer: {
        backgroundColor: BLACK_RED, 
        padding: 10, 
        width: 45,
    },
    numberStyle: {
        color: 'white', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 20,
    },
    textStyle: { 
        padding: 10, 
        flex: 1, 
        fontSize: 16, 
    },
};

export { MenuNumItem };
