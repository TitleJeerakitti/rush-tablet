import React from 'react';
import { Modal, View, TouchableOpacity, Text, Alert } from 'react-native';
import { Center } from '../Center';
import { Row } from '../Row';
import { ORANGE, GRAY } from '../../../colors';

class ConfirmCancel extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <Modal
                animationType='slide'
                transparent
                visible={false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <Center>
                    <View style={{ padding: 20, backgroundColor: '#FFF', borderRadius: 5, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, }}>Are you sure to ... this order</Text>
                        <Row style={{ justifyContent: 'flex-end', marginTop: 20, }}>
                            <TouchableOpacity 
                                onPress={() => console.log('test')}
                                style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, }}
                            >
                                <Text style={{ color: GRAY }}>Cancel</Text>
                            </TouchableOpacity >
                            <TouchableOpacity 
                                onPress={() => console.log('confirm')}
                                style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, backgroundColor: ORANGE, marginLeft: 10, }}
                            >
                                <Text style={{ color: '#FFF' }}>Confirm</Text>
                            </TouchableOpacity>
                        </Row>
                    </View>
                </Center>
            </Modal>
        );
    }
}

export { ConfirmCancel };
