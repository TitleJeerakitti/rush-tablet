import React from 'react';
import { Icon } from 'react-native-elements';
import { ORANGE } from '../../../config';

class IconTab extends React.Component {
    render() {
        const { iconName, focused } = this.props;
        return (
            <Icon 
                name={iconName} 
                type='material-community' 
                size={30} 
                color={focused ? ORANGE : 'black'} 
            />
        );
    }
}

export { IconTab };
