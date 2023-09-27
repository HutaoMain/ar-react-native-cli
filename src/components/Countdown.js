import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CountdownComponent = () => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return (
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{formattedMinutes}</Text>
        <Text style={styles.label}>mins</Text>
        <Text style={styles.countdownText}>{formattedSeconds}</Text>
        <Text style={styles.label}>secs</Text>
      </View>
    );
  };

  return formatTime(time);
};

const styles = StyleSheet.create({
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  countdownText: {
    color: '#fff',
    fontSize: 30,
    marginRight: 5,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default CountdownComponent;
