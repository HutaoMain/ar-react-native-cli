import React, {useState} from 'react';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FIRESTORE_DB} from '../FirebaseConfig';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '../zustand/AuthStore';

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
    allergies: '',
    currentMedications: '',
    medicalConditions: '',
  });

  const user = useAuthStore(state => state.user);

  const navigate = useNavigation();

  const saveFormDataToFirebase = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'medicalHistory'), {
        email: user,
        allergies: formData.allergies,
        currentMedications: formData.currentMedications,
        medicalConditions: formData.medicalConditions,
        createdAt: serverTimestamp(),
      });
      console.log('After addDoc');
      Toast.show({
        type: 'success',
        text1: `Successfully Saved Medical History`,
      });
      navigate.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Error adding document`,
      });
      console.error('Error adding document: ', error);
    }
  };

  const handleAllergiesChange = text => {
    setFormData(data => ({
      ...data,
      allergies: text,
    }));
  };

  const handleCurrentMedicationsChange = text => {
    setFormData(data => ({
      ...data,
      currentMedications: text,
    }));
  };

  const handleMedicalConditionsChange = text => {
    setFormData(data => ({
      ...data,
      medicalConditions: text,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical History Form</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List any allergies..."
          multiline
          numberOfLines={4}
          placeholderTextColor="black"
          onChangeText={handleAllergiesChange}
          value={formData.allergies}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Current Medications</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List current medications..."
          multiline
          numberOfLines={4}
          placeholderTextColor="black"
          onChangeText={handleCurrentMedicationsChange}
          value={formData.currentMedications}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Medical Conditions</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List any medical conditions..."
          multiline
          numberOfLines={4}
          placeholderTextColor="black"
          onChangeText={handleMedicalConditionsChange}
          value={formData.medicalConditions}
        />
      </View>
      <TouchableOpacity
        onPress={saveFormDataToFirebase}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default MedicalHistory;
