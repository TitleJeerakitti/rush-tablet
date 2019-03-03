import React from 'react';
import { TouchableWithoutFeedback, Switch, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import NavContainer from './NavContainer';
import NavCard from './NavCard';
import NavTitle from './NavTitle';

class NavHamberger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    render() {
        const { title } = this.props;
        return (
            <NavContainer>
                <NavCard>
                    <TouchableWithoutFeedback onPress={Actions.drawerOpen}>
                        <Icon 
                            name='navicon' 
                            type='evilicon' 
                            color='white'
                        />
                    </TouchableWithoutFeedback>
                </NavCard>
                <NavTitle>{title}</NavTitle>
                <NavCard>
                    <Switch 
                        value={this.state.isOpen}
                        onValueChange={() => this.setState({ isOpen: !this.state.isOpen })}
                    />
                </NavCard>
            </NavContainer>
        );
    }
}

export { NavHamberger };
