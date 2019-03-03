import React from 'react';
import { View } from 'react-native';

const NavCard = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = {
    container: {
        width: 60, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
};

export default NavCard;
