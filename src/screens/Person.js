import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import useFetchUserData from '../CurrentUser';
import moment from 'moment';
import useFetchCurrentBmiData from '../CurrentBmiResult';

import useAuthStore from '../zustand/AuthStore';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../FirebaseConfig';
import UserInitialsAvatar from '../components/UsersInitialAvatar';
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import HorizontalLine from '../components/HorizontalLine';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditModal from '../components/EditProfile';
import BasisForBmi from '../components/BasisForBmi';

const Person = () => {
  const [currentAge, setCurrentAge] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatToEdit, setWhatToEdit] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [bmiBasisModalVisible, setBmiBasisModalVisible] = useState(false);

  const {userData, refreshUser} = useFetchUserData();
  const {bmiResultData, refreshBmi} = useFetchCurrentBmiData();

  const auth = FIREBASE_AUTH;

  const userCollectionRef = collection(FIRESTORE_DB, 'users');
  const user = useAuthStore(state => state.user);

  const trackLoginDuration = async () => {
    const userQuery = query(userCollectionRef, where('email', '==', user));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();

      // Convert Firebase timestamp to JavaScript Date object
      const lastLoginTime = userData?.lastLoginTime?.toDate() || 0;

      // Convert totalLogInTime to a number or use 0 if undefined or null
      const totalLogInTime = Number(userData.totalLogInTime) || 0;

      const loginDuration = Math.floor(
        (Date.now() - lastLoginTime.getTime()) / 1000,
      );

      await updateDoc(userDoc.ref, {
        totalLogInTime: totalLogInTime + loginDuration,
        lastLoginTime: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    if (userData && userData?.dateOfBirth) {
      const birthdate = moment(userData?.dateOfBirth?.toDate());
      const today = moment();
      const age = today.diff(birthdate, 'years');
      console.log('eto ung age nya', age);
      setCurrentAge(age);
    }
  }, [userData]);

  const clearUser = useAuthStore(state => state.clearUser);

  const handleRefresh = async () => {
    setRefreshing(true);

    // Fetch updated user data and BMI result
    await Promise.all([refreshBmi(), refreshUser()]);

    setRefreshing(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Successfully logout!');
        clearUser();
        trackLoginDuration();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleOpenModal = whatToEditParam => {
    setWhatToEdit(whatToEditParam);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.coverPhotoContainer}>
          <UserInitialsAvatar
            name={userData?.email || ''}
            initialStyle={styles.initials}
            initialContainer={styles.initialContainer}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{userData?.fullName}</Text>
            <TouchableOpacity onPress={() => toggleOpenModal('fullName')}>
              <AntDesign name="edit" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
        </View>

        <HorizontalLine />

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Basic Info</Text>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Age: </Text>
            <Text style={styles.infoValue}>{currentAge}</Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>
              {bmiResultData?.weight
                ? bmiResultData?.weight + 'kg'
                : 'Please go to BMI Calculator'}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>
              {bmiResultData?.height
                ? bmiResultData.height + 'cm'
                : 'Please go to BMI Calculator'}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={[styles.infoValue, {textTransform: 'capitalize'}]}>
              {bmiResultData?.gender
                ? bmiResultData.gender
                : 'Please go to BMI Calculator'}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.nameContainer}>
              <Text style={styles.infoLabel}>Birthday</Text>
              <TouchableOpacity onPress={() => toggleOpenModal('dateOfBirth')}>
                <AntDesign name="edit" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>
              {moment(userData?.dateOfBirth.toDate()).format('YYYY-MM-DD')}
            </Text>
          </View>

          <HorizontalLine />

          <Text style={styles.infoTitle}>Health</Text>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI: </Text>
            <Text style={styles.infoValue}>
              {bmiResultData?.bmiResult
                ? bmiResultData.bmiResult
                : 'Please go to BMI Calculator'}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI Category: </Text>
            <Text style={styles.infoValue}>
              {bmiResultData?.bmiCategory
                ? bmiResultData.bmiCategory
                : 'Please go to BMI Calculator'}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.nameContainer}>
              <Text style={styles.infoLabel}>Medical Conditions: </Text>
              <TouchableOpacity
                onPress={() => toggleOpenModal('medicalConditions')}>
                <AntDesign name="edit" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>{userData?.medicalConditions}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setBmiBasisModalVisible(!bmiBasisModalVisible)}>
          <Text style={styles.btnText}>Show Basis for BMI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#FD9206',
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 30,
            width: '100%',
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <EditModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatToEdit={whatToEdit}
      />
      <BasisForBmi
        isVisible={bmiBasisModalVisible}
        onClose={() => setBmiBasisModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  coverPhotoContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: 200,
    height: 200,
    objectFit: 'contain',
    borderRadius: 100,
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    top: 160,
    right: 20,
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
  profileName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  infoContainer: {
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  infoTitle: {
    fontSize: 18,
    color: '#303234',
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
  initialContainer: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Person;
