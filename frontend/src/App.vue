<script>
 import { RouterLink, RouterView } from 'vue-router'
 import { useWalletStore } from '@/stores/wallet';
 import WalletPanel from '@/components/WalletPanel.vue';

 export default {
     components: { WalletPanel },
     inject: ['socketServer', 'apiEndpoint', 'socket'],
     mounted() {
         this.socket.on('connect', (e) => {
             fetch(`${this.apiEndpoint}/wallets`, {
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json",
                     Accept: 'application/json'
                 },
                 referrerPolicy: "no-referrer",
                 body: JSON.stringify({socket: this.socket.id})
             })
                 .then(d => d.json())
                 .then(d => {
                     this.store.setMe(d);
                 });

             this.socket.on('new-transaction', (evt) => {
                 this.store.addTransaction(evt.message);
             });
             this.socket.on('new-wallet', (evt) => {
                 console.log(evt)
             });
         });
     },
     setup() {
         const store = useWalletStore();
         store.fetchCoins();
         store.fetchTransactions();
         store.fetchWallets();
         return { store };
     },

 }

</script>

<template>
    <WalletPanel />
    <RouterView />
    <footer>
        <p>📈🔭 cryptolike - a cryptocurrency trading simulation brought to you by STERNA | PAU</p>
    </footer>
</template>

<style scoped>

</style>
