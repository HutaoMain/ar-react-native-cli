import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeightLossBeginner from '../screens/WeightLossBeginner';
import ARScreenButtKicks from '../screens/ARScreens/weightloss/beginner/ARScreenButtKicks';
import ARScreenHighKnees from '../screens/ARScreens/weightloss/beginner/ARScreenHighKnees';
import ARScreenJogInPlace from '../screens/ARScreens/weightloss/beginner/ARScreenJogInPlace';
import ARScreenJumpingJack from '../screens/ARScreens/weightloss/beginner/ARScreenJumpingJack';

const WeightLossBeginnerNavigation = () => {
  const WeightLossBeginnerNavigationStack = createNativeStackNavigator();

  return (
    <WeightLossBeginnerNavigationStack.Navigator>
      <WeightLossBeginnerNavigationStack.Screen
        name="WeightLossBeginner"
        component={WeightLossBeginner}
        options={{headerShown: false}}
      />

      <WeightLossBeginnerNavigationStack.Screen
        name="ARScreenButtKicks"
        component={ARScreenButtKicks}
        options={{headerShown: false}}
      />

      <WeightLossBeginnerNavigationStack.Screen
        name="ARScreenHighKnees"
        component={ARScreenHighKnees}
        options={{headerShown: false}}
      />

      <WeightLossBeginnerNavigationStack.Screen
        name="ARScreenJogInPlace"
        component={ARScreenJogInPlace}
        options={{headerShown: false}}
      />

      <WeightLossBeginnerNavigationStack.Screen
        name="ARScreenJumpingJack"
        component={ARScreenJumpingJack}
        options={{headerShown: false}}
      />
    </WeightLossBeginnerNavigationStack.Navigator>
  );
};

export default WeightLossBeginnerNavigation;
