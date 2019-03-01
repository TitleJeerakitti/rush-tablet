import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Row } from '../Row';
import { ORANGE, YELLOW, DARK_RED } from '../../../config';

class OrderConfirmation extends React.Component {
    render() {
        const { 
            containerStyle, 
            textContainer, 
            buttonContainer, 
            textRight, 
            textAmount, 
            textButton,
        } = styles;
        const { price, vat, total, onClear, onSubmit } = this.props;
        return (
            <View style={containerStyle}>
                <Row style={textContainer}>
                    <Text style={{ flex: 2 }}>ราคารวม</Text>
                    <Text style={textRight}>{price}</Text>
                </Row>
                <Row style={textContainer}>
                    <Text style={{ flex: 2 }}>VAT</Text>
                    <Text style={textRight}>{vat}</Text>
                </Row>
                <Row style={{ ...textContainer, paddingVertical: 5, backgroundColor: '#FFF', }}>
                    <Text style={{ flex: 2, ...textAmount }}>ราคาสุทธิ</Text>
                    <Text style={{ ...textRight, ...textAmount }}>{total}</Text>
                </Row>
                <Row>
                    <TouchableOpacity 
                        style={{ ...buttonContainer, backgroundColor: YELLOW, }}
                        activeOpacity={1}
                        onPress={onClear}
                    >
                        <Text style={textButton}>ยกเลิก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ ...buttonContainer, backgroundColor: DARK_RED, }}
                        activeOpacity={1}
                        onPress={onSubmit}
                    >
                        <Text style={textButton}>ชำระเงิน</Text>
                    </TouchableOpacity>
                </Row>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: '#FFF', 
        shadowOffset: { 
            width: 0, 
            height: 0 
        }, 
        shadowRadius: 10, 
        shadowOpacity: 0.1,
        paddingTop: 5,
    },
    textContainer: {
        marginTop: 5,
        paddingHorizontal: 20,
    },
    buttonContainer: { 
        padding: 10, 
        flex: 1, 
    },
    textRight: {
        flex: 1,
        textAlign: 'right',
    },
    textAmount: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: ORANGE,
    },
    textButton: {
        textAlign: 'center', 
        color: '#FFF', 
        fontSize: 18,
    }
};

export { OrderConfirmation };
