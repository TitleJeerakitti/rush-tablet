import React from 'react';
import { View, Text, Image } from 'react-native';
import { Row } from './Row';
import { GRAY, ORANGE, } from '../../colors';

const MenuListItem = ({ data, }) => {
    const { name, price, picture, quantity } = data;
    return (
        <Row style={styles.container}>
            <Image 
                source={{ uri: picture }}
                style={styles.imageStyle}
                resizeMode='cover'
            />
            <View style={{ flex: 1, marginLeft: 10, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: ORANGE }} numberOfLines={1}>
                    {name}
                </Text>
                <Row style={{ alignItems: 'center', marginTop: 5, }}>
                    <Text style={{ color: GRAY, fontWeight: 'bold' }}>
                        {price.toFixed(2)} THB
                    </Text>
                </Row>
            </View>
            <Text style={styles.quantityStyle}>x</Text>
            <Text style={styles.quantityStyle}>{quantity}</Text>
        </Row>
    );
};

const styles = {
    container: {
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        alignItems: 'center',
    },
    imageStyle: {
        width: 80, 
        height: 80, 
        borderRadius: 10,
    },
    quantityStyle: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        marginLeft: 5, 
    }
};

export { MenuListItem };
