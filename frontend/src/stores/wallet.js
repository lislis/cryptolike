import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('everything', {
    state: () => ({
        me: {},
        wallets: [],
        coins: [],
        numMiningWork: 1,
        mining: {

        }
    }),
    getters: {
        getMe(state) {
            return state.me;
        },
        wallets: (state) => {
            return state.wallets;
        },
        getCoins: (state) => {
            return state.coins;
        },
        getCoin: (state) => {
            return (name) => state.coins.find(x => x.name === name);
        },
        getMiningProgress: (state) => {
            return (name) => {
                state.mining[name] = state.mining[name] || { progress: 0 };
                return state.mining[name];
            }
        },
        getNumMiningWork: (state) => {
            return state.numMiningWork;
        }
    },
    actions: {
        setMe(newWallet) {
            this.me = newWallet;
        },
        addWallet(newWallet) {
            this.wallets.push(newWallet);
        },
        fetchCoins() {
            let apiEndpoint = inject('apiEndpoint');
            fetch(`${apiEndpoint}/coins`)
                .then(d => d.json())
                .then(d => this.coins = d);
        },
        setMiningProcess(name, progress) {
           console.log(this.mining, name, progress)
            this.mining[name].progress = progress;
        }
    }
});
