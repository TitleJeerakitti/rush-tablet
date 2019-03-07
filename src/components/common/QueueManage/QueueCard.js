import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { LinearGradient, } from 'expo';
import { Row } from '../Row';
import { GRAY } from '../../../colors';

const QueueCard = ({ colors, buttonColor, queue, onNext, onAgain, header, }) => {
    const { 
        queueCard,
        linearBackground, 
        boldWhite, 
        queueText, 
        buttonContainer, 
        buttonStyle,
    } = styles;
    return (
        <View style={queueCard}>
            <LinearGradient 
                start={{ x: 0.0, y: 0.5 }} end={{ x: 0.8, y: 0.7 }}
                colors={colors}
                style={linearBackground}
            >
                <Text style={boldWhite}>{header}</Text>
                <Text style={{ ...queueText, ...boldWhite }}>{queue}</Text>
            </LinearGradient>
            <Row style={buttonContainer}>
                <TouchableOpacity style={{ padding: 10 }} onPress={onAgain}>
                    <Text style={{ ...boldWhite, color: GRAY, }}>AGAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        padding: 10, 
                        ...buttonStyle, 
                        backgroundColor: buttonColor, 
                    }}
                    onPress={onNext}
                >
                    <Text style={boldWhite}>NEXT</Text>
                </TouchableOpacity>
            </Row>
        </View>
    );
};

const styles = {
    queueCard: {
        marginHorizontal: 10, 
        marginTop: 10,
        shadowOffset: { 
            width: 0, 
            height: 2, 
        }, 
        shadowRadius: 5, 
        shadowOpacity: 0.2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    linearBackground: {
        padding: 10, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    boldWhite: { 
        fontWeight: 'bold', 
        color: 'white', 
    },
    queueText: {
        textAlign: 'center', 
        fontSize: 50,
    },
    buttonContainer: {
        padding: 10, 
        backgroundColor: '#FFF', 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    buttonStyle: {
        borderRadius: 5, 
        marginLeft: 10,
    }
};

export { QueueCard };
