import {create} from 'zustand';

const useNotificationCountStore = create(set => ({
  pendingOrderCount: 0,
  setPendingOrderCount: (count) => set({pendingOrderCount: count}),
  wishlistCount: 0,
  setWishlistCount: (count) => set({wishlistCount: count}),
}));

export default useNotificationCountStore;
