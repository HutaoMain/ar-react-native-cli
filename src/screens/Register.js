import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../FirebaseConfig';
import {addDoc, collection} from 'firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const usersCollectionRef = collection(FIRESTORE_DB, 'users');

  const onChangeSelectedDate = selectedDate => {
    const formattedDate = new Date(selectedDate);
    setShowDatePicker(false);
    if (formattedDate) {
      setDate(formattedDate);
    }
  };

  const toggleDate = () => {
    setShowDatePicker(true);
  };

  const navigation = useNavigation();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(usersCollectionRef, {
        email: email,
        name: name,
        birthday: date,
      });

      Toast.show({
        type: 'success',
        text1: `Successfully registered your account.`,
      });

      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate('Login');
  };

  const disabled = !email || !name || !password || !confirmPassword;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.registerTextContainer}>
            <Text style={{color: '#ffffff'}}>Already have an account? </Text>
            <Text style={styles.registerText} onPress={handleGoBackToLogin}>
              Login
            </Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <IconFontisto name="email" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <IconAntDesign name="user" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <IconAntDesign name="lock" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="black"
          />
        </View>

        <View style={styles.inputContainer}>
          <IconAntDesign name="lock" size={24} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="black"
          />
        </View>

        <View style={{width: '100%', paddingHorizontal: 22}}>
          <Text style={{textAlign: 'left'}}>Date of Birth</Text>
        </View>
        <View style={styles.inputContainer}>
          <IconFontisto name="date" size={24} />
          <TouchableOpacity style={styles.input} onPress={toggleDate}>
            <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            display="spinner"
            value={date}
            mode="date"
            onChange={e => onChangeSelectedDate(e.nativeEvent.timestamp)}
          />
        )}

        <TouchableOpacity
          style={disabled ? styles.disabledButton : styles.button}
          onPress={handleRegistration}
          disabled={disabled}>
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
              {loading ? 'Please wait...' : 'Sign Up'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.termsAndCondition}>
          <Text>
            By signing up, you are agreeing to our{' '}
            <Text style={{color: '#64BCFC'}}>Terms of Service</Text> and{' '}
            <Text style={{color: '#64BCFC'}}>Privacy Policy</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FD9206',
  },
  registerTextContainer: {
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
    color: 'black',
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
  termsAndCondition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
});
