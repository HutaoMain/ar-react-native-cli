import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MuscleGainAdvance from '../screens/MuscleGainAdvance';
import ARScreenArcherPushup from '../screens/ARScreens/gainmuscle/advance/ARScreenArcherPushup';
import ARScreenDiamondPushup from '../screens/ARScreens/gainmuscle/advance/ARScreenDiamondPushup';
import ARSCreenHandStandPushup from '../screens/ARScreens/gainmuscle/advance/ARScreenHandStandPushup';
import ARScreenPullup from '../screens/ARScreens/gainmuscle/advance/ARScreenPullup';

const MuscleGainAdvanceNavigation = () => {
  const MuscleGainAdvanceNavigationStack = createNativeStackNavigator();

  return (
    <MuscleGainAdvanceNavigationStack.Navigator>
      <MuscleGainAdvanceNavigationStack.Screen
        name="MuscleGainAdvance"
        component={MuscleGainAdvance}
        options={{headerShown: false}}
      />

      <MuscleGainAdvanceNavigationStack.Screen
        name="ARScreenArcherPushup"
        component={ARScreenArcherPushup}
        options={{headerShown: false}}
      />

      <MuscleGainAdvanceNavigationStack.Screen
        name="ARScreenDiamondPushup"
        component={ARScreenDiamondPushup}
        options={{headerShown: false}}
      />

      <MuscleGainAdvanceNavigationStack.Screen
        name="ARSCreenHandStandPushup"
        component={ARSCreenHandStandPushup}
        options={{headerShown: false}}
      />

      <MuscleGainAdvanceNavigationStack.Screen
        name="ARScreenPullup"
        component={ARScreenPullup}
        options={{headerShown: false}}
      />
    </MuscleGainAdvanceNavigationStack.Navigator>
  );
};

export default MuscleGainAdvanceNavigation;
