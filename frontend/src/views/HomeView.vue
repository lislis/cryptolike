<script>
 import { useWalletStore } from '@/stores/wallet';

 export default {
     setup() {
         const store = useWalletStore();
         return { store };
     },
     computed: {
         me() {
             return this.store.getMe;
         },
         coins() {
             return this.store.getCoins;
         }
     },
     methods: {
         coinName(coin) {
             return `${coin.name.split('').splice(0,2).join('')}TC`;
         },
         coinMined(coin) {
             return this.store.getTransactionsByCoin(coin.name);
         },
         myCoinTransactions(coin) {
             return this.store.getMineFromCoin(coin.name);
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
                <ul class="coins-list">
                    <li v-for="coin in coins">
                        <h3><router-link :to="{name: 'coinSingle', params: { name: coin.name}}">{{coin.name}}</router-link></h3>
                        <div>{{coinName(coin)}}/Euro: {{coin.exchange_rate}}</div>
                        <div>There are {{coinMined(coin).length}} in circulation.</div>
                        <div>Out of those, you own {{myCoinTransactions(coin).length}}.</div>

                        <router-link class="btn mt-1" :to="{ name: 'mining', params: { name: coin.name }}">Mine this coin!</router-link>
                    </li>
                </ul>
            </section>
        </section>
    </main>
</template>
