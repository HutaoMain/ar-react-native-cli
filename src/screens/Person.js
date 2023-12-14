import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import useFetchUserData from '../CurrentUser';
import moment from 'moment';
import useFetchCurrentBmiData from '../CurrentBmiResult';

import useAuthStore from '../zustand/AuthStore';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../FirebaseConfig';
import UserInitialsAvatar from '../components/UsersInitialAvatar';

const Person = () => {
  const [currentAge, setCurrentAge] = useState(0);
  const userData = useFetchUserData();

  const bmiResult = useFetchCurrentBmiData();

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    if (userData && userData.dateOfBirth) {
      const birthdate = moment(userData.dateOfBirth.toDate());
      const today = moment();
      const age = today.diff(birthdate, 'years');
      console.log('eto ung age nya', age);
      setCurrentAge(age);
    }
  }, [userData]);

  const clearUser = useAuthStore(state => state.clearUser);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Successfully logout!');
        clearUser();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverPhotoContainer}>
        <UserInitialsAvatar
          name={userData?.email || ''}
          initialStyle={styles.initials}
          initialContainer={styles.initialContainer}
        />
        <Text style={styles.profileName}>{userData?.fullName}</Text>
        <Text style={styles.profileEmail}>{userData?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>
              {currentAge !== 0 ? currentAge : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>
              {bmiResult?.weight
                ? bmiResult?.weight + 'kg'
                : 'Admin will calculate your BMI'}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>
              {bmiResult?.height
                ? bmiResult.height + 'cm'
                : 'Admin will calculate your BMI'}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Birthday</Text>
            <Text style={styles.infoValue}>
              {moment(userData?.dateOfBirth.toDate()).format('YY-MMM-DD')}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BMI</Text>
            <Text style={styles.infoValue}>
              {bmiResult?.bmiResult
                ? bmiResult.bmiResult
                : 'Admin will calculate your BMI'}
            </Text>
            <Text style={{fontSize: 14, color: '#535353'}}>
              {bmiResult?.bmiCategory
                ? bmiResult.bmiCategory
                : 'Admin will calculate your BMI'}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={[styles.infoValue, {textTransform: 'capitalize'}]}>
              {bmiResult?.gender
                ? bmiResult.gender
                : 'Admin will calculate your BMI'}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#FD9206',
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 30,
          width: '100%',
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
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
    marginTop: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    textAlign: 'center',
  },
  initialContainer: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default Person;
