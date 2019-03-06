import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { Row } from '../Row';
import { GRAY } from '../../../config';

class QueueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.substringQueue(this.props.queue, 'type'),
            number: this.substringQueue(this.props.queue, 'number'),
        };
    }

    substringQueue(queue, role) {
        if (role === 'type') {
            return queue.substr(0, 1);
        } else if (role === 'number') {
            return queue.substr(2);
        }
        return;
    }

    renderExtraButton

    render() {
        const { headerColor, buttonColor, online, } = this.props;
        const { type, number } = this.state;
        const { container, queueType, queueText, } = styles;
        return (
            <Row style={container}>
                <View style={{ ...queueType, backgroundColor: headerColor, }}>
                    <Text style={{ ...queueText, color: 'white' }}>{type}</Text>
                </View>
                <View style={{ padding: 10, flex: 1, }}>
                    <Text style={queueText}>{number}</Text>
                </View>
                <TouchableOpacity style={{ padding: 10, }}>
                    <Text style={{ fontWeight: 'bold', color: GRAY, }}>MORE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, marginRight: 5, }}>
                    <Text style={{ fontWeight: 'bold', color: buttonColor, }}>
                        { online ? 'PAY' : 'GRAB' }
                    </Text>
                </TouchableOpacity>
            </Row>
        );
    }
}

const styles = {
    container: {
        borderRadius: 10, 
        backgroundColor: '#FFF', 
        shadowOffset: { 
            width: 0, 
            height: 0 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        marginHorizontal: 10, 
        marginTop: 10,
        alignItems: 'center',
    },
    queueType: {
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10,
    },
    queueText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
};

export { QueueList };
