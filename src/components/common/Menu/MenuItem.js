import React from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions, } from 'react-native';
import { Row } from '../Row';
import { YELLOW, ORANGE, GRAY } from '../../../colors';
import OutOfStock from '../../../images/out-of-stock.png';

const width = Dimensions.get('window').width * 0.6;
const widthImage = (width - 60) / 3;

const MenuItem = ({ onPress, data }) => {
    return (
        <View style={styles.containerShadow}>
            <TouchableOpacity 
                style={styles.containerStyle} 
                onPress={onPress} 
                activeOpacity={0.5} 
                disabled={data.is_out_of_stock}
            >
                <Row>
                    <Image 
                        source={{ uri: data.picture }}
                        resizeMode='cover'
                        style={{ width: widthImage, height: widthImage, }}
                    />
                    { data.is_out_of_stock === true ? 
                        <Image 
                            source={OutOfStock}
                            style={styles.outOfStockStyle}
                        /> : <View />
                    }
                    <View style={styles.textContainer}>
                        <Text 
                            numberOfLines={2} 
                            style={{ fontWeight: 'bold' }}
                        >
                            {data.name}
                        </Text>
                        <Text 
                            style={{ color: ORANGE, fontWeight: 'bold', }}
                        >
                            {data.price} THB
                        </Text>
                    </View>
                </Row>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    containerShadow: {
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
        elevation: 5,
    },
    containerStyle: {
        margin: 10, 
        justifyContent: 'center',
        borderRadius: 10, 
        overflow: 'hidden'
    },
    textContainer: {
        position: 'absolute', 
        bottom: 0, 
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)', 
        padding: 10,
        shadowOffset: { 
            width: 0, 
            height: 0
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
    },
    outOfStockStyle: {
        width: widthImage * 0.67, 
        height: widthImage * 0.67, 
        position: 'absolute', 
        top: 0, 
        left: 0,
    }
};

export { MenuItem };
