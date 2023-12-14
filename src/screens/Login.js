import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
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
  const [modalVisible, setModalVisible] = useState(false);

  const termsAndConditionsContent = `
    App Content and Information
    a. The App provides workout plans, exercise routines, fitness tips, and related information for informational purposes only.
    b. The Content is not intended as a substitute for professional advice, diagnosis, or treatment. Always consult with a qualified healthcare or fitness professional before starting any exercise program.

    User Responsibilities:
    a. You are solely responsible for your use of the App and for following the workout plans and exercises at your own risk.
    b. It is your responsibility to ensure that you are physically capable of performing the exercises and that you do so with proper form and technique.
    c. You acknowledge that participation in physical activities carries inherent risks, and you agree to assume full responsibility for any injuries or damages that may result from your use of the App.

    Personal Information and Privacy:
    a. We may collect and use personal information as described in our Privacy Policy. By using the App, you consent to the collection, storage, and use of your information in accordance with our Privacy Policy.
    b. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.

    Intellectual Property:
    a. The App and its Content are owned by us and are protected by copyright and other intellectual property laws.
    b. You may not copy, modify, distribute, sell, lease, or exploit any part of the App or its Content without our prior written consent.

    Limitation of Liability:
    a. To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the App.
    b. We do not warrant the accuracy, completeness, or reliability of the Content, and we do not guarantee specific results from using the App.

    Modification and Termination:
    a. We reserve the right to modify or terminate the App or any part of it at any time without prior notice.
    b. We may also modify this Agreement from time to time, and it is your responsibility to review the Agreement periodically. Continued use of the App after any modifications constitutes your acceptance of the modified Agreement.

    Governing Law:
    a. This Agreement shall be governed and construed in accordance with the laws of [Jurisdiction].
    b. Any legal action arising out of or relating to this Agreement shall be filed in the courts of [Jurisdiction].
  `;

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
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            alignItems: 'center',
          }}>
          <Text>By logging in, you agree to Capt's gym</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.linkText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <Text>{termsAndConditionsContent}</Text>
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    position: 'relative',
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
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '90%',
  },
  closeButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
