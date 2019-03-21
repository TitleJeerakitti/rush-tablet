import React from 'react';
import { Row, MenuNumItem, AddButton, MenuManageContainer } from './common';
import { DARK_RED, ORANGE, YELLOW, BLACK_PINK, PINK, BLACK_RED, DARK_ORANGE } from '../colors';
import { SERVER, GET_API_HEADERS, MAIN_CATEGORIES, SUB_CATEGORIES, MENUS } from '../config';
import { RestaurantPopup } from './common/Popup';

const CURRENT_MAIN = 'CURRENT_MAIN';
const CURRENT_SUB = 'CURRENT_SUB';

class MenuManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMain: null,
            currentSub: null,
            mainCategories: [], 
            subCategories: [], 
            menus: [],
        };
    }

    async componentDidMount() {
        const [mainCategories, subCategories, menus] = await Promise.all([
            this.fetchDataAPI(MAIN_CATEGORIES),
            this.fetchDataAPI(SUB_CATEGORIES),
            this.fetchDataAPI(MENUS),
        ]);
        await this.setState({
            mainCategories,
            subCategories,
            menus,
            loading: false,
        });
    }

    setSelect(condition, index) {
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
                return this.setState({ currentSub: index });
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

    renderMenuItem(items = [], color, condition, isSelect) {
        return items.map((item, index) => 
            <MenuNumItem 
                key={index}
                text={item.name}
                number={index + 1}
                color={color}
                onPress={() => this.setSelect(condition, index)}
                selected={isSelect === index}
            />
        );
    }

    render() {
        const { mainCategories, subCategories, currentMain, currentSub, menus } = this.state;

        return (
            <Row style={{ flex: 1, }}>
                <MenuManageContainer
                    title='MAIN CATEGORY'
                    emptyText='EMPTY MAIN CATEGORY'
                    condition
                    colors={[BLACK_RED, DARK_RED]}
                >
                    {this.renderMenuItem(
                        mainCategories, 
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
                        subCategories[currentMain], 
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
                        currentSub !== null ? menus[currentMain][currentSub] : undefined, 
                        ORANGE,
                    )}
                    <AddButton />
                </MenuManageContainer>
                <RestaurantPopup visible />
            </Row>
        );
    }
}

export default MenuManagement;
