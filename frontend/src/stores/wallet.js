import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('everything', {
  state: () => ({
    me: {},
    wallets: [],
  }),
  getters: {
    getMe(state) {
      return state.me;
    },
    wallets: (state) => {
      return state.wallets;
    },
  },
  actions: {
    setMe(newWallet) {
      this.me = newWallet;
    },
    addWallet(newWallet) {
      this.wallets.push(newWallet);
    }
  }
});
