import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import useFetchUserData from '../CurrentUser';
import moment from 'moment';
import useFetchCurrentBmiData from '../CurrentBmiResult';
import {FIREBASE_AUTH} from '../FirebaseConfig';
import useAuthStore from '../zustand/AuthStore';
import {signOut} from 'firebase/auth';

const Person = () => {
  const userData = useFetchUserData();

  const bmiResult = useFetchCurrentBmiData();

  const auth = FIREBASE_AUTH;
  const clearUser = useAuthStore(state => state.clearUser);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Successfully logout!');
        clearUser();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        position: 'relative',
        height: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FD9206',
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 30,
          width: '100%',
          position: 'absolute', // added only for this time
          bottom: 50,
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Person;
