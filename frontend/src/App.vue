<script>
 import { RouterLink, RouterView } from 'vue-router'
 import { useWalletStore } from '@/stores/wallet';

 export default {
     inject: ['socketServer', 'apiEndpoint', 'socket'],
     mounted() {
         //this.socket =  new WebSocket(this.socketServer);
         console.log(this.socket)

         this.socket.on('connect', (e) => {
             let s = {subject: 'hello', id: "random4"};
             this.socket.send(JSON.stringify(s));
             fetch(`${this.apiEndpoint}/wallets`, {
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json",
                     Accept: 'application/json'
                 },
                 referrerPolicy: "no-referrer" })
                 .then(d => d.json())
                 .then(d => {
                     console.log(d);
                     return this.store.setMe(d);
                 });
         })

         this.socket.on('new-transaction', (evt) => {
             this.store.addTransaction(evt.message);
         })
         this.socket.on('new-wallet', (evt) => {
             console.log(evt)

         })
     },
     setup() {
         const store = useWalletStore();
         store.fetchCoins();
         store.fetchTransactions();
         return { store };
     },

 }

</script>

<template>
    <RouterView />
    <footer>
        <p>📈🔭 cryptolike - a cryptocurrency trading simulation brought to you by STERNA | PAU</p>
    </footer>
</template>

<style scoped>

</style>
