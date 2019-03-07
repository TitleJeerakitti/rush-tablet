import React from 'react';
import { View, Image } from 'react-native';

const LoadingImage = () => {
    return (
        <View 
            style={styles.containerLoading}
        >
            <Image
                style={{ width: '50%', height: '50%' }}
                source={require('../../images/Tuuf.gif')}
            />
        </View>
    );
};

const styles = {
    containerLoading: { 
        flex: 1, 
        backgroundColor: '#F5F5F5', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
};

export { LoadingImage };
