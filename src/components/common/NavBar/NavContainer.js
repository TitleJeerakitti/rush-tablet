import React from 'react';
import { View, StatusBar } from 'react-native';
import { LinearGradient, Constants } from 'expo';
import { DARK_RED, DARK_ORANGE } from '../../../colors';

const NavContainer = ({ children }) => {
    const { containerStyle, navbarStyle } = styles;
    return (
        <LinearGradient 
            start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
            colors={[DARK_RED, DARK_ORANGE]}
            style={containerStyle}
        >
            <StatusBar barStyle="light-content" />
            <View style={navbarStyle}>
                {children}
            </View>
        </LinearGradient>
    );
};

const styles = {
    containerStyle: {
        paddingTop: Constants.statusBarHeight,
    },
    navbarStyle: {
        height: 44,
        flexDirection: 'row',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        elevation: 10,
    },
};

export default NavContainer;
