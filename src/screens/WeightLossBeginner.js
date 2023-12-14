import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    clipart: require('../../assets/cliparts/butt-kick.jpg'),
    title: 'Butt Kick',
    color: '#07CA98',
  },
  {
    clipart: require('../../assets/cliparts/jog.jpg'),
    title: 'High Knees',
    color: '#FD7956',
  },
  {
    clipart: require('../../assets/cliparts/jog.jpg'),
    title: 'Jog in Place',
    color: '#DD56FF',
  },
  {
    clipart: require('../../assets/cliparts/jumping-jack.jpg'),
    title: 'Jumping Jacks',
    color: '#DD56FF',
  },
];

const WeightLossBeginner = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderItem = item => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.color}]}
      onPress={() => {
        switch (item.title) {
          case 'Butt Kick':
            navigateToScreen('ARScreenButtKicks');
            break;
          case 'High Knees':
            navigateToScreen('ARScreenHighKnees');
            break;
          case 'Jog in Place':
            navigateToScreen('ARScreenJogInPlace');
            break;
          case 'Jumping Jacks':
            navigateToScreen('ARScreenJumpingJack');
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

export default WeightLossBeginner;
