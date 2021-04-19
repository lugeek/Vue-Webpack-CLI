import Vue from "vue";
import VueRouter from 'vue-router'
import App from "./App.vue";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
});

new Vue({
    router, // ES6 缩写，等同于 router: router
    render: (h) => h(App),
}).$mount("#app");
