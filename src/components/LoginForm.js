import React from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { AuthBackground, Row, Center, Input } from './common';
import { DARK_RED } from '../config';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        const { 
            centerStyle, 
            imageSize, 
            textWhite, 
            lineStyle, 
            inputStyle, 
            buttonStyle 
        } = styles;
        console.log(this.state.email + " " + this.state.password)
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
                            placeholder='E-mail' 
                            style={inputStyle}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                        <Input 
                            placeholder='Password' 
                            style={{ ...inputStyle, marginTop: 20 }}
                            value={this.state.password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={buttonStyle}
                        >
                            <Text style={textWhite}>Log In</Text>
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
        marginTop: 40, 
        alignItems: 'center',
    }
}

export default LoginForm;
