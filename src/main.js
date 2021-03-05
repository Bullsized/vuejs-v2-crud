import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import LoginForm from './components/LoginForm.vue';
import AddNewUser from './components/AddNewUser.vue';
import UsersTable from './components/UsersTable.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
	// { path: '/', component: App },
	{ path: '/login', component: LoginForm },
	{ path: '/users', component: UsersTable },
	{ path: '/add-user', component: AddNewUser }
];

const router = new VueRouter({
	routes
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
