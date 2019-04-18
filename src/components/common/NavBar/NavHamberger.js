import React from 'react';
import { TouchableWithoutFeedback, Switch, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import NavContainer from './NavContainer';
import NavCard from './NavCard';
import NavTitle from './NavTitle';
import { SERVER, SHOP_STATUS, AUTH_HEADER } from '../../../config';
import { authToggleShopStatus, } from '../../../actions';

class NavBar extends React.Component {
    async toggleShopAPI() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${SHOP_STATUS}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                this.props.authToggleShopStatus(responseData.is_open);
            }
        } catch (err) {
            console.log(err);
        }
    }

    toggleShopStatus() {
        this.toggleShopAPI();
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
                        value={this.props.userInfo.is_open}
                        onValueChange={() => this.toggleShopStatus()}
                    />
                </NavCard>
            </NavContainer>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { userInfo, token } = auth;
    return { userInfo, token };
};

const NavHamberger = connect(mapStateToProps, { authToggleShopStatus })(NavBar);
export { NavHamberger };
