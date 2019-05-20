import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Center } from '../Center';

const AddButton = ({ onPress }) => {
    return (
        <Center style={{ marginVertical: 10, }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
                <Icon 
                    name='plus' 
                    type='material-community' 
                    color='#333' 
                />
            </TouchableOpacity>
        </Center>
    );
};

const styles = {
    buttonStyle: {
        backgroundColor: '#FFF', 
        padding: 5, 
        borderRadius: 100, 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1,
    }
};

export { AddButton };
