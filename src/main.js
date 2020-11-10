import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
require('./mock');
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');

document.title = '阳光学院-名师工作室';
