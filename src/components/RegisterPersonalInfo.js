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
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const RegisterPersonalInfo = ({
  name,
  setName,
  setAddress,
  dateOfBirth,
  setDateOfBirth,
  setMedicalConditions,
}) => {
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
      maximumDate: moment().subtract(16, 'years').toDate(),
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
          value={name}
          placeholder="Full name"
          placeholderTextColor="black"
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <EntypoIcons name="location" size={24} color="black" />
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Address"
          placeholderTextColor="black"
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Medical Conditions</Text>
        <TextInput
          style={[styles.inputMedical, styles.multilineInput]}
          placeholder="List any medical conditions..."
          multiline
          numberOfLines={3}
          placeholderTextColor="black"
          onChangeText={setMedicalConditions}
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
  formGroup: {
    marginBottom: 8,
    width: '90%',
  },
  inputMedical: {
    backgroundColor: '#F4F7FF',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default RegisterPersonalInfo;
