import React from 'react';
import { View, Text, } from 'react-native';
import { LinearGradient } from 'expo';
import { Row, ContainerBorderRadiusTop } from './common';
import { DARK_RED, LIGHT_RED, ORANGE, YELLOW, LIGHT_YELLOW, BLACK_PINK, PINK } from '../colors';

class MenuManagement extends React.Component {
    render() {
        return (
            <Row style={{ flex: 1, }}>
                <View style={{ flex: 1, }}>
                    <LinearGradient 
                        start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                        colors={['#c60000', DARK_RED]}
                        style={{ marginHorizontal: 10, marginTop: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFF' }}>MAIN CATEGORY</Text>
                    </LinearGradient>
                    <ContainerBorderRadiusTop>
                        <View style={{ padding: 10, margin: 10, borderWidth: 1, borderRadius: 10, }}>
                            <Text>Test</Text>
                        </View>
                    </ContainerBorderRadiusTop>
                </View>
                <View style={{ flex: 1, }}>
                    <LinearGradient 
                        start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                        colors={[BLACK_PINK, PINK]}
                        style={{ margin: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFF' }}>MAIN CATEGORY</Text>
                    </LinearGradient>
                </View>
                <View style={{ flex: 1, }}>
                    <LinearGradient 
                        start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                        colors={[ORANGE, YELLOW]}
                        style={{ margin: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 10, alignItems: 'center', }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFF' }}>MAIN CATEGORY</Text>
                    </LinearGradient>
                </View>
            </Row>
        );
    }
}

export default MenuManagement;
