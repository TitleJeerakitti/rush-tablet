import React from 'react';
import { View } from 'react-native';

const Row = ({ style, children }) => {
    return (
        <View style={{ flexDirection: 'row', ...style }}>
            {children}
        </View>
    );
}

export { Row };
