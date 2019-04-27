import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, LinearGradient, Permissions, Notifications } from 'expo';
import { SideMenuItem, } from './common';
import { DARK_ORANGE, YELLOW, } from '../colors';
import { SERVER, LOG_OUT, AUTH_HEADER, CLIENT_ID, CLIENT_SECRET } from '../config';
import { authUserLogout } from '../actions';

const config = {
    bannerHeight: Dimensions.get('window').height * 0.15,
    imageSize: Dimensions.get('window').height * 0.125,
    mainHome: 'mainHome',
    mainOrder: 'mainOrder',
    mainQueue: 'mainQueue',
    mainMenu: 'mainMenu',
    mainAnalyse: 'mainAnalyse',
};

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            expoToken: undefined,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status === 'granted') {
            const token = await Notifications.getExpoPushTokenAsync();
            this.setState({ expoToken: token });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async onLogoutAPI() {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${LOG_OUT}`, {
                method: 'POST',
                headers: AUTH_HEADER(token_type, access_token),
                body: JSON.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    token: access_token,
                    expo_token: this.state.expoToken,
                })
            });
            // const responseData = await response.json();
            if (this._isMounted && response.status === 200) {
                this.removeItem();
                Actions.reset('auth');
                this.props.authUserLogout();
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    async removeItem() {
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            Alert.alert('Cannot remove your authentication');
        }
    }

    isCurrentScene(text) {
        return Actions.currentScene === text;
    }

    render() {
        const { 
            containerStyle, 
            imageStyle, 
            restaurantContainer, 
            restaurantName, 
            logoutButton,
            logoutContainer,
        } = styles;
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient 
                    start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                    colors={[DARK_ORANGE, YELLOW]}
                    style={containerStyle}
                />
                <View style={restaurantContainer}>
                    <Image 
                        source={{ uri: this.props.userInfo.profile_picture }} 
                        style={imageStyle} 
                    />
                    <Text style={restaurantName} numberOfLines={2} >
                        {this.props.userInfo.name}
                    </Text>
                </View>
                <View style={{ flex: 1, marginTop: 10, }}>
                    <SideMenuItem 
                        text='Home'
                        iconName='home' 
                        targetScene={config.mainHome}
                        onPress={() => Actions.main()}
                    />
                    <SideMenuItem 
                        text='Order Management'
                        iconName='shopping' 
                        targetScene={config.mainOrder}
                        onPress={() => Actions.order()}
                    />
                    <SideMenuItem 
                        text='Queue Management'
                        iconName='account-group' 
                        targetScene={config.mainQueue}
                        onPress={() => Actions.queue()}
                    />
                    <SideMenuItem 
                        text='Menu Management'
                        iconName='food' 
                        targetScene={config.mainMenu}
                        onPress={() => Actions.menu()}
                    />
                    <SideMenuItem 
                        text='Analyse Data'
                        iconName='chart-bar' 
                        targetScene={config.mainAnalyse}
                        onPress={() => Actions.analyse()}
                    />
                </View>
                <View style={logoutContainer}>
                    <TouchableOpacity 
                        style={logoutButton}
                        onPress={() => this.onLogoutAPI()}
                    >
                        <Text style={{ color: '#FFF', }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        paddingTop: Constants.statusBarHeight,
        height: config.bannerHeight,
    },
    imageStyle: {
        width: config.imageSize, 
        height: config.imageSize, 
        position: 'absolute', 
        top: -(config.imageSize / 2),
        left: 20,
        borderRadius: config.imageSize / 2,
        borderWidth: 3,
        borderColor: 'white',
    },
    restaurantContainer: {
        height: config.imageSize / 2,
        paddingLeft: 20 + config.imageSize, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    restaurantName: {
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginHorizontal: 5,
    },
    logoutContainer: {
        backgroundColor: DARK_ORANGE, 
        padding: 5, 
        alignItems: 'center',
    },
    logoutButton: {
        borderWidth: 1, 
        borderColor: '#FFF', 
        borderRadius: 20, 
        paddingVertical: 5, 
        paddingHorizontal: 20,
    },
};

const mapStateToProps = ({ auth }) => {
    const { userInfo, token } = auth;
    return { userInfo, token };
};

export default connect(mapStateToProps, { authUserLogout })(SideMenu);
