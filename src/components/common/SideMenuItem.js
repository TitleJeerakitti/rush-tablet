import React from 'react';
import { TouchableOpacity, Text, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { Row } from './Row';
import { ORANGE, GRAY, LIGHT_GRAY, } from '../../colors';

class SideMenuItem extends React.Component {
    isCurrentScene(text) {
        return Actions.currentScene === text;
    }

    render() {
        const { iconName, targetScene, onPress, text, } = this.props;
        const { buttonSelect, buttonStyle, textStyle } = styles;
        return (
            <TouchableOpacity 
                style={this.isCurrentScene(targetScene) ? 
                    { ...buttonStyle, ...buttonSelect } : buttonStyle}
                onPress={onPress}
                activeOpacity={1}
            >
                <Row style={{ alignItems: 'center', }}>
                    <Icon 
                        name={iconName} 
                        type='material-community' 
                        size={20} 
                        color={this.isCurrentScene(targetScene) ? ORANGE : GRAY}
                    />
                    <Text 
                        style={{ 
                            ...textStyle, 
                            color: this.isCurrentScene(targetScene) ? ORANGE : '#000',
                        }}
                    >
                        {text}
                    </Text>
                </Row>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textStyle: {
        marginLeft: 10,
    },
    buttonStyle: {
        padding: 10,
        borderLeftWidth: 5,
        borderColor: '#FFF',
    },
    buttonSelect: {
        borderColor: ORANGE, 
        backgroundColor: LIGHT_GRAY,
    },
};

export { SideMenuItem };
