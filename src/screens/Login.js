import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useAuthStore from '../zustand/AuthStore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../FirebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const setUser = useAuthStore(state => state.setUser);

  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified) {
        setLoading(false);
        setUser(email);
      } else {
        Toast.show({
          type: 'error',
          text1: `Please verify your email`,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `Email or password is incorrect.`,
      });
      console.log(error);
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.login}>
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Capt's Gym</Text>
          <View style={styles.inputContainer}>
            <Icon name="user" size={24} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={24} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="black"
            />
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <LinearGradient
              colors={['#FFAA21', '#FFC42C']}
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={styles.buttonText}>
                {loading ? 'Please wait..' : 'Login'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text>or</Text>
          <View style={styles.registerContainer}>
            <Text>Don't have an account? </Text>
            <Text
              style={styles.registerText}
              onPress={handleGoToRegisterScreen}>
              Sign Up
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  title: {
    color: '#FD9206',
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 10,
  },
  inputContainer: {
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
  error: {
    color: '#ff3333',
  },
  button: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    textDecorationLine: 'underline',
    color: '#FD9206',
  },
});
