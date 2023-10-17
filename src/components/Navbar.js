import {View, Text, Image} from 'react-native';
import React from 'react';
import useAuthStore from '../zustand/AuthStore';
import UserInitialsAvatar from './UsersInitialAvatar';

const Navbar = () => {
  const user = useAuthStore(state => state.user);

  return (
    <View
      style={{
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 20}}>Welcome,</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{user}</Text>
      </View>
      {/* <Image
        source={require('../../assets/images.jpg')}
        style={{width: 50, height: 50, borderRadius: 100}}
      /> */}
      <UserInitialsAvatar name={user || ''} />
    </View>
  );
};

export default Navbar;
