import React from 'react';
import { Text } from 'react-native';
import { Row } from '../Row';
import { LIGHT_YELLOW } from '../../../config';

const OrderDetail = () => {
    const { containerStyle, textStyle } = styles;

    return (
        <Row style={containerStyle}>
            <Text style={{ flex: 2, ...textStyle }} numberOfLines={1}>รายการอาหาร</Text>
            <Text style={{ flex: 1, ...textStyle }} numberOfLines={1}>จำนวน</Text>
            <Text style={{ flex: 1, ...textStyle }} numberOfLines={1}>หน่วยละ</Text>
            <Text style={{ flex: 1, ...textStyle }} numberOfLines={1}>รวม</Text>
        </Row>
    );
};

const styles = {
    containerStyle: {
        padding: 10,
        backgroundColor: LIGHT_YELLOW,
    },
    textStyle: {
        paddingHorizontal: 10,
        color: 'white',
        textAlign: 'center',
    },
};

export { OrderDetail };
