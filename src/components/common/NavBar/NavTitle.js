import React from 'react';
import { Text } from 'react-native';

const NavTitle = ({ children }) => {
    return (
        <Text style={styles.textStyle}>
            {children}
        </Text>
    );
};

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        alignSelf: 'center',
    }
};

export default NavTitle;
