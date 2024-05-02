<script>
 import { useWalletStore } from '@/stores/wallet';


 export default {
     setup() {
         const store = useWalletStore();
         return { store };
     },
     computed: {
         wallets() {
             return this.store.players;
         }
     }
 }
</script>
<template>
    <section>
        <header>Wallets</header>
        <main>
            <ul>
                <li v-for="client in wallets">
                    {{client.name}}
                </li>
            </ul>
        </main>
    </section>
</template>
