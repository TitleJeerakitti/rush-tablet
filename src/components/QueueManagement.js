import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { 
    Row, 
    QueueCard, 
    QueueList, 
    ContainerBorderRadiusTop, 
    LoadingImage, 
    EmptyView 
} from './common';
import { ORANGE, YELLOW, BLACK_PINK, PINK, } from '../colors';
import { SERVER, GET_QUEUE, AUTH_HEADER, CALL_QUEUE } from '../config';

class QueueManagement extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            onlineOrder: [],
            walkinOrder: [],
            loading: true,
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        const { offline_queue, online_queue } = await this.fetchDataAPI(GET_QUEUE);
        if (this._isMounted) {
            await this.setState({
                onlineOrder: online_queue,
                walkinOrder: offline_queue,
                loading: false,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // to refresh must not equal to loading now (first start -> after loading always false)
        // and loading now and past must be equal
        if ((this.props.refresh !== this.state.loading) && (prevState.loading === this.state.loading)) {
            this.setState({ loading: true });
            this.componentDidMount();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCallQueueAgain(onlineOrder) {
        if (onlineOrder.length > 0) {
            this.callQueueAPI(onlineOrder[0].queue_number);
        }
    }

    async fetchDataAPI(endpoint) {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${endpoint}`, {
                headers: AUTH_HEADER(token_type, access_token),
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            Alert.alert('Unstable Network!');
            return [];
        }
    }

    async callQueueAPI(queue_number) {
        try {
            const { token_type, access_token } = this.props.token;
            await fetch(`${SERVER}${CALL_QUEUE}`, {
                method: 'POST',
                headers: AUTH_HEADER(token_type, access_token),
                body: JSON.stringify({
                    queue_number,
                })
            });
        } catch (error) {
            Alert.alert('Unstable Network!');
        }
    }

    renderQueueList(items, headerColor, buttonColor) {
        return items.map(item =>
            <QueueList 
                key={item.queue_number}
                queue={item.queue_number} 
                headerColor={headerColor}
                buttonColor={buttonColor}
                // onMore={() => console.log('MORE of ', item.order_id)}
                // onGrab={() => console.log(onGrab)}
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
                        queue={onlineOrder.length > 0 ? onlineOrder[0].queue_number : 'NO QUEUE'}
                        colors={[ORANGE, YELLOW]}
                        buttonColor={YELLOW}
                        onAgain={() => this.onCallQueueAgain(onlineOrder)}
                        // onNext={() => console.log('Next')}
                    />
                    <ContainerBorderRadiusTop>
                        <Text style={styles.textDescription}>Passed Queue</Text>
                        <EmptyView
                            emptyText='EMPTY QUEUE'
                            condition={onlineOrder.length > 0}
                        >
                            {/* {this.renderQueueList(onlineOrder, ORANGE, YELLOW, ONLINE_QUEUE)} */}
                            <FlatList 
                                style={{ padding: 5, }}
                                data={onlineOrder}
                                keyExtractor={(item) => item.queue_number}
                                renderItem={({ item }) => 
                                    <QueueList 
                                        queue={item.queue_number} 
                                        headerColor={ORANGE}
                                        buttonColor={YELLOW}
                                    />
                                }
                                numColumns={2}
                            />
                        </EmptyView>
                    </ContainerBorderRadiusTop>
                </View>
                <View style={{ flex: 1, }}>
                    <QueueCard 
                        header='Walk-In Queue'
                        queue={walkinOrder.length > 0 ? walkinOrder[0].queue_number : 'NO QUEUE'}
                        colors={[BLACK_PINK, PINK]}
                        buttonColor={PINK}
                        // onAgain={() => console.log('Again')}
                        // onNext={() => console.log('Next')}
                    />
                    <ContainerBorderRadiusTop>
                        <Text style={styles.textDescription}>Passed Queue</Text>
                        <EmptyView
                            emptyText='EMPTY QUEUE'
                            condition={walkinOrder.length > 0}
                        >
                            <FlatList 
                                style={{ padding: 5, }}
                                data={walkinOrder}
                                keyExtractor={(item) => item.queue_number}
                                renderItem={({ item }) => 
                                    <QueueList 
                                        queue={item.queue_number} 
                                        headerColor={BLACK_PINK}
                                        buttonColor={PINK}
                                    />
                                }
                                numColumns={2}
                            />
                        </EmptyView>
                    </ContainerBorderRadiusTop>
                </View>
            </Row>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};

const styles = {
    textDescription: {
        padding: 10, 
        fontWeight: 'bold',
    },
};

export default connect(mapStateToProps)(QueueManagement);
