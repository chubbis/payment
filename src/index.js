import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Payment from './components/Payment.vue';
import History from './components/History.vue';
import SuccessfulPayment from './components/SuccessfulPayment.vue';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', name: 'payment', component: Payment},
        {path: '/history', component: History},
        {path: '/successful', component: SuccessfulPayment}
    ]
});


new Vue({
    template: `<app></app>`,
    data:{
      historyPayments: [],
    },
    router,
    components: {
        App
    },
    render: h => h(App),
}).$mount('#app');