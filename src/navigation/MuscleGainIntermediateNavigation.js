import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MuscleGainIntermediate from '../screens/MuscleGainIntermediate';
import ARScreenExplosivePushup from '../screens/ARScreens/gainmuscle/intermediate/ARScreenExplosivePushup';
import ARScreenLateralRaises from '../screens/ARScreens/gainmuscle/intermediate/ARScreenLateralRaises';
import ARScreenStandingDumbellPress from '../screens/ARScreens/gainmuscle/intermediate/ARScreenStandingDumbellPress';
import ARScreenWidePushup from '../screens/ARScreens/gainmuscle/intermediate/ARScreenWidePushup';

const MuscleGainIntermediateNavigation = () => {
  const MuscleGainIntermediateNavigationStack = createNativeStackNavigator();

  return (
    <MuscleGainIntermediateNavigationStack.Navigator>
      <MuscleGainIntermediateNavigationStack.Screen
        name="MuscleGainIntermediate"
        component={MuscleGainIntermediate}
      />

      <MuscleGainIntermediateNavigationStack.Screen
        name="ARScreenExplosivePushup"
        component={ARScreenExplosivePushup}
        options={{headerShown: false}}
      />

      <MuscleGainIntermediateNavigationStack.Screen
        name="ARScreenLateralRaises"
        component={ARScreenLateralRaises}
        options={{headerShown: false}}
      />

      <MuscleGainIntermediateNavigationStack.Screen
        name="ARScreenStandingDumbellPress"
        component={ARScreenStandingDumbellPress}
        options={{headerShown: false}}
      />

      <MuscleGainIntermediateNavigationStack.Screen
        name="ARScreenWidePushup"
        component={ARScreenWidePushup}
        options={{headerShown: false}}
      />
    </MuscleGainIntermediateNavigationStack.Navigator>
  );
};

export default MuscleGainIntermediateNavigation;
