import React from 'react';
import { Text, } from 'react-native';
import { LinearGradient } from 'expo';

const LinearHeader = ({ color, children, }) => {
    return (
        <LinearGradient 
            start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
            colors={color}
            style={styles.container}
        >
            <Text style={styles.textStyle}>{children}</Text>
        </LinearGradient>
    );
};

const styles = {
    container: {
        marginHorizontal: 10, 
        marginTop: 10, 
        padding: 10, 
        backgroundColor: '#FFF', 
        borderRadius: 10, 
        alignItems: 'center',
    },
    textStyle: {
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#FFF',
    },
};

export { LinearHeader };
