import React from 'react';
import { Modal, Text, View, Image, TextInput, TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Constants, } from 'expo';
import { Row } from '../Row';
import { ORANGE, LIGHT_GRAY, GRAY, DARK_RED } from '../../../colors';
import { Button } from '../Button';
import { Center } from '../Center';

class RestaurantPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 80,
            isEmpty: false,
        };
    }

    render() {
        const { container, } = styles;
        return (
            <Modal
                animationType='slide'
                transparent
                visible={this.props.visible}
            >
                <Center style={{ flex: 1, marginTop: Constants.statusBarHeight, alignItems: 'center', justifyContent: 'center', }}>
                    <Row style={{ padding: 20, backgroundColor: '#FFF', borderRadius: 20, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, alignItems: 'center', width: 500, }}>
                        <Image 
                            resizeMode='cover'
                            source={{ uri: 'http://dustyroom.com/wp-content/uploads/2017/01/empty-featured2-1.png' }} 
                            style={{ width: 150, height: 150, borderRadius: 75, }} 
                        />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#000', position: 'absolute', bottom: 30, left: 135, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='camera' type='material-community' color='#FFF' size={18} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 20, }}>
                            <Row style={{ alignItems: 'center' }}>
                                <Text style={{ flex: 1, }}>Menu Name</Text>
                                <TextInput 
                                    placeholder='Munu Name' 
                                    style={{ padding: 5, backgroundColor: LIGHT_GRAY, borderRadius: 10, flex: 2, textAlign: 'center' }} 
                                    value='eiei'
                                />
                            </Row>
                            <Row style={{ alignItems: 'center', marginTop: 10, }}>
                                <Text style={{ flex: 1, }}>Price</Text>
                                <TextInput 
                                    placeholder='Munu Name' 
                                    style={{ padding: 5, backgroundColor: LIGHT_GRAY, borderRadius: 10, flex: 2, textAlign: 'center' }} 
                                    value={this.state.price.toFixed(2)}
                                />
                            </Row>
                            <Row style={{ marginTop: 20, alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => this.setState({ isEmpty: !this.state.isEmpty })} style={{ flex: 1, marginRight: 10, }} activeOpacity={1}>
                                    <Row style={{ alignItems: 'center', }}>
                                        <Icon 
                                            name={this.state.isEmpty ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'}
                                            type='material-community'
                                            containerStyle={{ marginRight: 5, }}
                                            color={this.state.isEmpty ? DARK_RED : GRAY}
                                        />
                                        <Text style={{ color: this.state.isEmpty ? DARK_RED : GRAY }}>Out of stock</Text>
                                    </Row>
                                </TouchableOpacity>
                                <Button 
                                    containerStyle={{ paddingHorizontal: 10, paddingVertical: 8, marginRight: 5, }}
                                    textStyle={{ color: GRAY }}
                                    hideOpacity
                                >
                                    CANCEL
                                </Button>
                                <Button 
                                    containerStyle={{ backgroundColor: ORANGE, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5, }}
                                    textStyle={{ color: '#FFF' }}
                                    hideOpacity
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
    }
};

export { RestaurantPopup };
