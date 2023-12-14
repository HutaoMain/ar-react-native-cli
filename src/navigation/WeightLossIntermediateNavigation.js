import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeightLossIntermediate from '../screens/WeightLossIntermediate';
import ARScreenDumbellLunges from '../screens/ARScreens/weightloss/intermediate/ARScreenDumbellLunges';
import ARScreenJumpingLunges from '../screens/ARScreens/weightloss/intermediate/ARScreenJumpingLunges';
import ARScreenSideLunges from '../screens/ARScreens/weightloss/intermediate/ARScreenSideLunges';
import ARScreenSquatJump from '../screens/ARScreens/weightloss/intermediate/ARScreenSquatJump';

const WeightLossIntermediateNavigation = () => {
  const WeighLossIntermediateNavigationStack = createNativeStackNavigator();

  return (
    <WeighLossIntermediateNavigationStack.Navigator>
      <WeighLossIntermediateNavigationStack.Screen
        name="WeightLossIntermediate"
        component={WeightLossIntermediate}
      />

      <WeighLossIntermediateNavigationStack.Screen
        name="ARScreenDumbellLunges"
        component={ARScreenDumbellLunges}
        options={{headerShown: false}}
      />

      <WeighLossIntermediateNavigationStack.Screen
        name="ARScreenJumpingLunges"
        component={ARScreenJumpingLunges}
        options={{headerShown: false}}
      />

      <WeighLossIntermediateNavigationStack.Screen
        name="ARScreenSideLunges"
        component={ARScreenSideLunges}
        options={{headerShown: false}}
      />

      <WeighLossIntermediateNavigationStack.Screen
        name="ARScreenSquatJump"
        component={ARScreenSquatJump}
        options={{headerShown: false}}
      />
    </WeighLossIntermediateNavigationStack.Navigator>
  );
};

export default WeightLossIntermediateNavigation;
