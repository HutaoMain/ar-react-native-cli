import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterAccountInfo = ({setEmail, setPassword, setConfirmPassword}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    backgroundColor: '#F4F7FF',
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  input: {
    width: '80%',
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
});

export default RegisterAccountInfo;
