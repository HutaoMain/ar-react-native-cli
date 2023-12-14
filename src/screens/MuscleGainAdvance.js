import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    clipart: require('../../assets/cliparts/push-up.png'),
    title: 'Archer Pushup',
    color: '#07CA98',
  },
  {
    clipart: require('../../assets/cliparts/push-up.png'),
    title: 'Diamond Pushup',
    color: '#FD7956',
  },
  {
    clipart: require('../../assets/cliparts/push-up.png'),
    title: 'Hand Stand Pushup',
    color: '#DD56FF',
  },
  {
    clipart: require('../../assets/cliparts/pull-up.png'),
    title: 'Pull up',
    color: '#DD56FF',
  },
];

const MuscleGainAdvance = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderItem = item => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.color}]}
      onPress={() => {
        switch (item.title) {
          case 'Archer Pushup':
            navigateToScreen('ARScreenArcherPushup');
            break;
          case 'Diamond Pushup':
            navigateToScreen('ARScreenDiamondPushup');
            break;
          case 'Hand Stand Pushup':
            navigateToScreen('ARScreenHandStandPushup');
            break;
          case 'Pull up':
            navigateToScreen('ARScreenPullup');
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

export default MuscleGainAdvance;
