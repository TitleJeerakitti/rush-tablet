import React from 'react';
import { TouchableWithoutFeedback, Switch, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import NavContainer from './NavContainer';
import NavCard from './NavCard';
import NavTitle from './NavTitle';
import { SERVER, SHOP_STATUS, AUTH_HEADER } from '../../../config';
import { authToggleShopStatus, } from '../../../actions';
import { GREEN, DARK_RED } from '../../../colors';

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
            Alert.alert('Unstable Network!');
        }
    }

    toggleShopStatus() {
        this.toggleShopAPI();
    }

    renderMessage() {
        return `to ${this.props.userInfo.is_open ? 'close' : 'open'} your shop`;
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
                        onValueChange={() => {
                            Alert.alert(
                                'Are you sure?',
                                this.renderMessage(),
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                    { 
                                        text: 'Confirm', 
                                        onPress: () => {
                                            this.toggleShopStatus();
                                        }
                                    },
                                ],
                                    { cancelable: false },
                            );
                        }}
                    />
                </NavCard>
                <View style={styles.statusContainer}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Shop Status</Text>
                    <View style={styles.statusTextContainer}>
                        { this.props.userInfo.is_open ? 
                            <Text style={{ fontWeight: 'bold', color: GREEN, }}>OPEN</Text> :
                            <Text style={{ fontWeight: 'bold', color: DARK_RED, }}>CLOSE</Text>
                        }
                    </View>
                </View>
            </NavContainer>
        );
    }
}

const styles = {
    statusContainer: {
        position: 'absolute', 
        right: 70, 
        alignItems: 'flex-end'
    },
    statusTextContainer: {
        backgroundColor: 'white', 
        paddingHorizontal: 10, 
        marginTop: 5, 
        borderRadius: 14,
    },
};

const mapStateToProps = ({ auth }) => {
    const { userInfo, token } = auth;
    return { userInfo, token };
};

const NavHamberger = connect(mapStateToProps, { authToggleShopStatus })(NavBar);
export { NavHamberger };
