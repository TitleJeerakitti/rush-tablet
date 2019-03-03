import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row } from './Row';
import { GRAY, ORANGE, LIGHT_GRAY } from '../../config';

class SeleteItem extends React.Component {
    render() {
        const { containerStyle, containerSelect, } = styles;
        const { onPress, iconName, iconType, text, selected } = this.props;
        return (
            <TouchableOpacity 
                style={selected ? [containerStyle, containerSelect] : containerStyle} 
                onPress={onPress}
                activeOpacity={1}
            >
                <Row style={{ alignItems: 'center', }}>
                    <Icon 
                        name={iconName} 
                        type={iconType} 
                        color={selected ? ORANGE : GRAY} 
                    />
                    <Text style={{ marginLeft: 10, color: selected ? ORANGE : '#000' }}>
                        {text}
                    </Text>
                </Row>
            </TouchableOpacity>
        );
    }
}

const styles = {
    containerStyle: {
        padding: 15, 
        borderLeftWidth: 5, 
        borderColor: 'white',
    },
    containerSelect: {
        borderColor: ORANGE,
        backgroundColor: LIGHT_GRAY,
    },
};

export { SeleteItem };
