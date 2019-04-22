import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { CardSection } from './CardSection';
import { Row } from './Row';
import { ORANGE, YELLOW, BLACK_PINK, GRAY, } from '../../colors';

const IMAGE_WIDTH = (((Dimensions.get('window').width * 0.4) - 20) / 3) - 40;
// https://imgur.com/XyV6nXk

class RankingState extends React.Component {
    renderImage(index) {
        const { topMenu } = this.props;
        if (topMenu[index] !== undefined) {
            return topMenu[index].image;
        }
        return 'https://imgur.com/XyV6nXk.png';
    }

    renderName(index) {
        const { topMenu } = this.props;
        if (topMenu[index] !== undefined) {
            return topMenu[index].name;
        }
        return 'NOT FOUND';
    }

    renderAmount(index) {
        const { topMenu } = this.props;
        if (topMenu[index] !== undefined) {
            return topMenu[index].amount;
        }
        return 'NONE';
    }

    render() {
        return (
            <CardSection>
                <Row style={styles.container}>
                    <View style={styles.subContainer}>
                        <View style={styles.shadowStyle} >
                            <Image 
                                style={styles.imageStyle} 
                                resizeMode='cover'
                                source={{ uri: this.renderImage(1) }}
                            />
                        </View>
                        <Text style={styles.menuText} numberOfLines={1}>
                            {this.renderName(1)}
                        </Text>
                        <Row>
                            <Text style={{ marginRight: 5, color: GRAY }}>{this.renderAmount(1)}</Text>
                            <Icon name='restaurant-menu' type='material' size={16} color={GRAY} />
                        </Row>
                        <View 
                            style={{ 
                                ...styles.rankingContainer, 
                                ...styles.shadowStyle, 
                                backgroundColor: ORANGE, 
                                borderTopLeftRadius: 5 
                            }}
                        >
                            <Text style={styles.rankingText}>RANK 2</Text>
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.shadowStyle} >
                            <Image 
                                style={styles.imageStyle} 
                                resizeMode='cover'
                                source={{ uri: this.renderImage(0) }}
                            />
                        </View>
                        <Text style={styles.menuText} numberOfLines={1}>
                            {this.renderName(0)}
                        </Text>
                        <Row>
                            <Text style={{ marginRight: 5, color: GRAY }}>{this.renderAmount(0)}</Text>
                            <Icon name='restaurant-menu' type='material' size={16} color={GRAY} />
                        </Row>
                        <View 
                            style={{ 
                                ...styles.rankingContainer, 
                                ...styles.shadowStyle, 
                                backgroundColor: YELLOW, 
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                height: 80,
                            }}
                        >
                            <Text style={styles.rankingText}>RANK 1</Text>
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.shadowStyle} >
                            <Image 
                                style={styles.imageStyle} 
                                resizeMode='cover'
                                source={{ uri: this.renderImage(2) }}
                            />
                        </View>
                        <Text style={styles.menuText} numberOfLines={1}>
                            {this.renderName(2)}
                        </Text>
                        <Row>
                            <Text style={{ marginRight: 5, color: GRAY }}>{this.renderAmount(2)}</Text>
                            <Icon name='restaurant-menu' type='material' size={16} color={GRAY} />
                        </Row>
                        <View 
                            style={{ 
                                ...styles.rankingContainer, 
                                ...styles.shadowStyle, 
                                backgroundColor: BLACK_PINK, 
                                borderTopRightRadius: 5 
                            }}
                        >
                            <Text style={styles.rankingText}>RANK 3</Text>
                        </View>
                    </View>
                </Row>
            </CardSection>
        );
    }
}

const styles = {
    container: { 
        alignItems: 'flex-end' 
    },
    subContainer: { 
        flex: 1, 
        alignItems: 'center' 
    },
    shadowStyle: { 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.2, 
        shadowRadius: 5 
    },
    imageStyle: {
        width: IMAGE_WIDTH, 
        height: IMAGE_WIDTH, 
        borderRadius: IMAGE_WIDTH / 2,
    },
    menuText: { 
        fontWeight: 'bold', 
        marginTop: 5, 
    },
    rankingContainer: { 
        height: 50,
        marginTop: 5,
        width: '100%', 
        alignItems: 'center', 
    },
    rankingText: {
        fontWeight: 'bold', 
        color: '#FFF', 
        marginTop: 10, 
        fontSize: 18,
    }
};

export { RankingState };
