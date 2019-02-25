import React from 'react';
import { Router, Scene, Actions, Drawer, Tabs } from 'react-native-router-flux';
import { Font, ScreenOrientation } from 'expo';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Router key='login' component={LoginForm} initial/>
                    <Drawer key='app' /*contentComponent={SideMenu}*/>
                        <Scene key='container' hideNavBar>
                            <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={false}>
                                <Scene key='homepage' icon={IconTab} iconName='home' initial>
                                    <Scene 
                                        key='home_homepage' 
                                        component={HomeScreen} 
                                        title='R U S H' 
                                        navBar={NavHamberger}
                                        onRight={() => Actions.search_name()}
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

export default RouterComponent;
