import React from 'react';
import { Modal, Text, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView, TextInput } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Constants, } from 'expo';
import { Row } from '../Row';
import { ORANGE, LIGHT_GRAY, GRAY, DARK_RED } from '../../../colors';
import { Button } from '../Button';
import { Center } from '../Center';
import { InputWithDescription } from './InputWithDescription';
import { Space } from '../Space';
import { CheckBox } from '../CheckBox';
import { Spinner } from '../Spinner';

class RestaurantPopup extends React.Component {

    renderSpinner() {
        const { 
            popupContainer, 
            imageStyle, 
            uploadIcon, 
            cancelStyle,
            submitStyle,
            loadingContainer
        } = styles;
        const { 
            onCancel, 
            onSave, 
            onChangeName, 
            onChangeOutOfStock, 
            onChangePrice, 
            onDelete, 
            onChangePicture,
            loading
        } = this.props;
        const { is_out_of_stock, name, price = '0', picture, isNew, } = this.props.menu;
        if (loading) {
            return (
                <View style={loadingContainer}>
                    <Spinner />
                </View>
            );
        }
        return (
            <Row style={popupContainer}>
                <TouchableOpacity onPress={onChangePicture}>
                    <Image 
                        resizeMode='cover'
                        source={{ uri: this.props.imageURL || picture }} 
                        style={imageStyle} 
                    />
                    <Center style={uploadIcon}>
                        <Icon 
                            name='camera' 
                            type='material-community' 
                            color='#FFF' 
                            size={18} 
                        />
                    </Center>
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: 20, }}>
                    { isNew ? <View /> :
                    <TouchableOpacity 
                        style={{ backgroundColor: DARK_RED, borderRadius: 50, padding: 2, alignSelf: 'flex-end', marginBottom: 5, }}
                        onPress={onDelete}
                    >
                        <Icon name='trash-can' type='material-community' size={20} color='white' /> 
                    </TouchableOpacity>}
                    <InputWithDescription 
                        title='Menu Name'
                        placeholder='Menu Name'
                        value={name || null}
                        onChangeText={onChangeName}
                    />
                    <InputWithDescription 
                        title='Price'
                        placeholder='ex. 100.00'
                        value={price.toString() || null}
                        onChangeText={onChangePrice}
                        style={{ marginTop: 10 }}
                    />
                    <Row style={{ marginTop: 20, alignItems: 'center', }}>
                        <CheckBox 
                            onPress={onChangeOutOfStock} 
                            title='Out of Stock'
                            isCheck={is_out_of_stock}
                        />
                        <Space />
                        <Button 
                            containerStyle={cancelStyle}
                            textStyle={{ color: GRAY }}
                            hideOpacity
                            onPress={onCancel}
                        >
                            CANCEL
                        </Button>
                        <Button 
                            containerStyle={submitStyle}
                            textStyle={{ color: '#FFF' }}
                            hideOpacity
                            onPress={onSave}
                        >
                            SAVE
                        </Button>
                    </Row>
                </View>
            </Row>
        );
    }

    render() {
        const { container, } = styles;
        const { visible, } = this.props;
        // console.log(this.props.menu)
        return (
            <Modal
                animationType='slide'
                transparent
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
                    <Center style={container}>
                        {this.renderSpinner()}
                    </Center>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

const styles = {
    container: { 
        // flex: 1,
        marginTop: Constants.statusBarHeight, 
    },
    popupContainer: { 
        padding: 20, 
        backgroundColor: '#FFF', 
        borderRadius: 20, 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
        alignItems: 'center', 
        width: 500, 
    },
    imageStyle: { 
        width: 150, 
        height: 150, 
        borderRadius: 75, 
    },
    uploadIcon: { 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: '#000', 
        position: 'absolute', 
        bottom: 5, 
        right: 5, 
    },
    cancelStyle: {
        paddingHorizontal: 10, 
        paddingVertical: 8, 
        marginRight: 5,
    },
    submitStyle: {
        backgroundColor: ORANGE, 
        paddingHorizontal: 20, 
        paddingVertical: 8, 
        borderRadius: 5,
    },
    loadingContainer: { 
        padding: 30, 
        backgroundColor: 'white', 
        borderRadius: 10, 
        shadowOffset: {
            width: 0, 
            height: 2
        }, 
        shadowRadius: 10, 
        shadowOpacity: 0.1 
    }
};

export { RestaurantPopup };
