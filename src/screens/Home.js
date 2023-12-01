import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
// import {Entypo} from '@expo/vector-icons';
import 'moment-timezone';
import {Icon} from '@rneui/themed';

const data = [
  {
    clipart: 'https://image.pngaaa.com/904/32904-middle.png',
    title: 'Yoga',
    color: '#07CA98',
  },
  {
    clipart:
      'https://us.123rf.com/450wm/zdolnygrafik/zdolnygrafik2303/zdolnygrafik230300186/200047980-running-boy-vector-illustration-isolated-on-white-background-cartoon-styles.jpg?ver=6',
    title: 'Jogging',
    color: '#FD7956',
  },
  {
    clipart:
      'https://static.vecteezy.com/system/resources/previews/005/112/678/original/cartoon-little-boy-doing-push-up-free-vector.jpg',
    title: 'Push up',
    color: '#DD56FF',
  },
];

const Home = () => {
  const navigation = useNavigation();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.box, {backgroundColor: item.color}]}
      onPress={() => {
        switch (item.title) {
          case 'Yoga':
            navigateToScreen('Yoga');
            break;
          case 'Jogging':
            navigateToScreen('Jogging');
            break;
          case 'Push up':
            navigateToScreen('PushUp');
            break;

          default:
            break;
        }
      }}>
      <Image
        source={{uri: item.clipart}}
        style={{width: 50, height: 50, borderRadius: 100}}
      />
      <Text style={styles.boxText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <Text style={styles.dailyActivities}>Your Daily Activities</Text>
          <Text style={styles.explore}>Explore</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <Text style={styles.month}>
            {moment.tz('Asia/Manila').format('MMMM')}
          </Text>
          <Text style={styles.day}>
            {moment().tz('Asia/Manila').format('DD')}
          </Text>
        </View>
      </View>

      {/*  */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigateToScreen('BMICalculator')}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'https://play-lh.googleusercontent.com/nJK-fZz2-tohIAUcowkz4HIVzzyerGZbVXPFYhE8EBP60pUrAGR-8DCRgzo7yo7jQpXE',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>BMI Calculation</Text>
          <Icon name="controller-play" type="entypo" color="#517fa4" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigateToScreen('MealPlan')}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1075455848/vector/plate-fork-and-knife-line-icon-concept-plate-fork-and-knife-vector-linear-illustration.jpg?s=612x612&w=0&k=20&c=lgmsPGkx7_sPw-n1rkwiRCkn-t6lK-Bi8-uyXR4n8xU=',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Meal Planning</Text>
          <Icon name="controller-play" type="entypo" color="#517fa4" />
        </TouchableOpacity>
      </View>
      {/*  */}
      <Text style={styles.explore}>Workouts</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.clipart}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftContainer: {
    alignItems: 'center',
  },
  headerRightContainer: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  dailyActivities: {
    fontSize: 14,
  },
  explore: {
    marginTop: 20,
    fontSize: 35,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 18,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  //
  buttonsContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
  },
  box: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Home;
