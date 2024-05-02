<script>
 import { useWalletStore } from '@/stores/wallet';
 import WalletPanel from '@/components/WalletPanel.vue';

 export default {
     components: { WalletPanel },
     setup() {
         const store = useWalletStore();
         return { store };
     },
     computed: {
         itMe() {
             return this.store.getMe;
         }
     },
     data() {
         return {
             showPanel: false
         }
     }
 }
</script>
<template>
    <header class="main-header">
        <nav>
            <router-link to="/">Home</router-link>
        </nav>
        <div class="header-user">
            <div>👤 {{itMe.name}}</div>
            <button @click="showPanel = !showPanel" class="panel-toggle">👥 others</button>
        </div>
    </header>
    <WalletPanel v-if="showPanel" />
</template>
