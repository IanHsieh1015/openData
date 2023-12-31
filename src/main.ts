import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)


/** 初始化 Bootstrap */ 
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

app.mount('#app')
