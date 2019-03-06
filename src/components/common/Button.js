import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';

const Button = ({ children, onPress, containerStyle, textStyle, }) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

export { Button };
