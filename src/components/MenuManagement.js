import React from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Row, MenuNumItem, AddButton, MenuManageContainer } from './common';
import { DARK_RED, ORANGE, YELLOW, BLACK_PINK, PINK, BLACK_RED, } from '../colors';
import { SERVER, GET_API_HEADERS, } from '../config';
import { RestaurantPopup } from './common/Popup';

const CURRENT_MAIN = 'CURRENT_MAIN';
const CURRENT_SUB = 'CURRENT_SUB';
const MENU_SELECT = 'MENU_SELECT';
const INITIAL_MENU = {
    isEmpty: false,
    name: '',
    price: 0,
    picture: undefined,
};

class MenuManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMain: null,
            currentSub: null,
            currentMenu: undefined,
            menus: [],
            visible: false,
        };
    }

    componentDidMount() {
        this.setState({
            menus: this.props.restaurant_menu,
        });
    }

    onPressGear(condition, item) {
        switch (condition) {
            case CURRENT_MAIN: 
                return;
            case CURRENT_SUB:
                return;
            case MENU_SELECT:
                return this.setState({ visible: true, currentMenu: item, });
            default: 
                return;
        }   
    }

    setSelect(condition, index, item) {
        switch (condition) {
            case CURRENT_MAIN: 
                if (this.state.currentMain === index) {
                    return;
                }
                return this.setState({ 
                    currentMain: index, 
                    currentSub: null 
                });
            case CURRENT_SUB:
                if (this.state.currentSub === index) {
                    return;
                }
                return this.setState({ 
                    currentSub: index 
                });
            case MENU_SELECT:
                return this.setState({ visible: true, currentMenu: item, });
            default: 
                return;
        }   
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
    
    renderAnimation() {
        LayoutAnimation.easeInEaseOut();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    renderMenuItem(items = [], color, condition, isSelect) {
        // console.log(items)
        return items.map((item, index) => 
            <MenuNumItem 
                key={index}
                text={item.name}
                number={index + 1}
                color={color}
                onPress={() => {
                    this.setSelect(condition, index, item);
                    this.renderAnimation();
                }}
                onIconPress={() => {
                    this.onPressGear(condition, item);
                }}
                selected={isSelect === index}
            />
        );
    }

    renderPopup() {
        if (this.state.currentMenu !== undefined) {
            return (
                <RestaurantPopup 
                    visible={this.state.visible}
                    menu={this.state.currentMenu}
                    onCancel={() => this.setState({ visible: false, currentMenu: undefined, })}
                    onSave={() => this.setState({ visible: false, })}
                />
            );
        }
    }

    render() {
        const { menus, currentMain, currentSub, } = this.state;
        return (
            <Row style={{ flex: 1, }}>
                <MenuManageContainer
                    title='MAIN CATEGORY'
                    emptyText='EMPTY MAIN CATEGORY'
                    condition
                    colors={[BLACK_RED, DARK_RED]}
                >
                    {this.renderMenuItem(
                        menus, 
                        BLACK_RED, 
                        CURRENT_MAIN, 
                        currentMain,
                    )}
                    <AddButton 
                        onPress={() => console.log('add')}
                    />
                </MenuManageContainer>
                <MenuManageContainer
                    title='SUB CATEGORY'
                    emptyText='EMPTY SUB CATEGORY'
                    condition={currentMain !== null}
                    colors={[BLACK_PINK, PINK]}
                >
                    {this.renderMenuItem(
                        currentMain !== null ? menus[currentMain].sub_categories : undefined,
                        BLACK_PINK, 
                        CURRENT_SUB, 
                        currentSub,
                    )}
                    <AddButton />
                </MenuManageContainer>
                <MenuManageContainer
                    title='SUB CATEGORY'
                    emptyText='EMPTY SUB CATEGORY'
                    condition={currentSub !== null}
                    colors={[ORANGE, YELLOW]}
                >
                    {this.renderMenuItem(
                        currentSub !== null ? menus[currentMain].sub_categories[currentSub].menus : undefined,
                        ORANGE,
                        MENU_SELECT,
                    )}
                    <AddButton 
                        onPress={() => this.setState({ visible: true, currentMenu: INITIAL_MENU, })}
                    />
                </MenuManageContainer>
                {this.renderPopup()}
            </Row>
        );
    }
}

const mapStateToProps = ({ restaurant }) => {
    const { restaurant_menu } = restaurant;
    return { restaurant_menu };
};

export default connect(mapStateToProps)(MenuManagement);
