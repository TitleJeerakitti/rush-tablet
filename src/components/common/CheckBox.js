import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { Icon, } from 'react-native-elements';
import { Row } from './Row';
import { DARK_RED, GRAY } from '../../colors';

const CheckBox = ({ onPress, isCheck, title, }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={1}
        >
            <Row style={{ alignItems: 'center', }}>
                <Icon 
                    name={isCheck ? 
                        'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                    type='material-community'
                    containerStyle={{ marginRight: 5, }}
                    color={isCheck ? DARK_RED : GRAY}
                />
                <Text style={{ color: isCheck ? DARK_RED : GRAY }}>{title}</Text>
            </Row>
        </TouchableOpacity>
    );
};

export { CheckBox };
