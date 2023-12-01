import React from 'react';
import {View, StyleSheet} from 'react-native';
import Wave from '../components/Wave';
import CountdownComponent from '../components/Countdown';
import ARScreenYoga from './ARScreenYoga';

const Yoga = () => {
  return (
    <View style={styles.container}>
      <ARScreenYoga />
      <View style={styles.countdownContainer}>
        <CountdownComponent />
      </View>
      <View style={styles.waveContainer}>
        <Wave color="#07CA98" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  countdownContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    elevation: 20,
    zIndex: 1,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    elevation: 10,
  },
});

export default Yoga;