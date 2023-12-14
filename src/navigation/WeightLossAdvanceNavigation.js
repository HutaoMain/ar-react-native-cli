import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WeightLossAdvance from '../screens/WeightLossAdvance';
import ARScreenBurpees from '../screens/ARScreens/weightloss/advance/ARScreenBurpees';
import ARScreenJumpingRope from '../screens/ARScreens/weightloss/advance/ARScreenJumpingRope';
import ARScreenMountainClimbing from '../screens/ARScreens/weightloss/advance/ARScreenMountainClimbing';
import ARScreenSkateExercises from '../screens/ARScreens/weightloss/advance/ARScreenSkateExercises';

const WeightLossAdvanceNavigation = () => {
  const WeightLossAdvanceNavigationStack = createNativeStackNavigator();

  return (
    <WeightLossAdvanceNavigationStack.Navigator>
      <WeightLossAdvanceNavigationStack.Screen
        name="WeightLossAdvance"
        component={WeightLossAdvance}
        options={{headerShown: false}}
      />

      <WeightLossAdvanceNavigationStack.Screen
        name="ARScreenBurpees"
        component={ARScreenBurpees}
        options={{headerShown: false}}
      />

      <WeightLossAdvanceNavigationStack.Screen
        name="ARScreenJumpingRope"
        component={ARScreenJumpingRope}
        options={{headerShown: false}}
      />

      <WeightLossAdvanceNavigationStack.Screen
        name="ARScreenMountainClimbing"
        component={ARScreenMountainClimbing}
        options={{headerShown: false}}
      />

      <WeightLossAdvanceNavigationStack.Screen
        name="ARScreenSkateExercises"
        component={ARScreenSkateExercises}
        options={{headerShown: false}}
      />
    </WeightLossAdvanceNavigationStack.Navigator>
  );
};

export default WeightLossAdvanceNavigation;
