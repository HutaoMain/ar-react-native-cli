import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(set => ({
  user: null,

  async setUser(user) {
    try {
      await AsyncStorage.setItem('fitar-storage', user);
      set({user});
    } catch (error) {
      console.error('Error saving user to AsyncStorage:', error);
    }
  },

  async clearUser() {
    try {
      await AsyncStorage.removeItem('fitar-storage');
      set({user: null});
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }
  },

  async init() {
    try {
      const user = await AsyncStorage.getItem('fitar-storage');
      if (user) {
        set({user});
      }
    } catch (error) {
      console.error('Error retrieving user from AsyncStorage:', error);
    }
  },
}));

export default useAuthStore;
