import {useState, useEffect} from 'react';
import {FIRESTORE_DB} from './FirebaseConfig';
import useAuthStore from './zustand/AuthStore';
import {collection, getDocs, query, where} from 'firebase/firestore';

const useFetchMedicalHistory = () => {
  const [userData, setUserData] = useState();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, 'medicalHistory'),
        where('email', '==', user),
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
          const userData = {
            id: doc.id,
            currentMedications: doc.data().currentMedications,
            medicalConditions: doc.data().medicalConditions,
            email: doc.data().email,
            createdAt: doc.data().createdAt,
          };
          setUserData(userData);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user]);

  return userData;
};

export default useFetchMedicalHistory;
