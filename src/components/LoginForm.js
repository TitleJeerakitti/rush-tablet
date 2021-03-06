import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    LayoutAnimation, 
    UIManager, 
    Platform, 
    ActivityIndicator,
    AsyncStorage, 
    Alert,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AuthBackground, Row, Center, Input } from './common';
import { DARK_RED, YELLOW } from '../colors';
import { 
    SERVER, 
    LOG_IN, 
    CLIENT_SECRET, 
    CLIENT_ID, 
    CONTENT_TYPE_JSON_HEADERS, 
    TOKEN_LOGIN, 
    AUTH_HEADER, 
    REGISTER_LINK
} from '../config';
import { authUserLogin, authTokenLogin, } from '../actions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            username: '',
            password: '',
            error: '',
            isLoading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getData() {
        try {
            const storageToken = await AsyncStorage.getItem('token');
            const token = await JSON.parse(storageToken);
            if (token !== null) {
                this.tokenLoginAPI(token);
            }
        } catch (error) {
            Alert.alert('Cannot get your profile!');
        }
    }

    async storeData(token) {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
        } catch (error) {
            Alert.alert('Cannot save your profile!');
        }
    }

    async loginAPI() {
        try {
            if (this._isMounted) {
                this.setState({ isLoading: true, });
            }
            const response = await fetch(`${SERVER}${LOG_IN}`, {
                method: 'POST',
                headers: CONTENT_TYPE_JSON_HEADERS,
                body: JSON.stringify({
                    client_secret: CLIENT_SECRET,
                    client_id: CLIENT_ID,
                    grant_type: 'password',
                    username: this.state.username,
                    password: this.state.password,
                })
            });
            const responseData = await response.json();
            if (this._isMounted && response.status === 200 && responseData.role === 'supplier') {
                this.setState({ 
                    username: '', 
                    password: '',
                    isLoading: false, 
                });
                await this.storeData(responseData.token);
                this.props.authUserLogin(responseData);
                Actions.replace('app');
            } else if (this._isMounted) {
                this.renderAnimation();
                this.setState({ 
                    error: 'Invalid Username or Password, try again!', 
                    isLoading: false, 
                    password: '',
                });
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    async tokenLoginAPI(token) {
        try {
            const { token_type, access_token } = token;
            const response = await fetch(`${SERVER}${TOKEN_LOGIN}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            if (this._isMounted && response.status === 200) {
                const responseData = await response.json();
                this.props.authTokenLogin(responseData.user_info, token);
                Actions.replace('app');
            } else {
                this.refreshTokenAPI(token);
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    async refreshTokenAPI(token) {
        try {
            const response = await fetch(`${SERVER}${LOG_IN}`, {
                method: 'POST',
                headers: CONTENT_TYPE_JSON_HEADERS,
                body: JSON.stringify({
                    client_secret: CLIENT_SECRET,
                    client_id: CLIENT_ID,
                    grant_type: 'refresh_token',
                    refresh_token: token.refresh_token,
                }),
            });
            if (this._isMounted && response.status === 200) {
                const responseData = await response.json(); 
                await this.storeData(responseData.token);
                this.props.authUserLogin(responseData);
                Actions.replace('app');
            }
        } catch (err) {
            Alert.alert('Unstable Network!');
        }
    }

    renderIndicator() {
        if (!this.state.isLoading) {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.buttonStyle}
                    onPress={() => {
                        this.loginAPI();
                        this.renderAnimation();
                    }}
                >
                    <Text style={styles.textWhite}>Log In</Text>
                </TouchableOpacity>
            );
        }
        return <ActivityIndicator size='large' />;
    }

    renderAnimation() {
        LayoutAnimation.spring();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        const { 
            centerStyle, 
            imageSize, 
            textWhite, 
            lineStyle, 
            inputStyle, 
        } = styles;
        return (
            <AuthBackground>
                <Row style={{ ...centerStyle, width: '80%' }}>
                    <Center>
                        <Image 
                            source={require('../images/r-logo.png')}
                            resizeMode='contain'
                            style={imageSize}
                        />
                        <Text style={{ ...textWhite, fontSize: 60, }}>RUSH</Text>
                        <View style={lineStyle} />
                        <Text style={{ ...textWhite, fontSize: 40, }}>RESTAURANT</Text>
                    </Center>
                    <Center>
                        <Input 
                            placeholder='Username' 
                            style={inputStyle}
                            value={this.state.username}
                            onChangeText={(text) => {
                                if (this._isMounted) {
                                    this.renderAnimation();
                                    this.setState({ username: text, error: '' });
                                }
                            }}
                        />
                        <Input 
                            placeholder='Password' 
                            style={{ ...inputStyle, marginTop: 20 }}
                            value={this.state.password}
                            secure
                            onChangeText={(text) => {
                                if (this._isMounted) {
                                    this.renderAnimation();
                                    this.setState({ password: text, error: '' });
                                }
                            }}
                        />
                        <Text style={{ color: DARK_RED, paddingVertical: 5, }}>
                            {this.state.error}
                        </Text>
                        {this.renderIndicator()}
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{ ...styles.buttonStyle, backgroundColor: YELLOW }}
                            onPress={() => Linking.openURL(`${SERVER}${REGISTER_LINK}`)}
                        >
                            <Text style={styles.textWhite}>Register</Text>
                        </TouchableOpacity>
                    </Center>
                </Row>
            </AuthBackground>
        );
    }
}

const styles = {
    centerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSize: {
        height: '50%', 
        width: '50%',
    },
    textWhite: {
        color: 'white'
    },
    lineStyle: {
        borderBottomWidth: 2, 
        borderColor: 'white', 
        marginVertical: 10, 
        width: 250
    },
    inputStyle: {
        backgroundColor: 'white', 
        padding: 10, 
        width: 300, 
        textAlign: 'center', 
        borderRadius: 18.5,
    },
    buttonStyle: {
        backgroundColor: DARK_RED, 
        padding: 10, 
        width: 300, 
        textAlign: 'center', 
        borderRadius: 18.5, 
        marginTop: 20, 
        alignItems: 'center',
    }
};

export default connect(null, { authUserLogin, authTokenLogin, })(LoginForm);
