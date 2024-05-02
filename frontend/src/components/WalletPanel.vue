<script>
 import { useWalletStore } from '@/stores/wallet';
 import SingleWallet from '@/components/SingleWallet.vue';

 export default {
     components: { SingleWallet },
     setup() {
         const store = useWalletStore();
         return { store };
     },
     data() {
         return {
             showOffline: false
         }
     },
     computed: {
         wallets() {
             return this.store.players;
         },
         online() {
             return this.wallets.filter(x => x.offline === false)
         },
         offline() {
             return this.wallets.filter(x => x.offline === true)
         },

     }
 }
</script>
<template>
    <section class="wallet-panel">
        <header><h2>The others</h2></header>
        <main>
            <ul>
                <SingleWallet  v-for="client in online" :wallet="client"/>
            </ul>
            <ul v-if="showOffline">
                <SingleWallet  v-for="client in offline" :wallet="client"/>
            </ul>
            <button v-if="offline.length > 0"
                    @click="showOffline = !showOffline"
            class="mt-1">show offline</button>
        </main>
    </section>
</template>
