import React from 'react';
import { View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Row, ContainerBorderRadiusTop, LinearHeader, MenuNumItem } from './common';
import { DARK_RED, ORANGE, YELLOW, BLACK_PINK, PINK, BLACK_RED } from '../colors';

class MenuManagement extends React.Component {
    render() {
        return (
            <Row style={{ flex: 1, }}>
                <View style={{ flex: 1, }}>
                    <LinearHeader color={[BLACK_RED, DARK_RED]}>
                        MAIN CATEGORY
                    </LinearHeader>
                    <ContainerBorderRadiusTop>
                        <MenuNumItem 
                            text='Example'
                            number={1}
                            selected
                        />
                        <MenuNumItem 
                            text='Example'
                            number={2}
                        />
                    </ContainerBorderRadiusTop>
                </View>
                <View style={{ flex: 1, }}>
                    <LinearHeader color={[BLACK_PINK, PINK]}>
                        SUB CATEGORY
                    </LinearHeader>
                </View>
                <View style={{ flex: 1, }}>
                    <LinearHeader color={[ORANGE, YELLOW]}>
                        MENU LIST
                    </LinearHeader>
                </View>
            </Row>
        );
    }
}

export default MenuManagement;
