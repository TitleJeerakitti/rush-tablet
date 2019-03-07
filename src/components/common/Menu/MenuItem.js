import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row } from '../Row';
import { DARK_RED } from '../../../colors';

const MenuItem = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
            <Row>
                <Text style={styles.textStyle} numberOfLines={1}>{children}</Text>
                <Icon name='ios-add-circle' type='ionicon' color={DARK_RED} size={30} />
            </Row>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        flex: 1, 
        margin: 10, 
        justifyContent: 'center', 
        padding: 10, 
        backgroundColor: '#FFF', 
        shadowOffset: { 
            width: 0, 
            height: 0 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        borderRadius: 20, 
        elevation: 5,
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center',
    }
};

export { MenuItem };
