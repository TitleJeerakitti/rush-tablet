import React from 'react';
import { Modal, View, Text, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import { InputWithDescription } from './InputWithDescription';
import { Center } from '../Center';
import { LIGHT_GRAY, DARK_RED, GRAY, ORANGE } from '../../../colors';
import { Row } from '../Row';

class CategoryDetail extends React.Component {
    renderTrash(data) {
        if (data !== null) {
            return data.isNew ? <View /> :
            <TouchableOpacity 
                style={{ backgroundColor: DARK_RED, ...styles.buttonStyle }}
                onPress={this.props.onDelete}
            >
                <Icon name='trash-can' type='material-community' color='#FFF' size={16} />
            </TouchableOpacity>;
        }
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <KeyboardAvoidingView style={{ flex: 1, }} behavior='padding' enabled>
                    <Center style={styles.container}>
                        <View style={styles.containerPopUp}>
                            <View style={{ padding: 20, }}>
                                <InputWithDescription 
                                    title='Category'
                                    placeholder='Category Name'
                                    value={this.props.visible ? this.props.data.name : ''}
                                    onChangeText={this.props.onChangeText}
                                />
                            </View>
                            <Row style={{ padding: 20, paddingVertical: 10, backgroundColor: LIGHT_GRAY, justifyContent: 'flex-end' }}>
                                <TouchableOpacity 
                                    style={{ ...styles.buttonStyle }}
                                    onPress={this.props.onCancel}
                                >
                                    <Text style={{ color: GRAY }}>CANCEL</Text>
                                </TouchableOpacity>
                                {this.renderTrash(this.props.data)}
                                <TouchableOpacity 
                                    style={{ backgroundColor: ORANGE, ...styles.buttonStyle }}
                                    onPress={this.props.onSave}
                                >
                                    <Text style={{ color: '#FFF' }}>SAVE</Text>
                                </TouchableOpacity>
                            </Row>
                        </View>
                    </Center>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

const styles = {
    container: { 
        marginTop: Constants.statusBarHeight,
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
    },
    containerPopUp: {
        backgroundColor: '#FFF', 
        borderRadius: 10, 
        width: 350, 
        overflow: 'hidden',
    },
    buttonStyle: {
        padding: 10, 
        paddingVertical: 5, 
        borderRadius: 5, 
        marginLeft: 5,
    }
};

export { CategoryDetail };
