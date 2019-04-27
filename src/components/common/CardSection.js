import React from 'react';
import { View, } from 'react-native';

const CardSection = ({ style, children, }) => {
    return (
        <View style={{ paddingTop: 10, paddingHorizontal: 10, ...style }}>
            {children}
        </View>
    );
};

export { CardSection };
