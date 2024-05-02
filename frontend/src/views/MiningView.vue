<script>
 import { useWalletStore } from '@/stores/wallet';

 export default {
     inject: ['apiEndpoint'],
     data() {
         return {
             num1: null,
             num2: null,
             result: null,
             notice: null
         }
     },
     setup() {
         const store = useWalletStore();
         return { store };
     },
     created() {
       this.resetNum();
     },
     computed: {
         coin() {
             return this.store.getCoin(this.$route.params.name);
         },
         miningWork() {
             return this.store.getNumMiningWork;
         },
         miningProgress() {
             let done = this.store.getMiningProgress(this.$route.params.name);
             return done.progress;
         },
         myWallet() {
             return this.store.getMe;
         },
         transactions() {
             return this.store.transactions;
         },
         coinTransactions() {
             return this.store.getTransactionsByCoin(this.$route.params.name);
         },
         myCoinTransactions() {
             return this.store.getMineFromCoin(this.$route.params.name);
         }
     },
     methods: {
         resetNum() {
             this.num1 = this.randomNumber();
             this.num2 = this.randomNumber();
             this.result = null;
         },
         resetWork() {
             this.store.setMiningProcess(this.coin.name, 0);
         },
         coinName(coin) {
             if (coin) {
                 return `${coin.name.split('').splice(0,2).join('')}TC`;
             } else {
                 return '';
             }
         },
         randomNumber() {
             return Math.floor(Math.random() * 10);
         },
         check() {
             if (this.num1 + this.num2 === this.result) {
                 this.notice = "Success! To the next one!";
                 this.resetNum();
                 this.store.setMiningProcess(this.coin.name, this.miningProgress + 1);
                 this.hasEarnedCoin();
             } else {
                 this.resetNum();
                 this.notice = "Failure! Try the next one!";
             }
         },
         hasEarnedCoin() {
             console.log(this.miningProgress, this.miningWork);
             if (this.miningProgress === this.miningWork) {
                 this.createCoin();
                 this.resetNum();
                 this.resetWork();
             }
         },
         async createCoin() {
             //console.log(this.coin, this.myWallet)
             let body = JSON.stringify({
                 coin: this.coin._id,
                 to: this.myWallet._id,
                 mined: true,
             });
             //console.log(body)
             let result = await fetch(`${this.apiEndpoint}/transactions/`, {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                     Accept: 'application/json'
                 },
                 referrerPolicy: "no-referrer",
                 body }
             ).then(d => d.json());
             //console.log(result);
         }
     },
 }
</script>

<template>
    <main>
        <section>
            <header v-if="coin">
                <h1>Mining <router-link :to="{name: 'coinSingle', params: { name: coin.name}}">{{coin.name}}</router-link></h1>
                <div>{{ coinTransactions.length }} have been mined.</div>
                <div>You have {{myCoinTransactions.length}} in this coin.</div>
                <div>
                    <h2>Mining Progress</h2>
                    <div>Work to prove unitl next coin: {{ miningProgress }} / {{ miningWork}}</div>
                </div>
            </header>
            <section>
                <form  @submit.prevent="check">
                    <div v-if="notice">{{notice}}</div>
                    <div>Solve this: <pre>{{num1}} + {{num2}} = <input type="number" v-model="result"></pre></div>
                    <button type="submit">Verify</button>

                </form>
            </section>
        </section>
    </main>
</template>
