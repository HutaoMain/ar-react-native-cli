import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../API_URL';

export const useCartStore = create(set => ({
  items: [],
  total: 0,
  addItem: async (item, quantity = 1) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/list/${item.id}`);
      const productQuantity = data.quantity;

      set((state) => {
        const index = state.items.findIndex((i) => i.id === item.id);

        if (index === -1) {
          if (quantity > productQuantity) {
            quantity = productQuantity;
          }
          return {
            items: [...state.items, { ...item, quantity }],
            total: state.total + item.price * quantity,
          };
        } else {
          const newQuantity = state.items[index].quantity + quantity;
          if (newQuantity > productQuantity) {
            quantity = productQuantity - state.items[index].quantity;
          }
          const newItems = [...state.items];
          newItems[index].quantity += quantity;
          return {
            items: newItems,
            total: state.total + item.price * quantity,
          };
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  increaseItem: async (id) => {
    const { data } = await axios.get(`${API_URL}/api/product/list/${id}`);
    const productQuantity = data.quantity;
    set((state) => {
      const item = state.items.find((item) => item.id === id);

      if (productQuantity > item.quantity) {
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: state.total + item.price,
        };
      } else {
        return state;
      }
    });
  },
  decreaseItem: (id) => {
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      const newItems =
        item.quantity === 1
          ? state.items.filter((item) => item.id !== id)
          : state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
      return {
        items: newItems,
        total: state.total - item.price,
      };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      return {
        items: state.items.filter((item) => item.id !== id),
        total: state.total - item.price * item.quantity,
      };
    });
  },
  saveCartToStorage: async (cartData) => {
    try {
      await AsyncStorage.setItem('cart-storage', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart data to AsyncStorage:', error);
    }
  },
  getCartFromStorage: async () => {
    try {
      const cartDataString = await AsyncStorage.getItem('cart-storage');
      if (cartDataString) {
        const cartData = JSON.parse(cartDataString);
        set((state) => ({
          ...state,
          items: cartData.items,
          total: cartData.total,
        }));
      }
    } catch (error) {
      console.error('Error retrieving cart data from AsyncStorage:', error);
    }
  },
  clearCartFromStorage: async () => {
    try {
      await AsyncStorage.removeItem('cart-storage');
      set({ items: [], total: 0 });
    } catch (error) {
      console.error('Error clearing cart data from AsyncStorage:', error);
    }
  },
}));

const cartStore = useCartStore.getState();
cartStore.getCartFromStorage();

export default useCartStore;
