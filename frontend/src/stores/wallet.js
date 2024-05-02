import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('everything', {
    state: () => ({
        me: {},
        players: [],
        coins: [],
        transactions: [],
        numMiningWork: 2,
        mining: {},
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
        },
        getTransactionsByCoin: (state) => {
            return (coinname) =>  {
                let coin = state.coins.find(x => x.name === coinname);
                return state.transactions.filter(x => x.coin == coin._id && x.mined == true);
            }
        },
        getMineFromCoin: (state) => {
            return (coinname) => {
                let coin = state.coins.find(x => x.name === coinname);
                return state.transactions
                            .filter(x => x.mined == true)
                            .filter(x => x.coin == coin._id)
                            .filter(x => x.to == state.me._id);
            }
        },
        getOnlineWallets: (state) => {
            return
        }
    },
    actions: {
        setMe(newWallet) {
            this.me = newWallet;
        },
        fetchCoins() {
            let apiEndpoint = inject('apiEndpoint');
            fetch(`${apiEndpoint}/coins`)
                .then(d => d.json())
                .then(d => this.coins = d);
        },
        fetchTransactions() {
            let apiEndpoint = inject('apiEndpoint');
            fetch(`${apiEndpoint}/transactions`)
                .then(d => d.json())
                .then(d => this.transactions = d);
        },
        fetchWallets() {
            let apiEndpoint = inject('apiEndpoint');
            fetch(`${apiEndpoint}/wallets`)
                .then(d => d.json())
                .then(d => this.players = d);
        },
        setMiningProcess(name, progress) {
           //console.log(this.mining, name, progress)
            this.mining[name].progress = progress;
        },
        addTransaction(t) {
            this.transactions.push(t);
        },
        addWallet(wallet) {
            this.players.push(wallet);
        },
        updateWallet(walletid) {
            let index = this.players.findIndex(x => x._id === walletid);
            let p = this.players[index];
            p.offline = true;
            this.players.splice(index, 1, p);
            console.log(this.players[index])
        }
    }
});
