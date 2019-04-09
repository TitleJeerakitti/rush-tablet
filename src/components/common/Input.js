import React from 'react';
import { TextInput } from 'react-native';

const Input = ({ style, placeholder, value, onChangeText, secure = false, }) => {
    return (
        <TextInput
            placeholder={placeholder} 
            style={style}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={secure}
        />
    );
};

export { Input };
