import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { CardSection } from '../CardSection';
import { Row } from '../Row';
import { GRAY } from '../../../colors';

const MenuRankingCard = ({ name, amount, rank, image }) => {
    return (
        <CardSection>
            <Row 
                style={{ 
                    backgroundColor: '#FFF', 
                    borderRadius: 10,
                    padding: 10, 
                    shadowOffset: { 
                        width: 0, 
                        height: 2 
                    }, 
                    shadowOpacity: 0.1,
                }}
            >
                <Image 
                    resizeMode='cover' 
                    style={{ width: 50, height: 50, borderRadius: 25, }} 
                    source={{ uri: image }} 
                />
                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', }}>{name}</Text>
                    <Row>
                        <Text style={{ marginRight: 5, color: GRAY }}>{amount}</Text>
                        <Icon name='restaurant-menu' type='material' size={16} color={GRAY} />
                    </Row>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 26, color: '#CCC' }}>
                        # {rank}
                    </Text>
                </View>
            </Row>
        </CardSection>
    );
};

export { MenuRankingCard };
