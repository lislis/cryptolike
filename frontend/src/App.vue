<script>
 import { RouterLink, RouterView } from 'vue-router'
 import { useWalletStore } from '@/stores/wallet';

 import MainHead from '@/components/MainHead.vue';

 export default {
     components: { MainHead },
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
            //     console.log(evt)
                 this.store.addWallet(evt.message);
             });
             this.socket.on('update-wallet', (evt) => {
                 //     console.log(evt)
                 console.log("update wallet ples")
                 this.store.updateWallet(evt.message);
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
    <MainHead />
    <div class="wrapper">
        <RouterView />
    </div>
    <footer class="main-footer">
        <p>📈🔭 cryptolike - a cryptocurrency trading simulation brought to you by STERNA | PAU</p>
    </footer>
</template>

<style scoped>

</style>
