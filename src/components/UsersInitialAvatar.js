import React from 'react';
import {View, Text} from 'react-native';

const UserInitialsAvatar = ({name, initialStyle, initialContainer}) => {
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
    <View style={[initialContainer, {backgroundColor}]}>
      <Text style={initialStyle}>{initials}</Text>
    </View>
  );
};

export default UserInitialsAvatar;
