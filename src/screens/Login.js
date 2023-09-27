import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
import useAuthStore from '../zustand/AuthStore';
// import { AntDesign } from "@expo/vector-icons";
// import {API_URL} from '../API_URL';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const setUser = useAuthStore(state => state.setUser);

  const navigation = useNavigation();

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(`${API_URL}/api/user/login`, {
  //       email: email,
  //       password: password,
  //     });
  //     setLoading(false);
  //     setUser(email);
  //     console.log(res.data);
  //   } catch (error) {
  //     setLoading(false);
  //     Toast.show({
  //       type: 'error',
  //       text1: `Email or password is incorrect.`,
  //     });
  //     console.log(error);
  //   }
  // };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(email);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: `Email or password is incorrect.`,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitAR</Text>
      <Text>Login</Text>
      <View style={styles.input_container}>
        <Icon name="user" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.input_container}>
        <Icon name="lock" size={24} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? 'Logging in..' : 'Login'}
        </Text>
      </TouchableOpacity>
      <Text>or</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToRegisterScreen}>
        <Text style={styles.buttonText}>No account yet? Click here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5D5D5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input_container: {
    width: '90%',
    height: 50,
    paddingLeft: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    color: 'black',
  },
  button: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
  },
});
