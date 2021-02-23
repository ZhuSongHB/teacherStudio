import Vue from "vue";
import VueRouter from "vue-router";
// const Login = () => import('views/login/Login');
const Home = () => import(/* webpackChunkName: "home" */ "views/home/Home");
const Studio = () => import(/* webpackChunkName: "Studio" */ "views/studio/Studio");
const StudioDetail = () => import(/* webpackChunkName: "StudioDetail" */ "views/studioDetail/StudioDetail");
const Index = () => import(/* webpackChunkName: "Index" */ "views/index/Index");
const Notice = () => import(/* webpackChunkName: "Notice" */ "views/notice/Notice");
const NoticeDetail = () => import(/* webpackChunkName: "NoticeDetail" */ "views/notice/NoticeDetail");
const login = () => import(/* webpackChunkName: "login" */ "views/login/index");
const examine = () => import(/* webpackChunkName: "examine" */ "views/examine/index");
const personal = () => import(/* webpackChunkName: "personal" */ "views/personal/personal");
const result = () => import(/* webpackChunkName: "result" */ "views/result/index");
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	// {
	// 	path: '/login',
	// 	component: Login,
	// },
	{
		path: "/home",
		component: Home,
		redirect: "/studio",
		children: [
			{
				path: "/index",
				component: Index,
			},
			{
				path: "/studio",
				component: Studio,
			},
			{
				path: "/studioDetail/:id",
				component: StudioDetail,
			},
			{
				path: "/notice",
				component: Notice,
			},
			{
				path: "/noticeDetail/:id",
				component: NoticeDetail,
			},
			{
				path: "/login",
				component: login,
				// children: [{ path: '', component: component }],
			},
			{ path: "/examine", component: examine },
			{ path: "/personal", component: personal },
			{ path: "/result", component: result },
		],
	},
];

const router = new VueRouter({
	mode: "hash",
	routes,
});
router.beforeEach((to, from, next) => {
	if (to.path === "/login") {
		next();
		return;
	} else if (to.path === "/examine") {
		let type = sessionStorage.getItem("type");
		let id = sessionStorage.getItem("id");
		if (type == "1" && id) {
			next();
			return;
		} else if (type == "0" && id) {
			alert("需要教师登录");
			sessionStorage.clear();
			next("/login");
			return;
		} else {
			alert("请先登录");
			next("/login");
			return;
		}
	} else if (to.path === "/personal") {
		let type = sessionStorage.getItem("type");
		let id = sessionStorage.getItem("id");
		if (type == "0" && id) {
			next();
			return;
		} else if (type == "1" && id) {
			alert("需要学生登录");
			sessionStorage.clear();
			next("/login");
			return;
		} else {
			alert("请先登录");
			next("/login");
			return;
		}
	}
	next();
});
export default router;
