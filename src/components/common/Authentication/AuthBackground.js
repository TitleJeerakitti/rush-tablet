import React from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { BlurView } from 'expo';

const AuthBackground = ({ children }) => {
    const { container } = styles;
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <Image
                resizeMode='cover'
                style={{
                    width: '100%',
                    height: '100%',
                }}
                source={require('../../../images/bg.jpg')} 
            />
            <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill}>
                <KeyboardAvoidingView style={container} behavior="padding">
                    {children}
                </KeyboardAvoidingView>
            </BlurView>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export { AuthBackground };
