import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeightLossBeginner from '../screens/WeightLossBeginner';
import ARScreenButtKicks from '../screens/ARScreens/weightloss/beginner/ARScreenButtKicks';
import ARScreenHighKnees from '../screens/ARScreens/weightloss/beginner/ARScreenHighKnees';
import ARScreenJogInPlace from '../screens/ARScreens/weightloss/beginner/ARScreenJogInPlace';
import ARScreenJumpingJack from '../screens/ARScreens/weightloss/beginner/ARScreenJumpingJack';
import MuscleGainBeginner from '../screens/MuscleGainBeginner';
import ARScreenDips from '../screens/ARScreens/gainmuscle/beginner/ARScreenDips';
import ARScreenInclinedPushup from '../screens/ARScreens/gainmuscle/beginner/ARScreenInclinedPushup';
import ARScreenKneePushup from '../screens/ARScreens/gainmuscle/beginner/ARScreenKneePushup';
import ARScreenPushup from '../screens/ARScreens/gainmuscle/beginner/ARScreenPushup';

const MuscleGainBeginnerNavigation = () => {
  const MuscleGainBeginnerNavigationStack = createNativeStackNavigator();

  return (
    <MuscleGainBeginnerNavigationStack.Navigator>
      <MuscleGainBeginnerNavigationStack.Screen
        name="MuscleGainBeginner"
        component={MuscleGainBeginner}
        options={{headerShown: false}}
      />

      <MuscleGainBeginnerNavigationStack.Screen
        name="ARScreenDips"
        component={ARScreenDips}
        options={{headerShown: false}}
      />

      <MuscleGainBeginnerNavigationStack.Screen
        name="ARScreenInclinedPushup"
        component={ARScreenInclinedPushup}
        options={{headerShown: false}}
      />

      <MuscleGainBeginnerNavigationStack.Screen
        name="ARScreenKneePushup"
        component={ARScreenKneePushup}
        options={{headerShown: false}}
      />

      <MuscleGainBeginnerNavigationStack.Screen
        name="ARScreenPushup"
        component={ARScreenPushup}
        options={{headerShown: false}}
      />
    </MuscleGainBeginnerNavigationStack.Navigator>
  );
};

export default MuscleGainBeginnerNavigation;
