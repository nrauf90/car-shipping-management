import {createRouter, createWebHistory} from "vue-router";
import LoginComponent from "./pages/LoginComponent.vue";
import RegisterComponent from "./pages/RegisterComponent.vue";
import CarsComponent from "@/pages/CarsComponent.vue";
import store from "./store/store";
import {IS_AUTHENTICATED_GETTER} from "@/store/storeconstants";

const routes = [
    { path: '/login', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/cars', component: CarsComponent }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && to.path !== '/register' && !store.getters[`auth/${IS_AUTHENTICATED_GETTER}`]) {
        next('/login');
    } else {
        next();
    }
});

export default router;