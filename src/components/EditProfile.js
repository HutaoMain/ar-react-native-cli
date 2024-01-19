import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {collection, query, where, getDocs, updateDoc} from 'firebase/firestore';
import {FIRESTORE_DB} from '../FirebaseConfig';
import useAuthStore from '../zustand/AuthStore';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const EditModal = ({isVisible, onClose, whatToEdit}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(
    moment().subtract(16, 'years').toDate(),
  );

  const userCollectionRef = collection(FIRESTORE_DB, 'users');
  const user = useAuthStore(state => state.user);

  console.log(dateOfBirth);

  const handleSave = async () => {
    try {
      const userQuery = query(userCollectionRef, where('email', '==', user));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        await updateDoc(userDoc.ref, {
          [whatToEdit]: whatToEdit === 'dateOfBirth' ? dateOfBirth : fieldValue,
        });
        onClose();
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {whatToEdit === 'dateOfBirth' ? (
            <>
              <View style={{width: '100%', paddingHorizontal: 22}}>
                <Text style={{textAlign: 'left'}}>Date of Birth</Text>
              </View>
              <TouchableOpacity
                onPress={showDatepicker}
                style={styles.inputContainer}>
                <Fontisto name="date" size={24} color="black" />
                <Text style={styles.inputBirthday}>
                  {moment(dateOfBirth).format('YYYY-MM-DD')}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>
                Edit
                {whatToEdit === 'fullName'
                  ? 'Full Name'
                  : whatToEdit === 'medicalConditions'
                  ? 'Medical Conditions'
                  : 'Birthday'}
              </Text>
              <TextInput style={styles.input} onChangeText={setFieldValue} />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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
  inputBirthday: {
    width: '85%',
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '85%',
    color: 'black',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '85%',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
};

export default EditModal;
