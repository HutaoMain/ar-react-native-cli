import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const RegisterPersonalInfo = ({setName, dateOfBirth, setDateOfBirth}) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOfBirth(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: dateOfBirth,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="black"
          onChangeText={setName}
        />
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View style={{width: '100%', paddingHorizontal: 22}}>
          <Text style={{textAlign: 'left'}}>Date of Birth</Text>
        </View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.inputContainer}>
          <Fontisto name="date" size={24} color="black" />
          <Text style={styles.input}>
            {moment(dateOfBirth).format('YYYY-MM-DD')}
          </Text>
        </TouchableOpacity>
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

export default RegisterPersonalInfo;
