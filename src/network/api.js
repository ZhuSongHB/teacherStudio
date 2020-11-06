import axios from 'axios';

import AES from '@/utils/AES.js';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
	config => {
		if (sessionStorage.getItem('Authorization')) {
			config.headers.Token = sessionStorage.getItem('Authorization');
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.defaults.baseURL = '/api/teacherstudio';
//获取工作室列表
export const getStudios = () => {
	return axios.request({
		// url: '/api/getstudio.php',
		url: '/studio', //假数据
		method: 'get',
	});
};
// 获取某个工作室
export const getStudioDetail = id => {
	let params = new URLSearchParams();
	params.append('scode', id);
	return axios.request({
		url: '/studio',
		method: 'get',
		params: params,
	});
};
// 认证登录   √
// 学生认证登录
export const studentLogin = obj => {
	// 真数据使用
	let id = obj.id;
	let name = obj.name;
	let idcard = obj.idcard;
	let params = new URLSearchParams();
	//加密  en开头为加密
	const enName = AES.encrypt(name);
	const enIdcard = AES.encrypt(idcard);
	//解密
	// var decrypt = AES.decrypt('Qc6zN36iRx3s6KhUVLfbrg==');
	params.append('id', id);
	params.append('name', enName);
	params.append('idcard', enIdcard);
	return axios.request({
		url: '/user/student_login',
		method: 'post',
		data: params,
	});
};
// 教师认证登录
export const teacherLogin = obj => {
	// 真数据使用
	let id = obj.id;
	let name = obj.name;
	let idcard = obj.idcard;
	let params = new URLSearchParams();
	//加密  en开头为加密
	const enName = AES.encrypt(name);
	const enIdcard = AES.encrypt(idcard);
	//解密
	// var decrypt = AES.decrypt('Qc6zN36iRx3s6KhUVLfbrg==');
	params.append('id', id);
	params.append('name', enName);
	params.append('idcard', enIdcard);
	return axios.request({
		url: '/user/teacher_login',
		method: 'post',
		data: params,
	});
};
// 工作室报名提交
export const signUp = (user_id, studio_id, type, introduce, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id); //修改   学生学号/教师工号  原：student_id
	params.append('type', type); //新增   类型，0学生，1老师
	params.append('studio_id', studio_id);
	params.append('introduce', introduce);
	params.append('token', token);
	return axios.request({
		url: '/apply_studio/sign_up',
		method: 'post',
		data: params,
	});
};

//学生查看申请信息
export const getApply = (user_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id); ///修改   学生学号/教师工号  原：student_id
	params.append('token', token);
	return axios.request({
		url: '/apply_studio/getApply',
		method: 'post',
		data: params,
	});
};
// 学生取消报名/退出工作室
export const signOut = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id); //修改 学生学号/教师工号   原：student_id
	params.append('record_id', record_id);
	params.append('token', token);
	return axios.request({
		url: '/apply_studio/sign_out',
		method: 'post',
		data: params,
	});
};

//用户查看已加入的工作室
export const stuGetStudio = (user_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id); //修改 学生学号/教师工号   原：student_id
	params.append('token', token);
	return axios.request({
		url: '/user_studio/getStudio',
		method: 'post',
		data: params,
	});
};

//  10-29新增
//  用户退出工作室
export const quit = (user_id, studio_scode, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('studio_scode', studio_scode);
	params.append('token', token);
	return axios.request({
		url: '/user_studio/quit',
		method: 'post',
		data: params,
	});
};
//  10-29新增
//  教师获取工作室审批表
export const getApplyList = (user_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('token', token);
	return axios.request({
		url: '/teacher_studio/getApplyList',
		method: 'post',
		data: params,
	});
};
//  10-29新增
//  教师获取工作室成员列表
export const getUserStudioList = (user_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('token', token);
	return axios.request({
		url: '/teacher_studio/getUserStudioList',
		method: 'post',
		data: params,
	});
};
//  10-29新增
//  教师审批通过
export const pass = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('record_id', record_id);
	params.append('token', token);
	return axios.request({
		url: '/teacher_studio/pass',
		method: 'post',
		data: params,
	});
};
//  10-29新增
//  教师审批拒绝
export const refuse = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('record_id', record_id);
	params.append('token', token);
	return axios.request({
		url: '/teacher_studio/refuse',
		method: 'post',
		data: params,
	});
};
//  10-29新增
//  教师一键拒绝所有未审批用户
export const refuseAll = (user_id, studio_scode, token) => {
	let params = new URLSearchParams();
	params.append('user_id', user_id);
	params.append('studio_scode', studio_scode);
	params.append('token', token);
	return axios.request({
		url: '/teacher_studio/refuseAll',
		method: 'post',
		data: params,
	});
};
