import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoinView from '../views/CoinView.vue';
import MiningView from '../views/MiningView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coin/:name',
      name: 'coinSingle',
      component: CoinView
    },
    {
      path: '/mining/:name',
      name: 'mining',
      component: MiningView
    }
  ]
})

export default router
