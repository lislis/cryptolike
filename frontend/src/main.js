import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)


const localIP = '127.0.0.1:3000';
const socketAddress = `ws://${localIP}`;
app.provide('apiEndpoint', `http://${localIP}/api`);
app.provide('socketServer', socketAddress);

const socket = new WebSocket(socketAddress);
app.provide('socket', socket);


app.mount('#app')
