import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    clipart: require('../../assets/cliparts/leg-exercise.png'),
    title: 'Dumbell Lunges',
    color: '#07CA98',
  },
  {
    clipart: require('../../assets/cliparts/leg-exercise.png'),
    title: 'Jumping Lunges',
    color: '#FD7956',
  },
  {
    clipart: require('../../assets/cliparts/leg-exercise.png'),
    title: 'Side Lunges',
    color: '#DD56FF',
  },
  {
    clipart: require('../../assets/cliparts/leg-exercise.png'),
    title: 'Squat Jump',
    color: '#DD56FF',
  },
];

const WeightLossIntermediate = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderItem = item => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.color}]}
      onPress={() => {
        switch (item.title) {
          case 'Dumbell Lunges':
            navigateToScreen('ARScreenDumbellLunges');
            break;
          case 'Jumping Lunges':
            navigateToScreen('ARScreenJumpingLunges');
            break;
          case 'Side Lunges':
            navigateToScreen('ARScreenSideLunges');
            break;
          case 'Squat Jump':
            navigateToScreen('ARScreenSquatJump');
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

export default WeightLossIntermediate;
