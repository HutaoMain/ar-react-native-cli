import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    clipart: require('../../assets/cliparts/weight-loss.jpg'),
    title: 'Burpees',
    color: '#07CA98',
  },
  {
    clipart: require('../../assets/cliparts/jumping-jack.jpg'),
    title: 'Jumping Rope',
    color: '#FD7956',
  },
  {
    clipart: require('../../assets/cliparts/weight-loss.jpg'),
    title: 'Mountain Climbing',
    color: '#DD56FF',
  },
  {
    clipart: require('../../assets/cliparts/weight-loss.jpg'),
    title: 'Skate Exercises',
    color: '#DD56FF',
  },
];

const WeightLossAdvance = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderItem = item => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.color}]}
      onPress={() => {
        switch (item.title) {
          case 'Burpees':
            navigateToScreen('ARScreenBurpees');
            break;
          case 'Jumping Rope':
            navigateToScreen('ARScreenJumpingRope');
            break;
          case 'Mountain Climbing':
            navigateToScreen('ARScreenMountainClimbing');
            break;
          case 'Skate Exercises':
            navigateToScreen('ARScreenSkateExercises');
            break;

          default:
            break;
        }
      }}>
      <Image
        source={item.clipart}
        style={{width: 50, height: 50, borderRadius: 100}}
      />
      <Text style={styles.boxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {data.map((item, key) => (
        <View key={key}>{renderItem(item)}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  box: {
    width: 150,
    height: 250,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    fontSize: 20,
    color: 'white',
  },
});

export default WeightLossAdvance;
