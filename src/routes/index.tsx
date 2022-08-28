import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home';
import Create from '../pages/create';
import Update from '../pages/update';


const Routes = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Update" component={Update} />
        </Stack.Navigator>
    );
}

export default Routes