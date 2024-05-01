<script>
 import { RouterLink, RouterView } from 'vue-router'
 import { useWalletStore } from '@/stores/wallet';


 export default {
     inject: ['socketServer', 'apiEndpoint', 'socket'],
     mounted() {
         //this.socket =  new WebSocket(this.socketServer);
         console.log(this.socket)

         this.socket.onopen = (e) => {
             let s = {subject: 'hello', id: "random4"};
             this.socket.send(JSON.stringify(s));
             fetch(`${this.apiEndpoint}/wallets`, { method: 'POST' })
                 .then(d => d.json())
                 .then(d => {
                     console.log(d);
                     return this.store.setMe(d);
                 });
         }

         this.socket.onmessage = (e) => {
             let data = JSON.parse(e.data);
             console.log(data);
         }
     },
     setup() {
         const store = useWalletStore();
         store.fetchCoins();
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
