import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import 'moment-timezone';
import {Icon} from '@rneui/themed';
import useFetchUserData from '../CurrentUser';
import useFetchCurrentBmiData from '../CurrentBmiResult';

const dataWeightLoss = [
  {
    id: 1,
    name: 'Proceed to Beginner',
    backgroundColor: '#07CA98',
    navigate: 'WeightLossBeginnerNavigation',
  },
  {
    id: 2,
    name: 'Proceed to Intermediate',
    backgroundColor: '#FD7956',
    navigate: 'WeightLossIntermediateNavigation',
  },
  {
    id: 3,
    name: 'Proceed to Advance',
    backgroundColor: '#DD56FF',
    navigate: 'WeightLossAdvanceNavigation',
    // navigate: 'WeightLossAdvance',
  },
];

const dataMuscleGain = [
  {
    id: 1,
    name: 'Proceed to Beginner',
    backgroundColor: '#07CA98',
    navigate: 'MuscleGainBeginnerNavigation',
  },
  {
    id: 2,
    name: 'Proceed to Intermediate',
    backgroundColor: '#FD7956',
    navigate: 'MuscleGainIntermediateNavigation',
  },
  {
    id: 3,
    name: 'Proceed to Advance',
    backgroundColor: '#DD56FF',
    navigate: 'MuscleGainAdvanceNavigation',
    // navigate: 'WeightLossAdvance',
  },
];

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const navigation = useNavigation();

  const {userData, refreshUser} = useFetchUserData();

  const {bmiResultData} = useFetchCurrentBmiData();

  console.log(userData);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    setRefreshTrigger(!refreshTrigger);
    setIsRefreshing(false);
    refreshUser();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigateToScreen(item.navigate)}
      style={[styles.box, {backgroundColor: item.backgroundColor}]}>
      <Text
        style={
          (styles.buttonText,
          {color: '#ffffff', textAlign: 'center', flexWrap: 'wrap', width: 90})
        }>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <Navbar />
        <View style={styles.headerContainer} refre>
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
        {bmiResultData?.bmiResult <= 24.9 ? (
          <>
            <Text style={styles.explore}>Workouts (Muscle gain)</Text>
            <FlatList
              horizontal
              data={dataMuscleGain}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </>
        ) : (
          <>
            <Text style={styles.explore}>Workouts (Weight Loss)</Text>
            <FlatList
              horizontal
              data={dataWeightLoss}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </>
        )}
      </ScrollView>
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
    width: 140,
    height: 140,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  boxText: {
    fontSize: 16,
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  modalText: {
    fontSize: 18,
    marginBottom: 12,
  },
  dumbellTypo: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Home;
