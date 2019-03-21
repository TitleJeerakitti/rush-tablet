import React from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { Row } from '../Row';

const MenuNumItem = ({ number, text, selected, onPress, color, onIconPress, }) => {
    return (
        <TouchableOpacity 
            style={{ 
                ...styles.container, 
                backgroundColor: selected ? color : '#FFF',
            }}
            activeOpacity={1}
            onPress={onPress}
        >
            <Row style={styles.overflow}>
                <View 
                    style={{ 
                        ...styles.numberContainer, 
                        backgroundColor: color, 
                    }}
                >
                    <Text style={styles.numberStyle}>{number}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text 
                        style={{ 
                            ...styles.textStyle,
                            fontWeight: selected ? 'bold' : 'normal',
                            color: selected ? '#FFF' : '#000', 
                        }} 
                        numberOfLines={1}
                    >
                        {text}
                    </Text>
                </View>
                <Icon 
                    name='settings' 
                    containerStyle={{ padding: 10, }} 
                    onPress={onIconPress} 
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
        padding: 10, 
        width: 45,
    },
    numberStyle: {
        color: 'white', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 20,
    },
    textContainer: { 
        padding: 10, 
        flex: 1, 
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 16,
    },
};

export { MenuNumItem };
