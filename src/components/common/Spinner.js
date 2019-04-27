import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, style }) => (
        <View style={{ ...styles.spinnerStyle, ...style }}>
            <ActivityIndicator animating size={size || 'large'} />
        </View>
);

const styles = {
    spinnerStyle: {
        alignSelf: 'center',
    }
};

export { Spinner };
