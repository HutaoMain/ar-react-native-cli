import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStackNavigation = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigation;
