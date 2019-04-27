import React from 'react';
import { Text, } from 'react-native';
import { Row } from '../Row';
import { Input } from '../Input';
import { LIGHT_GRAY } from '../../../colors';

const InputWithDescription = ({ title, placeholder, value, onChangeText, style, }) => {
    return (
        <Row style={{ alignItems: 'center', ...style }}>
            <Text style={{ flex: 1, }}>{title}</Text>
            <Input 
                placeholder={placeholder} 
                style={styles.textInputStyle} 
                value={value}
                onChangeText={onChangeText}
            />
        </Row>
    );
};

const styles = {
    textInputStyle: { 
        padding: 5, 
        backgroundColor: LIGHT_GRAY, 
        borderRadius: 10, 
        flex: 2, 
        textAlign: 'center',
    },
};

export { InputWithDescription };
