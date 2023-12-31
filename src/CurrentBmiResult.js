import {useState, useEffect} from 'react';
import {FIRESTORE_DB} from './FirebaseConfig';
import useAuthStore from './zustand/AuthStore';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const useFetchCurrentBmiData = () => {
  const [bmiResult, setBmiResult] = useState();

  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(FIRESTORE_DB, 'bmiResult'),
        where('email', '==', user),
        orderBy('createdAt', 'desc'), // Order by createdAt in descending order
        limit(1), // Limit to the latest result
      );

      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
          const bmiResultData = {
            id: doc.id,
            age: doc.data().age,
            bmiCategory: doc.data().bmiCategory,
            bmiResult: doc.data().bmiResult,
            createdAt: doc.data().createdAt,
            email: doc.data().email,
            gender: doc.data().gender,
            height: doc.data().height,
            weight: doc.data().weight,
          };
          setBmiResult(bmiResultData);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user]);

  return bmiResult;
};

export default useFetchCurrentBmiData;
