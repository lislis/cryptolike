import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import io from 'socket.io-client';


const app = createApp(App)

app.use(createPinia())
app.use(router)


const localIP = '127.0.0.1:3000';
const socketAddress = `ws://127.0.0.1:3000`;
app.provide('apiEndpoint', `http://${localIP}/api`);
app.provide('socketServer', socketAddress);

const socket = io(`http://${localIP}`);
app.provide('socket', socket);


app.mount('#app')
