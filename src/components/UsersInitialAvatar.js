import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserInitialsAvatar = ({name}) => {
  const getRandomColor = () => {
    const colors = ['#FF5733'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  const backgroundColor = getRandomColor();

  return (
    <View style={[styles.avatar, {backgroundColor}]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UserInitialsAvatar;
