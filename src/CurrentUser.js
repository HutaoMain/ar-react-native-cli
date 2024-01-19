import {useState, useEffect} from 'react';
import {FIRESTORE_DB} from './FirebaseConfig';
import useAuthStore from './zustand/AuthStore';
import {collection, getDocs, query, where} from 'firebase/firestore';

let isRefresh = false;

export const refreshUser = () => {
  isRefresh = !isRefresh;
};

const useFetchUserData = () => {
  const [userData, setUserData] = useState();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, 'users'),
        where('email', '==', user),
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
          const userData = {
            dateOfBirth: doc.data().dateOfBirth,
            email: doc.data().email,
            medicalConditions: doc.data().medicalConditions,
            fullName: doc.data().fullName,
          };
          setUserData(userData);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user, isRefresh]);

  // Return an object with bmiResult and refreshBmi function
  return {userData, refreshUser};
};

export default useFetchUserData;
