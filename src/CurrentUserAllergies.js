import {useState, useEffect} from 'react';
import useAuthStore from './zustand/AuthStore';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {FIRESTORE_DB} from './FirebaseConfig';

const useFetchUserAllergies = () => {
  const [userAllergies, setUserAllergies] = useState();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(
          collection(FIRESTORE_DB, 'allergies'),
          where('email', '==', user),
        );

        try {
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(doc => {
            const userAllergiesData = {
              allergies: doc.data().allergies,
              email: doc.data().email,
            };
            setUserAllergies(userAllergiesData);
          });
        } catch (error) {
          console.error('Error fetching user allergies data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  return userAllergies;
};

export default useFetchUserAllergies;
