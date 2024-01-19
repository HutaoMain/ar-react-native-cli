import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import RegisterAccountInfo from '../components/RegisterAccountInfo';
import RegisterPersonalInfo from '../components/RegisterPersonalInfo';
import RegisterAllergySelection from '../components/RegisterAllergySelection';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../FirebaseConfig';
import moment from 'moment';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(
    moment().subtract(16, 'years').toDate(),
  );
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const navigation = useNavigation();

  const auth = FIREBASE_AUTH;

  const usersCollectionRef = collection(FIRESTORE_DB, 'users');

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Alert.alert('Password do not match');
      }

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredentials.user;

      await sendEmailVerification(user);

      await addDoc(usersCollectionRef, {
        email: email,
        fullName: name,
        dateOfBirth: dateOfBirth,
        bmiReminder: false,
        membership: 'non-member',
        address: address,
        medicalConditions: medicalConditions,
        role: 'user',
      });

      Alert.alert('Please check your email for verification.');
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate('Login');
  };

  const disableAccountInfoNext = !email || !confirmPassword || !password;
  const disablePersonalInfoNext = !name;
  const disabled =
    (step === 1 && disablePersonalInfoNext) ||
    (step === 2 && disableAccountInfoNext);

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <RegisterPersonalInfo
            name={name}
            setName={setName}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            setAddress={setAddress}
            setMedicalConditions={setMedicalConditions}
          />
        );
      case 2:
        return (
          <RegisterAccountInfo
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
      case 3:
        return (
          <RegisterAllergySelection
            handleRegistration={handleRegistration}
            loading={loading}
            userEmail={email}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.registerContainer}>
            <Text>Already have an account? </Text>
            <Text style={styles.registerText} onPress={handleGoBackToLogin}>
              Login
            </Text>
          </View>
        </View>

        {renderForm()}

        <View style={styles.nextBackContainer}>
          {step !== 3 && (
            <TouchableOpacity
              style={disabled ? styles.disabledButton : styles.button}
              onPress={nextStep}>
              <LinearGradient
                colors={
                  disabled ? ['#dddddd', '#dddddd'] : ['#FFAA21', '#FFC42C']
                }
                style={{
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={styles.buttonText}>
                  {loading ? 'Please wait...' : 'Next'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {step !== 1 && (
            <TouchableOpacity style={styles.button} onPress={prevStep}>
              <LinearGradient
                colors={['#4D5C7E', '#7083A1']}
                style={{
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#4D5C7E',
  },
  registerContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  registerText: {
    textDecorationLine: 'underline',
    color: '#FD9206',
  },
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
  },
  button: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButton: {
    width: '90%',
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
  nextBackContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
});
