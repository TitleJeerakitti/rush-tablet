import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Row } from '../Row';
import { ORANGE, DARK_RED, GREEN } from '../../../colors';

class OrderConfirmation extends React.Component {
    render() {
        const { 
            containerStyle, 
            textContainer, 
            buttonContainer, 
            textRight, 
            textAmount, 
            textButton,
            subtotalStyle,
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
                <Row style={{ ...textContainer, ...subtotalStyle, }}>
                    <Text style={{ flex: 2, ...textAmount }}>ราคาสุทธิ</Text>
                    <Text style={{ ...textRight, ...textAmount }}>{total}</Text>
                </Row>
                <Row>
                    <TouchableOpacity 
                        style={{ ...buttonContainer, borderColor: DARK_RED }}
                        activeOpacity={1}
                        onPress={onClear}
                    >
                        <Text style={{ ...textButton, color: DARK_RED }}>ยกเลิก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ ...buttonContainer, borderColor: GREEN }}
                        activeOpacity={1}
                        onPress={onSubmit}
                    >
                        <Text style={{ ...textButton, color: GREEN }}>ชำระเงิน</Text>
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
        elevation: 5,
    },
    textContainer: {
        marginTop: 5,
        paddingHorizontal: 20,
    },
    buttonContainer: { 
        padding: 5, 
        flex: 1, 
        margin: 10,
        borderRadius: 20,
        borderWidth: 2,
    },
    textRight: {
        flex: 1,
        textAlign: 'right',
    },
    textAmount: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#FFF',
    },
    textButton: {
        textAlign: 'center',
        // fontSize: 18,
    },
    subtotalStyle: {
        paddingVertical: 5, 
        backgroundColor: ORANGE,
        shadowOffset: { 
            width: 0, 
            height: 0 
        }, 
        shadowRadius: 10, 
        shadowOpacity: 0.2,
        elevation: 2,
    }
};

export { OrderConfirmation };
