import {View, StyleSheet} from 'react-native';
import React from 'react';
import Wave from '../../../../components/Wave';
import CountdownComponent from '../../../../components/Countdown';
import ARJogInPlace from '../../../ARs/weightloss/beginner/ARJogInPlace';
import ARSquatJump from '../../../ARs/weightloss/intermediate/ARSquatJump';
import ARWidePushup from '../../../ARs/gainmuscle/intermediate/ARWidePushup';

const ARScreenWidePushup = () => {
  return (
    <View style={styles.container}>
      <ARWidePushup />
      <View style={styles.countdownContainer}>
        <CountdownComponent />
      </View>
      <View style={styles.waveContainer}>
        <Wave color="#DD56FF" />
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

export default ARScreenWidePushup;
