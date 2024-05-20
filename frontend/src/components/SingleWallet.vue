<script>
 import { useWalletStore } from '@/stores/wallet';

 export default {
     props: ['wallet'],
     setup() {
         const store = useWalletStore();
         return { store };
     },
     computed: {
         isMe() {
             return this.store.me._id == this.wallet._id;
         }
     }
 }
</script>

<template>
    <li>
        <div>
            <span class="status" :class="{ 'offline': wallet.offline }"></span>
            <strong>{{wallet.name}}</strong>
            <span v-if="isMe" class="bubble">it you</span>
        </div>
    </li>
</template>
