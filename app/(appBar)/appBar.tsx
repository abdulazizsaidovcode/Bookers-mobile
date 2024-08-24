import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilePage from '../(profile)';

const Drawer = createDrawerNavigator<any>();

export default function AppBar() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}
                drawerStyle={{
                    backgroundColor: '#21212E',
                    width: 240,
                }}
            >
                <Drawer.Screen name="Profile" component={ProfilePage} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
