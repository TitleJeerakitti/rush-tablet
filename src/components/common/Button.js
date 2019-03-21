import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';

const Button = ({ children, onPress, containerStyle, textStyle, hideOpacity }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={containerStyle} 
            activeOpacity={hideOpacity ? 1 : 0}
        >
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

export { Button };
