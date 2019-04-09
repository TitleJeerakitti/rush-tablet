import React from 'react';
import { Text, View } from 'react-native';

const SubCategory = ({ children, text }) => {
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 10, }}>
                {text}
            </Text>
            {children}
        </View>
    );
};

export { SubCategory };
