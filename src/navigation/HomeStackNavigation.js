import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BMICalculator from '../screens/BMICalculator';
import BMIResult from '../screens/BMIResult';
import Home from '../screens/Home';
import MedicalHistory from '../screens/MedicalHistory';
import Person from '../screens/Person';
import MealPlan from '../screens/MealPlan';
import Jogging from '../screens/Jogging';
import Yoga from '../screens/Yoga';
import PushUp from '../screens/PushUp';

const HomeStackNavigation = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name="BMICalculator" component={BMICalculator} />
      <HomeStack.Screen
        name="BMIResult"
        component={BMIResult}
        options={{headerTitle: 'BMI Result'}}
      />
      <HomeStack.Screen name="Person" component={Person} />
      <HomeStack.Screen name="MealPlan" component={MealPlan} />
      <HomeStack.Screen name="MedicalHistory" component={MedicalHistory} />
      <HomeStack.Screen name="Jogging" component={Jogging} />
      <HomeStack.Screen name="Yoga" component={Yoga} />
      <HomeStack.Screen name="PushUp" component={PushUp} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigation;
