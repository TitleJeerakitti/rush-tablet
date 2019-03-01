import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { Row, OrderDetail, OrderList, OrderConfirmation } from './common';
import { EGG, } from '../config';

class MainMenu extends React.Component {
    render() {
        const { rightContainer } = styles;
        return (
            <Row style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <Text>Menu List</Text>
                </View>
                <View style={rightContainer}>
                    <OrderDetail />
                    <ScrollView style={{ flex: 1 }}>
                        <OrderList 
                            name='Chicken'
                            amount={1}
                            price='80.00'
                            total='80.00'
                        />
                    </ScrollView>
                    <OrderConfirmation 
                        price='372.00'
                        vat='28.00'
                        total='400.00'
                        onClear={() => console.log('clear')}
                        onSubmit={() => console.log('submit')}
                    />
                </View>
            </Row>
        );
    }
}

const styles = {
    rightContainer: {
        flex: 2, 
        backgroundColor: EGG, 
        shadowOffset: {
            width: 0, 
            height: 0 
        }, 
        shadowRadius: 10, 
        shadowOpacity: 0.1,
    }
};

export default MainMenu;
