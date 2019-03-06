import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import { Row, QueueCard, QueueList, ContainerBorderRadiusTop } from './common';
import { ORANGE, YELLOW, } from '../config';

class QueueManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineOrder: [],
            walkinOrder: [],
        };
    }

    async componentDidMount() {
        const [online, walkin] = await Promise.all([
            this.fetchDataAPI('online_queue'),
            this.fetchDataAPI('walkin_queue'),
        ]);
        await this.setState({
            onlineOrder: online,
            walkinOrder: walkin,
        });
    }

    async fetchDataAPI(endpoint) {
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    renderOnlineList() {
        if (this.state.onlineOrder.length > 0) {
            return this.state.onlineOrder.map(order =>
                <QueueList 
                    key={order.order_id}
                    queue={order.queue_number} 
                    headerColor={ORANGE}
                    buttonColor={YELLOW}
                    online
                />
            );
        }
    }

    renderWalkinList() {
        if (this.state.walkinOrder.length > 0) {
            return this.state.walkinOrder.map(order =>
                <QueueList 
                    key={order.order_id}
                    queue={order.queue_number} 
                    headerColor='#D01B60'
                    buttonColor='#FF2277'
                />
            );
        }
    }

    render() {
        const { onlineOrder, walkinOrder } = this.state;
        return (
            <Row style={{ flex: 1, backgroundColor: '#F0F0F0', }}>
                <View style={{ flex: 1, }}>
                    <QueueCard 
                        header='Online Queue'
                        queue={onlineOrder.length > 0 ? onlineOrder[0].queue_number : 'LOADING'}
                        colors={[ORANGE, YELLOW]}
                        buttonColor={YELLOW}
                        onAgain={() => console.log('Again')}
                        onNext={() => console.log('Next')}
                    />
                    <ContainerBorderRadiusTop>
                        <Text style={styles.textDescription}>Passed Queue</Text>
                        <ScrollView style={{ flex: 1, }}>
                            {this.renderOnlineList()}
                        </ScrollView>
                    </ContainerBorderRadiusTop>
                </View>
                <View style={{ flex: 1, }}>
                    <QueueCard 
                        header='Walk-In Order'
                        queue={walkinOrder.length > 0 ? walkinOrder[0].queue_number : 'LOADING'}
                        colors={['#D01B60', '#FF2277']}
                        buttonColor='#FF2277'
                        onAgain={() => console.log('Again')}
                        onNext={() => console.log('Next')}
                    />
                    <ContainerBorderRadiusTop>
                        <Text style={styles.textDescription}>Passed Queue</Text>
                        <ScrollView style={{ flex: 1, }}>
                            {this.renderWalkinList()}
                        </ScrollView>
                    </ContainerBorderRadiusTop>
                </View>
            </Row>
        );
    }
}

const styles = {
    textDescription: {
        padding: 10, 
        fontWeight: 'bold',
    },
};

export default QueueManagement;
