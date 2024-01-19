import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import UserInitialsAvatar from './UsersInitialAvatar';
import useFetchUserData from '../CurrentUser';

const Navbar = () => {
  const {userData} = useFetchUserData();

  return (
    <View
      style={{
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 20}}>Welcome,</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {userData?.fullName}
        </Text>
      </View>
      <UserInitialsAvatar
        name={userData?.email || ''}
        initialStyle={styles.initials}
        initialContainer={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  initials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;
