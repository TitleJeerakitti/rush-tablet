import React from 'react';
import { Modal, View, Text, Alert, FlatList, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Center } from '../Center';
import { DARK_RED, GRAY, ORANGE, LIGHT_GRAY } from '../../../colors';
import { MenuListItem } from '../MenuListItem';
import { Row } from '../Row';
import { Space } from '../Space';
import { CustomerDetail } from '../CustomerDetail';
import { Button } from '../Button';

class OrderDetailPopup extends React.Component {
    selectText() {
        const { status, category } = this.props.data;
        if (status === 1) {
            return 'ACCEPT';
        } else if (status === 2) {
            return 'CALL';
        } else if (status === 3 && category === 'R') {
            return 'PAY';
        } else if (status === 3 && category === 'A') {
            return 'GRAB';
        }
    }

    render() {
        const { 
            data,
            visible,
            onCancel,
            onClose,
            onConfirm,
        } = this.props;
        const { customer, menus, status, total = 0, } = data;
        return (
            <Modal
                animationType='slide'
                transparent
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <Center>
                    <View style={styles.container}>
                        <View style={{ padding: 10, }}>
                            <FlatList 
                                data={menus}
                                style={{ height: 230, marginTop: 10, }}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <MenuListItem data={item} />}
                                ListHeaderComponent={() => <View style={{ marginTop: 10, }} />}
                            />
                            <View style={{ borderTopWidth: 1, margin: 10, paddingTop: 10, }}>
                                <Row>
                                    <Text style={{ fontWeight: 'bold', color: ORANGE, fontSize: 18, }}>TOTAL</Text>
                                    <Text style={{ flex: 1, fontWeight: 'bold', color: ORANGE, textAlign: 'right', fontSize: 18, }}>{total.toFixed(2)} THB</Text>
                                </Row>
                                <CustomerDetail data={customer} />
                            </View>
                        </View>
                        <Row style={{ backgroundColor: LIGHT_GRAY, padding: 10, paddingHorizontal: 20, justifyContent: 'flex-end', }}>
                            <Button
                                containerStyle={{ 
                                    backgroundColor: onConfirm ? null : ORANGE, 
                                    paddingVertical: 8, 
                                    paddingHorizontal: 10, 
                                    borderRadius: 5, 
                                    marginLeft: 5 
                                }}
                                textStyle={{ color: onConfirm ? GRAY : '#FFF' }}
                                onPress={onClose}
                            >
                                CLOSE
                            </Button>
                            {status === 1 ? <Button
                                containerStyle={{ backgroundColor: DARK_RED, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 5, marginLeft: 5 }}
                                textStyle={{ color: '#FFF' }}
                                onPress={onCancel}
                            >
                                CANCEL
                            </Button> : <View />}
                            {onConfirm ?
                            <Button
                                containerStyle={{ backgroundColor: ORANGE, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 5, marginLeft: 5 }}
                                textStyle={{ color: '#FFF' }}
                                onPress={onConfirm}
                            >
                                {this.selectText()}
                            </Button> : <View />}
                        </Row>
                    </View>
                </Center>
            </Modal>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF',
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        borderRadius: 10, 
        width: 400,
        overflow: 'visible'
    },
};

export { OrderDetailPopup };
