import React from 'react';
import { View, Text, Image } from 'react-native';
import { Row } from './Row';
import { GRAY } from '../../colors';

const CustomerDetail = ({ data }) => {
    const { picture, name, tel_number, } = data;
    return (
        <Row style={styles.container}>
            <Image 
                source={{ uri: picture }}
                style={styles.imageStyle}
                resizeMode='cover'
            />
            <View style={{ marginLeft: 10, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{name}</Text>
                <Text style={{ color: GRAY }}>
                    {`0${tel_number.slice(3, 5)}-${tel_number.slice(5, 8)}-${tel_number.slice(8, 12)}`}
                </Text>
            </View>
        </Row>
    );
};

const styles = {
    container: {
        marginTop: 10,
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
        width: 60, 
        height: 60, 
        borderRadius: 30,
    },
};

export { CustomerDetail };
