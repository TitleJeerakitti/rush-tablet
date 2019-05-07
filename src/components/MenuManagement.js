import React from 'react';
import { LayoutAnimation, UIManager, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, ImagePicker } from 'expo';
import { Row, MenuNumItem, AddButton, MenuManageContainer } from './common';
import { DARK_RED, ORANGE, YELLOW, BLACK_PINK, PINK, BLACK_RED, } from '../colors';
import { 
    SERVER, 
    AUTH_HEADER, 
    MENU_MODIFY, 
    GET_MAIN_MENU, 
    MAIN_CATEGORY_MODIFY, 
    SUB_CATEGORY_MODIFY, 
} from '../config';
import { RestaurantPopup, CategoryDetail } from './common/Popup';
import { restaurantCollect } from '../actions';

const CURRENT_MAIN = 'CURRENT_MAIN';
const CURRENT_SUB = 'CURRENT_SUB';
const MENU_SELECT = 'MENU_SELECT';
const INITIAL_MENU = {
    is_out_of_stock: false,
    is_display: true,
    id: null,
    name: '',
    price: '',
    picture: 'https://i.imgur.com/aVnb6Qv.png',
    isNew: true,
};

const INITIAL_CATEGORY = {
    isNew: true,
    id: null,
    name: '',
    is_display: true,
};

class MenuManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMain: null,
            currentSub: null,
            currentMenu: INITIAL_MENU,
            currentCategory: null,
            imageURL: null,
            menus: [],
            visible: false,
            loading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            menus: this.props.restaurant_menu,
        });
    }

    onPressGear(condition, item) {
        switch (condition) {
            case CURRENT_MAIN:
            case CURRENT_SUB:
                return this._isMounted && this.setState({ currentCategory: item });
            case MENU_SELECT:
                return this._isMounted && this.setState({ 
                    visible: true, 
                    currentMenu: item, 
                    imageURL: null 
                });
            default: 
                return;
        }   
    }

    async onDeleteCategory(currentCategory) {
        if (currentCategory.menus !== undefined) {
            const data = {
                main_category_id: this.state.menus[this.state.currentMain].id,
                name: currentCategory.name,
                is_display: false,
                sub_category_id: currentCategory.id,
            };
            const result = await this.fetchDataAPI(
                SUB_CATEGORY_MODIFY, 
                'POST', 
                JSON.stringify(data)
            );
            if (this._isMounted && result.status === 200) {
                this.setState({ 
                    currentSub: null, 
                    currentMenu: INITIAL_MENU, 
                    currentCategory: null 
                });
                this.refreshMenuList();
            }
        } else {
            const data = {
                main_category_id: currentCategory.id,
                name: currentCategory.name,
                is_display: false,
            };
            const result = await this.fetchDataAPI(
                MAIN_CATEGORY_MODIFY, 
                'POST', 
                JSON.stringify(data)
            );
            if (this._isMounted && result.status === 200) {
                this.setState({ 
                    currentMain: null, 
                    currentSub: null, 
                    currentMenu: INITIAL_MENU, 
                    currentCategory: null 
                });
                this.refreshMenuList();
            }
        }
    }

    async onCreateUpdateCategory(currentCategory) {
        if (currentCategory.menus !== undefined) {
            const data = {
                main_category_id: this.state.menus[this.state.currentMain].id,
                name: currentCategory.name,
                is_display: true,
                sub_category_id: currentCategory.id,
            };
            const result = await this.fetchDataAPI(
                SUB_CATEGORY_MODIFY, 
                'POST', 
                JSON.stringify(data)
            );
            if (this._isMounted && result.status === 200) {
                this.setState({ currentCategory: null });
                this.refreshMenuList();
            }
        } else {
            const data = {
                main_category_id: currentCategory.id,
                name: currentCategory.name,
                is_display: true,
            };
            const result = await this.fetchDataAPI(
                MAIN_CATEGORY_MODIFY, 
                'POST',
                JSON.stringify(data)
            );
            if (this._isMounted && result.status === 200) {
                this.setState({ currentCategory: null });
                this.refreshMenuList();
            }
        }
    }

    async onDelete(currentMenu) {
        const { menus, currentMain, currentSub, imageURL } = this.state;
        const data = {
            name: currentMenu.name,
            id: currentMenu.id,
            price: currentMenu.price,
            image: imageURL,
            is_out_of_stock: false,
            is_display: false,
            sub_category_id: menus[currentMain].sub_categories[currentSub].id,
        };
        // console.log(data);
        const result = await this.fetchDataAPI(MENU_MODIFY, 'POST', JSON.stringify(data));
        if (result.status === 200) {
            this.refreshMenuList();
        }
    }

    async onCreateUpdate(currentMenu) {
        const { menus, currentMain, currentSub, imageURL } = this.state;
        const data = {
            name: currentMenu.name,
            id: currentMenu.id,
            price: currentMenu.price,
            image: imageURL,
            is_out_of_stock: currentMenu.is_out_of_stock,
            is_display: currentMenu.is_display,
            sub_category_id: menus[currentMain].sub_categories[currentSub].id,
        };
        // console.log(data);
        const result = await this.fetchDataAPI(MENU_MODIFY, 'POST', JSON.stringify(data));
        if (result.status === 200) {
            this.refreshMenuList();
        }
    }

    async getCameraRollAsync() {
        const { status, /* permissions */ } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
        //   return Location.getCurrentPositionAsync({enableHighAccuracy: true});
            this.selectPhoto();
        } else {
          throw new Error('Location permission not granted');
        }
    }

    setSelect(condition, index, item) {
        if (this._isMounted) {
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
                    return this.setState({ visible: true, currentMenu: item, imageURL: null });
                default: 
                    return;
            }   
        }
    }

    async selectPhoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
        });
        const imageUri = `data:image/jpg;base64,${result.base64}`;
        if (this._isMounted) {
            this.setState({ imageURL: imageUri, });
        }
    }

    async selectCategory(data) {
        if (this._isMounted) {
            await this.setState({ currentCategory: { ...INITIAL_CATEGORY, ...data } });
        }
    }

    async fetchDataAPI(endpoint, method = 'GET', body = null) {
        try {
            const { token_type, access_token } = this.props.token;
            const response = await fetch(`${SERVER}${endpoint}`, {
                method,
                headers: AUTH_HEADER(token_type, access_token),
                body,
            });
            return response;
        } catch (error) {
            Alert.alert('Unstable Network!');
            this.setState({ loading: false, });
            return [];
        }
    }

    async refreshMenuList() {
        const response = await this.fetchDataAPI(GET_MAIN_MENU);
        const responseData = await response.json();
        if (response.status === 200) {
            this.setState({ visible: false, currentMenu: INITIAL_MENU, imageURL: null, loading: false });
            this.props.restaurantCollect(responseData);
            this.componentDidMount();
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
        const { currentMenu, visible, loading } = this.state;
        if (currentMenu !== undefined) {
            return (
                <RestaurantPopup 
                    loading={loading}
                    visible={visible}
                    menu={currentMenu}
                    onCancel={() => this._isMounted && this.setState({ 
                        visible: false, 
                        currentMenu: INITIAL_MENU, 
                        imageURL: null 
                    })}
                    onSave={() => {
                        this.renderAnimation();
                        this.setState({ loading: true });
                        this.onCreateUpdate(this.state.currentMenu);
                    }}
                    onDelete={() => {
                        Alert.alert(
                            'Are you sure?',
                            'to delete this menu',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                { 
                                    text: 'Confirm', 
                                    onPress: () => {
                                        this.renderAnimation();
                                        this.setState({ loading: true });
                                        this.onDelete(this.state.currentMenu);
                                    }
                                },
                            ],
                                { cancelable: false },
                        );
                    }}
                    onChangeName={(text) => this._isMounted && this.setState({ 
                        currentMenu: { ...currentMenu, name: text, } 
                    })}
                    onChangePrice={(text) => this._isMounted && this.setState({ 
                        currentMenu: { ...currentMenu, price: text } 
                    })}
                    onChangeOutOfStock={() => this._isMounted && this.setState({ 
                        currentMenu: { 
                            ...currentMenu, 
                            is_out_of_stock: !currentMenu.is_out_of_stock 
                        } 
                    })}
                    onChangePicture={() => this.getCameraRollAsync()}
                    imageURL={this.state.imageURL}
                />
            );
        }
    }

    render() {
        const { menus, currentMain, currentSub, loading } = this.state;
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
                        onPress={() => this.selectCategory()}
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
                    <AddButton 
                        onPress={() => this.selectCategory({ menus: '' })}
                    />
                </MenuManageContainer>
                <MenuManageContainer
                    title='MENU'
                    emptyText='EMPTY MENU'
                    condition={currentSub !== null}
                    colors={[ORANGE, YELLOW]}
                >
                    {this.renderMenuItem(
                        currentSub !== null ? 
                            menus[currentMain].sub_categories[currentSub].menus : undefined,
                        ORANGE,
                        MENU_SELECT,
                    )}
                    <AddButton 
                        onPress={() => this._isMounted && this.setState({ 
                            visible: true, 
                            currentMenu: INITIAL_MENU, 
                            imageURL: null, 
                        })}
                    />
                </MenuManageContainer>
                {this.renderPopup()}
                <CategoryDetail 
                    loading={loading}
                    visible={this.state.currentCategory !== null} 
                    data={this.state.currentCategory}
                    onChangeText={(text) => this._isMounted && this.setState({ currentCategory: {
                        ...this.state.currentCategory, name: text,
                    } })}
                    onCancel={() => this._isMounted && this.setState({ currentCategory: null })}
                    onDelete={() => {
                        Alert.alert(
                            'Are you sure?',
                            'to delete this one',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                { 
                                    text: 'Confirm', 
                                    onPress: () => {
                                        this.renderAnimation();
                                        this.setState({ loading: true, });
                                        this.onDeleteCategory(this.state.currentCategory);
                                    } 
                                },
                            ],
                                { cancelable: false },
                          );
                    }}
                    // this.onDeleteCategory(this.state.currentCategory)
                    onSave={() => {
                        this.renderAnimation();
                        this.setState({ loading: true, });
                        this.onCreateUpdateCategory(this.state.currentCategory);
                    }}
                />
            </Row>
        );
    }
}

const mapStateToProps = ({ restaurant, auth }) => {
    const { restaurant_menu } = restaurant;
    const { token } = auth;
    return { restaurant_menu, token };
};

export default connect(mapStateToProps, { restaurantCollect })(MenuManagement);
