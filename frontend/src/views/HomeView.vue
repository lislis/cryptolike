<script>
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
         return { store };
     },
     computed: {
         me() {
             return this.store.getMe;
         }
     }
 }
</script>

<template>
    <main>
        <section>
            <header>
                <h1 v-if="me"><small>You are</small><br>{{ me.name }}</h1>
                <p>This is your wallet. It is ephemeral. <br>If you refresh this page everything you have earned will be lost.</p>
            </header>
            <section>
                <h2>These cryptocurrencies are available</h2>
                <p>Pick one to trade or mine.</p>
            </section>
        </section>
    </main>
</template>
