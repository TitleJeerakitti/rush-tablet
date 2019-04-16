import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
// import { Font, ScreenOrientation } from 'expo';
// import { connect } from 'react-redux';
import { NavHamberger, IconTab } from './components/common';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import SideMenu from './components/SideMenu';
import OrderManagement from './components/OrderManagement';
import QueueManagement from './components/QueueManagement';
import MenuManagement from './components/MenuManagement';

class RouterComponent extends React.Component {
    render() {
        const { tabBarStyle } = styles;
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Scene key='auth' initial hideNavBar>
                        <Scene key='login' component={LoginForm} initial />
                    </Scene>
                    <Drawer key='app' contentComponent={SideMenu}>
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='main' icon={IconTab} iconName='home'>
                                    <Scene 
                                        key='mainHome' 
                                        component={MainMenu} 
                                        title='Restaurant' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                                <Scene key='order' icon={IconTab} iconName='shopping' initial>
                                    <Scene 
                                        key='mainOrder' 
                                        component={OrderManagement} 
                                        title='Order Management' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                                <Scene key='queue' icon={IconTab} iconName='account-group'>
                                    <Scene 
                                        key='mainQueue' 
                                        component={QueueManagement} 
                                        title='Queue Management' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                                <Scene key='menu' icon={IconTab} iconName='food'>
                                    <Scene 
                                        key='mainMenu' 
                                        component={MenuManagement} 
                                        title='Restaurant' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                                <Scene key='analyse' icon={IconTab} iconName='chart-bar'>
                                    <Scene 
                                        key='mainAnalyse' 
                                        component={MainMenu} 
                                        title='Restaurant' 
                                        navBar={NavHamberger}
                                        initial
                                    />
                                </Scene>
                            </Tabs>
                        </Scene>
                    </Drawer>
                </Scene>
            </Router>
        );
    }
}

const styles = {
    tabBarStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 2,
        elevation: 10,
    }
};

export default RouterComponent;
