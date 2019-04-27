import React from 'react';
import { View, } from 'react-native';

const ContainerBorderRadiusTop = ({ children, }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = {
    container: {
        flex: 1, 
        backgroundColor: '#FFF', 
        marginHorizontal: 10,
        marginTop: 10, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowRadius: 5, 
        shadowOpacity: 0.2,
    }
};

export { ContainerBorderRadiusTop };
