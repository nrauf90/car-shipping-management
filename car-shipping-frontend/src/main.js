import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store/store";
import axios from "axios";
import {USER_TOKEN_GETTER} from "@/store/storeconstants";
import vuetify from "@/plugins/vuetify";

const app = createApp(App);
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
//if url match to cars then add token to header
axios.interceptors.request.use(
    config => {
        //match all cars url
        if (config.url.match(/cars/)) {
            //get token from store
            let token = store.getters[`auth/${USER_TOKEN_GETTER}`];
            //add token to header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

app.use(router);
app.use(vuetify);
app.use(store);
app.mount('#app');
