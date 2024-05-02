<script>
 import { useWalletStore } from '@/stores/wallet';

 export default {

     setup() {
         const store = useWalletStore();
         return { store };
     },
     computed: {
         coin() {
             return this.store.getCoin(this.$route.params.name);
         },
         coinMined() {
             return this.store.getTransactionsByCoin(this.$route.params.name);
         }
     },
     methods: {
         coinName(coin) {
             if (coin) {
                 return `${coin.name.split('').splice(0,2).join('')}TC`;
             } else {
                 return '';
             }

         }
     }
 }
</script>

<template>
    <main>
        <section>
            <header v-if="coin">
                <h1>{{coin.name}}</h1>
                <div>{{coinName(coin)}}/Euro: {{coin.exchange_rate}}</div>
                <div>Coins mined: {{coinMined.length}}</div>
            </header>
            <section>
                <router-link class="btn" :to="{ name: 'mining', params: { name: coin.name }}">Mine this coin!</router-link>
            </section>
        </section>
    </main>
</template>
