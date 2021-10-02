import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './screen/HomeScreen';
import BillDetailsScreen from './screen/bill-details';
import AddBillScreen from './screen/add-bill';
import Splash from './screen/Splash';
import EditBillScreen from './screen/edit-bill';

const HomeStack = createStackNavigator();

const BaseStack = () => {
  return (
    <NavigationContainer screenOptions={{animationEnabled: false}}>
      <HomeStack.Navigator screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="BillDetailsScreen"
          component={BillDetailsScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="AddBillScreen"
          component={AddBillScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
        <HomeStack.Screen
          name="EditBillScreen"
          component={EditBillScreen}
          options={{headerShown: false, animationEnabled: false}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default BaseStack;
