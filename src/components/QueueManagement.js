import React from 'react';
import { View, Text, } from 'react-native';
import { 
    Row, 
    QueueCard, 
    QueueList, 
    ContainerBorderRadiusTop, 
    LoadingImage, 
    EmptyView 
} from './common';
import { ORANGE, YELLOW, BLACK_PINK, PINK, } from '../colors';
import { GET_API_HEADERS, SERVER, ONLINE_QUEUE, WALKIN_QUEUE } from '../config';

class QueueManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineOrder: [],
            walkinOrder: [],
            loading: true,
        };
    }

    async componentDidMount() {
        const [online, walkin] = await Promise.all([
            this.fetchDataAPI(ONLINE_QUEUE),
            this.fetchDataAPI(WALKIN_QUEUE),
        ]);
        await this.setState({
            onlineOrder: online,
            walkinOrder: walkin,
            loading: false,
        });
    }

    async fetchDataAPI(endpoint) {
        try {
            const response = await fetch(`${SERVER}${endpoint}`, {
                headers: GET_API_HEADERS,
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    renderQueueList(items, headerColor, buttonColor, onGrab) {
        return items.map(item =>
            <QueueList 
                key={item.order_id}
                queue={item.queue_number} 
                headerColor={headerColor}
                buttonColor={buttonColor}
                onMore={() => console.log('MORE of ', item.order_id)}
                onGrab={() => console.log(onGrab)}
            />
        );
    }

    render() {
        const { onlineOrder, walkinOrder, loading, } = this.state;
        if (loading) {
            return <LoadingImage />;
        }
        return (
            <Row style={{ flex: 1, }}>
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
                        <EmptyView
                            emptyText='EMPTY QUEUE'
                            condition={onlineOrder.length > 0}
                        >
                            {this.renderQueueList(onlineOrder, ORANGE, YELLOW, ONLINE_QUEUE)}
                        </EmptyView>
                    </ContainerBorderRadiusTop>
                </View>
                <View style={{ flex: 1, }}>
                    <QueueCard 
                        header='Walk-In Queue'
                        queue={walkinOrder.length > 0 ? walkinOrder[0].queue_number : 'LOADING'}
                        colors={[BLACK_PINK, PINK]}
                        buttonColor={PINK}
                        onAgain={() => console.log('Again')}
                        onNext={() => console.log('Next')}
                    />
                    <ContainerBorderRadiusTop>
                        <Text style={styles.textDescription}>Passed Queue</Text>
                        <EmptyView
                            emptyText='EMPTY QUEUE'
                            condition={walkinOrder.length > 0}
                        >
                            {this.renderQueueList(
                                walkinOrder, BLACK_PINK, PINK, WALKIN_QUEUE)}
                        </EmptyView>
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
