import React from 'react';
import { Modal, Text, View, Image, TouchableOpacity, Alert, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Constants, } from 'expo';
import { Row } from '../Row';
import { ORANGE, LIGHT_GRAY, GRAY, DARK_RED } from '../../../colors';
import { Button } from '../Button';
import { Center } from '../Center';
import { InputWithDescription } from './InputWithDescription';
import { Space } from '../Space';
import { CheckBox } from '../CheckBox';

class RestaurantPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmpty: this.props.isEmpty,
            name: this.props.menu.name,
            price: this.props.menu.price.toFixed(2),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.name !== this.props.menu.name) {
            this.setState({
                isEmpty: this.props.isEmpty,
                name: this.props.menu.name,
                price: this.props.menu.price.toFixed(2),
            });
        }
    }

    render() {
        const { 
            container, 
            popupContainer, 
            imageStyle, 
            uploadIcon, 
            cancelStyle,
            submitStyle,
        } = styles;
        const { visible, onCancel, onSave, } = this.props;
        const { isEmpty, name, price = '', } = this.state;
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
                <Center style={container}>
                    <Row style={popupContainer}>
                        <Image 
                            resizeMode='cover'
                            source={{ uri: 'http://dustyroom.com/wp-content/uploads/2017/01/empty-featured2-1.png' }} 
                            style={imageStyle} 
                        />
                        <Center style={uploadIcon}>
                            <Icon name='camera' type='material-community' color='#FFF' size={18} />
                        </Center>
                        <View style={{ flex: 1, marginLeft: 20, }}>
                            <InputWithDescription 
                                title='Menu Name'
                                placeholder='Menu Name'
                                value={name || null}
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                            <InputWithDescription 
                                title='Price'
                                placeholder='ex. 100.00'
                                value={price || null}
                                onChangeText={(text) => this.setState({ price: text })}
                                style={{ marginTop: 10 }}
                            />
                            <Row style={{ marginTop: 20, alignItems: 'center', }}>
                                <CheckBox 
                                    onPress={() => this.setState({ isEmpty: !isEmpty })} 
                                    title='Out of Stock'
                                    isCheck={isEmpty}
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
                </Center>
            </Modal>
        );
    }
}

const styles = {
    container: { 
        flex: 1,
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
        bottom: 30, 
        left: 135, 
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
    }
};

export { RestaurantPopup };
