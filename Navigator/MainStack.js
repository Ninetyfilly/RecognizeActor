import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MenuScreen from '../Views/MenuScreen';
import ActorScreen from '../Views/ActorScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Actor" component={ActorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
