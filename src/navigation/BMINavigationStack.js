import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BMICalculator from '../screens/BMICalculator';
import BMIResult from '../screens/BMIResult';

const BMINavigationStack = () => {
  const BMIStack = createNativeStackNavigator();

  return (
    <BMIStack.Navigator>
      <BMIStack.Screen
        name="BMICalculator"
        component={BMICalculator}
        options={{headerShown: false}}
      />
      <BMIStack.Screen
        name="BMIResult"
        component={BMIResult}
        options={{headerTitle: 'BMI Result'}}
      />
    </BMIStack.Navigator>
  );
};

export default BMINavigationStack;
