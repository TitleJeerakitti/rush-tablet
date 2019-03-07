import React from 'react';
import { ScrollView, Text, } from 'react-native';
import { Center } from './Center';
import { GRAY } from '../../colors';

const EmptyView = ({ children, emptyText, condition, }) => {
    if (condition) {
        return (
            <ScrollView style={{ flex: 1, }}>
                {children}
            </ScrollView>
        );
    }
    return (
        <Center>
            <Text style={{ fontWeight: 'bold', color: GRAY, }}>
                {emptyText}
            </Text>
        </Center>
    );
};

export { EmptyView };
