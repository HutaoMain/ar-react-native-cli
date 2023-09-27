import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useEffect, useState} from 'react';
import {getMealPlan} from '../API_URL';

const MealPlanTime = ({selectedDay}) => {
  const [mealOne, setMealOne] = useState();
  const [mealTwo, setMealTwo] = useState();
  const [mealThree, setMealThree] = useState();

  console.log(selectedDay);

  useEffect(() => {
    fetchMealPlan();
  }, [selectedDay]);

  const fetchMealPlan = async () => {
    try {
      const [meal1, meal2, meal3] = await Promise.all([
        getMealPlan(),
        getMealPlan(),
        getMealPlan(),
      ]);

      setMealOne(meal1);
      setMealTwo(meal2);
      setMealThree(meal3);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    }
  };

  const meals = [
    {
      time: '8-9 AM',
      name: mealOne?.meals[0].strMeal,
      thumbnail: {uri: mealOne?.meals[0].strMealThumb},
    },
    {
      time: '12-1 PM',
      name: mealTwo?.meals[0].strMeal,
      thumbnail: {uri: mealTwo?.meals[0].strMealThumb},
    },
    {
      time: '7-8 PM',
      name: mealThree?.meals[0].strMeal,
      thumbnail: {uri: mealThree?.meals[0].strMealThumb},
    },
  ];

  return (
    <View style={styles.container}>
      {meals.map((meal, index) => (
        <View key={index} style={styles.timelineItem}>
          <View style={styles.timeColumn}>
            <Text style={styles.timeText}>{meal.time}</Text>
          </View>
          <View style={styles.mealColumn}>
            <Image source={meal.thumbnail} style={styles.thumbnail} />
            <Text style={styles.mealText}>{meal.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  timeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  mealColumn: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  mealText: {
    fontSize: 16,
  },
});

export default MealPlanTime;
