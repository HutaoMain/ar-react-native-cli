import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateSlider from '../components/DateSlider';
import {format} from 'date-fns';
import {SafeAreaView} from 'react-native-safe-area-context';
import MealPlanTime from '../components/MealPlanTime';

const MealPlan = () => {
  //   const [bmiCategory, setBmiCategory] = useState("Normal");
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Define meal plans for each BMI category
  //   const bmiCategories = ["Underweight", "Normal", "Overweight", "Obese"];

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <DateSlider
        onDayPress={day => setSelectedDay(day)}
        selectedDay={selectedDay}
      />
      <View style={{padding: 20}}>
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select BMI Category:
        </Text>
        <Picker
          selectedValue={bmiCategory}
          onValueChange={(itemValue) => setBmiCategory(itemValue)}
        >
          {bmiCategories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Your Meal Plan:
        </Text>
*/}
        <MealPlanTime selectedDay={selectedDay} />
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          Selected Day: {selectedDay ? format(selectedDay, 'yyyy-MM-dd') : ''}
        </Text>
        {/* {mealForSelectedDay && (
          <View>
            <Text>Meal Name: {mealForSelectedDay.meals[0]?.strMeal}</Text>
            {/* <Text>Category: {mealForSelectedDay}</Text> */}
        {/* <Text>Instructions: {mealForSelectedDays}</Text> 
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default MealPlan;
