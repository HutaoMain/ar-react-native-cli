import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Person from '../screens/Person';
import HomeStackNavigation from './HomeStackNavigation';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName;

          if (route.name === 'HomeStackNavigation') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'list-outline' : 'list-outline';
          } else if (route.name === 'Person') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? '#FD9206' : 'black'}
            />
          );
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Person"
        component={Person}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
