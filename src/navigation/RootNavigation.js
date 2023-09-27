import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import AuthStackNavigation from './AuthStackNavigation';
import useAuthStore from '../zustand/AuthStore';
import HomeStackNavigation from './HomeStackNavigation';

const RootNavigation = () => {
  const user = useAuthStore(state => state.user);
  return (
    <NavigationContainer>
      {user ? <HomeStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
