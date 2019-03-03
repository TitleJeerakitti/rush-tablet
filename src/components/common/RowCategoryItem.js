import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { YELLOW, } from '../../config';

const RowCategoryItem = ({ text, onPress, selected }) => {
    return (
        <TouchableOpacity 
            activeOpacity={1}
            style={{ 
                ...styles.containerStyle, 
                backgroundColor: selected ? '#FFF' : YELLOW, 
            }}
            onPress={onPress}
        >
            <Text style={{ color: selected ? '#000' : '#FFF' }} >{text}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        flex: 1, 
        padding: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        alignItems: 'center', 
        marginHorizontal: 0.5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    }
};

export { RowCategoryItem };
