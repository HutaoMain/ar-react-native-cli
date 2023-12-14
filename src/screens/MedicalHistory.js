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
import useFetchMedicalHistory from '../CurrentMedicalHistory';
import LinearGradient from 'react-native-linear-gradient';

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
    allergies: '',
    currentMedications: '',
    medicalConditions: '',
  });

  const user = useAuthStore(state => state.user);

  const currentMedicalHistory = useFetchMedicalHistory();

  const navigate = useNavigation();

  const saveFormDataToFirebase = async () => {
    const medicalHistoryRef = doc(
      FIRESTORE_DB,
      'medicalHistory',
      currentMedicalHistory.id,
    );

    try {
      await updateDoc(medicalHistoryRef, {
        email: user,
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

  const disabled =
    formData.currentMedications === '' && formData.medicalConditions === '';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Current Medications</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="List current medications..."
          multiline
          numberOfLines={4}
          placeholderTextColor="black"
          onChangeText={handleCurrentMedicationsChange}
          defaultValue={currentMedicalHistory?.currentMedications}
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
          defaultValue={currentMedicalHistory?.medicalConditions}
        />
      </View>
      {/*  */}
      <TouchableOpacity
        style={disabled ? styles.disabledButton : styles.button}
        onPress={saveFormDataToFirebase}>
        <LinearGradient
          colors={disabled ? ['#dddddd', '#dddddd'] : ['#FFAA21', '#FFC42C']}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.buttonText}>
            <Text>Save</Text>
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {/*  */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    position: 'relative',
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

  // allergies
  allergies: {
    marginTop: 10,
    marginBottom: 10,
  },
  allergenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  selectedAllergen: {
    backgroundColor: '#64b5f6',
  },
  allergenText: {
    fontSize: 14,
  },

  button: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButton: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicalHistory;
