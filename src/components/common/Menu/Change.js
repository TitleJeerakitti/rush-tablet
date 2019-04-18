import React from 'react';
import { Modal, View, TouchableOpacity, Alert, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Icon } from 'react-native-elements';
import { Center } from '../Center';
import { Row } from '../Row';
import { GRAY, ORANGE, LIGHT_GRAY } from '../../../colors';

class Change extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pay: '0',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.total !== this.props.total || prevProps.visible !== this.props.visible) {
            this.setState({ pay: '0', });
        }
    }

    onAddNumber(text) {
        const pointIndex = this.state.pay.indexOf('.');
        if (pointIndex === -1 && this.state.pay.length < 7) {
            this.setState({ pay: this.state.pay === '0' ? text : this.state.pay + text });
        } else if (this.state.pay.length <= pointIndex + 2 && this.state.pay.length < 10) {
            this.setState({ pay: this.state.pay + text });
        }
    }

    onAddPoint() {
        const response = this.state.pay.includes('.');
        if (!response) {
            this.setState({ pay: `${this.state.pay}.` });
        }
    }

    onRemoveLast() {
        const last = this.state.pay.length - 1;
        const pointIndex = this.state.pay.indexOf('.');
        if (last === 0 && this.state.pay !== '0') {
            this.setState({ pay: '0' });
        } else if (pointIndex === last - 1 && this.state.pay !== '0') {
            this.setState({ pay: this.state.pay.slice(0, last - 1) });
        } else if (last > 1) {
            this.setState({ pay: this.state.pay.slice(0, last) });
        } else if (last === 1) {
            const result = this.state.pay.slice(0, 1);
            this.setState({ pay: result });
        }
    }

    onClear() {
        if (this.state.pay !== '0') {
            this.setState({ pay: '0' });
        }
    }

    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderButton(arr) {
        return arr.map((item, index) => 
            <TouchableOpacity 
                key={index}
                style={styles.buttonStyle} 
                onPress={() => this.onAddNumber(item)}
            >
                <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
        );
    }

    renderChange() {
        if (!this.props.isPaid) {
            return (
                <View style={styles.container}>
                    <View style={styles.grayContainer}>
                        <Row style={{ marginTop: 10 }}>
                            <Text style={styles.orange40bold}>PAY</Text>
                            <Text style={{ flex: 1, textAlign: 'right', ...styles.orange40bold, }}>
                                {parseFloat(this.state.pay).toFixed(2)}
                            </Text>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Text style={styles.bold24}>TOTAL</Text>
                            <Text style={{ flex: 1, textAlign: 'right', ...styles.bold24 }}>
                                {this.props.total.toFixed(2)}
                            </Text>
                        </Row>
                    </View>
                    <Row style={{ marginTop: 20, justifyContent: 'center', }}>
                        {this.renderButton(['1', '2', '3'])}
                    </Row>
                    <Row style={styles.margin10center}>
                        {this.renderButton(['4', '5', '6'])}
                    </Row>
                    <Row style={styles.margin10center}>
                        {this.renderButton(['7', '8', '9'])}
                    </Row>
                    <Row style={styles.margin10center}>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={() => this.onRemoveLast()}
                            onLongPress={() => this.onClear()}
                        >
                            <Icon name='backspace' type='material-community' color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={() => this.onAddNumber('0')}
                        >
                            <Text style={styles.buttonText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonStyle} 
                            onPress={() => this.onAddPoint()}
                        >
                            <Text style={styles.buttonText}>.</Text>
                        </TouchableOpacity>
                    </Row>
                    <View style={{ alignItems: 'center', }}>
                        <Row style={{ width: 280, justifyContent: 'flex-end' }}>
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={this.props.onCancel}
                            >
                                <Text style={styles.cancelText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.orangeButton}
                                onPress={parseFloat(this.state.pay) >= parseFloat(this.props.total) ? this.props.onPay : () => null}
                            >
                                <Text style={styles.orangeButtonText}>PAY</Text>
                            </TouchableOpacity>
                        </Row>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={{ borderRadius: 10, padding: 10, }}>
                    <Row>
                        <Text style={styles.bold24}>PAY</Text>
                        <Text style={{ flex: 1, textAlign: 'right', ...styles.bold24, }}>
                            {parseFloat(this.state.pay).toFixed(2)}
                        </Text>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Text style={styles.bold24}>TOTAL</Text>
                        <Text style={{ flex: 1, textAlign: 'right', ...styles.bold24 }}>
                            {this.props.total.toFixed(2)}
                        </Text>
                    </Row>
                </View>
                <View style={{ ...styles.grayContainer, marginTop: 10, }}> 
                    <Row style={{ alignItems: 'flex-end', paddingTop: 10, }}>
                        <Text style={styles.changeText}>CHANGE</Text>
                        <Text style={{ flex: 1, textAlign: 'right', ...styles.orange40bold }}>
                            {(parseFloat(this.state.pay) - this.props.total).toFixed(2)}
                        </Text>
                    </Row>
                </View>
                <Row style={{ justifyContent: 'center' }}>
                    <TouchableOpacity 
                        style={styles.orangeButton}
                        onPress={this.props.onClose}
                    >
                        <Text style={styles.orangeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </Row>
            </View>
        );
    }

    render() {
        return (
            <Modal 
                visible={this.props.visible}
                transparent
                animationType='fade'
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <Center>
                    {this.renderChange()}
                </Center>
            </Modal>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF', 
        padding: 20, 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        borderRadius: 10, 
        width: 400,
    },
    grayContainer: { 
        backgroundColor: LIGHT_GRAY, 
        borderRadius: 10, 
        padding: 10, 
    },
    buttonStyle: { 
        width: 80, 
        height: 80, 
        borderRadius: 50, 
        backgroundColor: GRAY, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'white'
    },
    orange40bold: {
        fontSize: 40, 
        fontWeight: 'bold', 
        color: ORANGE
    },
    bold24: {
        fontSize: 24, 
        fontWeight: 'bold',
    },
    margin10center: {
        marginTop: 10, 
        justifyContent: 'center',
    },
    cancelButton: {
        marginTop: 20, 
        borderRadius: 5, 
        marginRight: 5,
    },
    cancelText: {
        color: GRAY, 
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        fontWeight: 'bold', 
        fontSize: 18
    },
    orangeButton: {
        backgroundColor: ORANGE, 
        marginTop: 20, 
        borderRadius: 5,
    },
    orangeButtonText: {
        color: 'white', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        fontWeight: 'bold', 
        fontSize: 18
    },
    changeText: { 
        position: 'absolute', 
        top: 5, 
        left: 5, 
        fontWeight: 'bold', 
        color: ORANGE, 
        fontSize: 24 
    }
};

export { Change };
