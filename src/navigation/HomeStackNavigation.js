import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BMICalculator from '../screens/BMICalculator';
import BMIResult from '../screens/BMIResult';
import Home from '../screens/Home';
import Person from '../screens/Person';
import MealPlan from '../screens/MealPlan';
import WeightLossBeginnerNavigation from './WeightLossBeginnerNavigation';
import WeightLossIntermediateNavigation from './WeightLossIntermediateNavigation';
import WeightLossAdvanceNavigation from './WeightLossAdvanceNavigation';
import MuscleGainBeginnerNavigation from './MuscleGainBeginnerNavigation';
import MuscleGainIntermediateNavigation from './MuscleGainIntermediateNavigation';
import MuscleGainAdvanceNavigation from './MuscleGainAdvanceNavigation';

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="BMICalculator"
        component={BMICalculator}
        options={{headerTitle: 'BMI Calculator'}}
      />
      <HomeStack.Screen
        name="BMIResult"
        component={BMIResult}
        options={{headerTitle: 'BMI Result'}}
      />
      <HomeStack.Screen
        name="Person"
        component={Person}
        options={{headerTitle: 'Profile'}}
      />
      <HomeStack.Screen name="MealPlan" component={MealPlan} />
      {/*  */}
      <HomeStack.Screen
        name="WeightLossBeginnerNavigation"
        component={WeightLossBeginnerNavigation}
        options={{headerTitle: 'Beginner'}}
      />
      <HomeStack.Screen
        name="WeightLossIntermediateNavigation"
        component={WeightLossIntermediateNavigation}
        options={{headerTitle: 'intermediate'}}
      />
      <HomeStack.Screen
        name="WeightLossAdvanceNavigation"
        component={WeightLossAdvanceNavigation}
        options={{headerTitle: 'Advance'}}
      />
      {/*  */}

      <HomeStack.Screen
        name="MuscleGainBeginnerNavigation"
        component={MuscleGainBeginnerNavigation}
        options={{headerTitle: 'Beginner'}}
      />
      <HomeStack.Screen
        name="MuscleGainIntermediateNavigation"
        component={MuscleGainIntermediateNavigation}
        options={{headerTitle: 'intermediate'}}
      />
      <HomeStack.Screen
        name="MuscleGainAdvanceNavigation"
        component={MuscleGainAdvanceNavigation}
        options={{headerTitle: 'Advance'}}
      />
      {/*  */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
