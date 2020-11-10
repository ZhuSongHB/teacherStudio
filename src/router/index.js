import Vue from 'vue';
import VueRouter from 'vue-router';
// const Login = () => import('views/login/Login');
const Home = () => import('views/home/Home');
const Studio = () => import('views/studio/Studio');
const StudioDetail = () => import('views/studioDetail/StudioDetail');
// const Index = () => import('views/index/Index');
// const Notice = () => import('views/notice/Notice');
// const NoticeDetail = () => import('views/notice/NoticeDetail');
const login = () => import('views/login/index');
const examine = () => import('views/examine/index');
const personal = () => import('views/personal/personal');
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	// {
	// 	path: '/login',
	// 	component: Login,
	// },
	{
		path: '/home',
		component: Home,
		redirect: '/studio',
		children: [
			// {
			// 	path: '/index',
			// 	component: Index,
			// },
			{
				path: '/studio',
				component: Studio,
			},
			{
				path: '/studioDetail/:id',
				component: StudioDetail,
			},
			// {
			// 	path: '/notice',
			// 	component: Notice,
			// },
			// {
			// 	path: '/noticeDetail',
			// 	component: NoticeDetail,
			// },
			{
				path: '/login',
				component: login,
				// children: [{ path: '', component: component }],
			},
			{ path: '/examine', component: examine },
			{ path: '/personal', component: personal },
		],
	},
];

const router = new VueRouter({
	mode: 'hash',
	routes,
});
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
		return;
	} else if (to.path === '/examine') {
		let type = sessionStorage.getItem('type');
		let id = sessionStorage.getItem('id');
		if (type == '1' && id) {
			next();
			return;
		} else if (type == '0' && id) {
			alert('需要教师登录');
			sessionStorage.clear();
			next('/login');
			return;
		} else {
			alert('请先登录');
			next('/login');
			return;
		}
	} else if (to.path === '/personal') {
		let type = sessionStorage.getItem('type');
		let id = sessionStorage.getItem('id');
		if (type == '0' && id) {
			next();
			return;
		} else if (type == '1' && id) {
			alert('需要学生登录');
			sessionStorage.clear();
			next('/login');
			return;
		} else {
			alert('请先登录');
			next('/login');
			return;
		}
	}
	next();
});
export default router;
