import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
// import { Font, ScreenOrientation } from 'expo';
// import { connect } from 'react-redux';
import { NavHamberger, IconTab } from './components/common'
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';

class RouterComponent extends React.Component {
    render() {
        const { tabBarStyle } = styles;
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Router key='login' component={LoginForm}/>
                    <Drawer key='app' /*contentComponent={SideMenu}*/ initial>
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='main' icon={IconTab} iconName='home' initial>
                                    <Scene 
                                        key='mainmenu' 
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
