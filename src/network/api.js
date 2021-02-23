import axios from "axios";

import AES from "@/utils/AES.js";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
	config => {
		if (sessionStorage.getItem("Authorization")) {
			config.headers.Token = sessionStorage.getItem("Authorization");
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.defaults.baseURL = "/api/teacherstudio";
//获取工作室列表
export const getStudios = () => {
	return axios.request({
		// url: '/api/getstudio.php',
		url: "/studio", //假数据
		method: "get",
	});
};
// 获取某个工作室
export const getStudioDetail = id => {
	let params = new URLSearchParams();
	params.append("scode", id);
	return axios.request({
		url: "/studio",
		method: "get",
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
	params.append("id", id);
	params.append("name", enName);
	params.append("idcard", enIdcard);
	return axios.request({
		url: "/user/student_login",
		method: "post",
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
	params.append("id", id);
	params.append("name", enName);
	params.append("idcard", enIdcard);
	return axios.request({
		url: "/user/teacher_login",
		method: "post",
		data: params,
	});
};
// 工作室报名提交
export const signUp = (user_id, studio_id, type, introduce, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id); //修改   学生学号/教师工号  原：student_id
	params.append("type", type); //新增   类型，0学生，1老师
	params.append("studio_id", studio_id);
	params.append("introduce", introduce);
	params.append("token", token);
	return axios.request({
		url: "/apply_studio/sign_up",
		method: "post",
		data: params,
	});
};

//学生查看申请信息
export const getApply = (user_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id); ///修改   学生学号/教师工号  原：student_id
	params.append("token", token);
	return axios.request({
		url: "/apply_studio/getApply",
		method: "post",
		data: params,
	});
};
// 学生取消报名/退出工作室
export const signOut = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id); //修改 学生学号/教师工号   原：student_id
	params.append("record_id", record_id);
	params.append("token", token);
	return axios.request({
		url: "/apply_studio/sign_out",
		method: "post",
		data: params,
	});
};

//用户查看已加入的工作室
export const stuGetStudio = (user_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id); //修改 学生学号/教师工号   原：student_id
	params.append("token", token);
	return axios.request({
		url: "/user_studio/getStudio",
		method: "post",
		data: params,
	});
};

//  10-29新增
//  用户退出工作室
export const quit = (user_id, studio_scode, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("studio_scode", studio_scode);
	params.append("token", token);
	return axios.request({
		url: "/user_studio/quit",
		method: "post",
		data: params,
	});
};
//  10-29新增
//  教师获取工作室审批表
export const getApplyList = (user_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/getApplyList",
		method: "post",
		data: params,
	});
};
//  10-29新增
//  教师获取工作室成员列表
export const getUserStudioList = (user_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/getUserStudioList",
		method: "post",
		data: params,
	});
};
//  10-29新增
//  教师审批通过
export const pass = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("record_id", record_id);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/pass",
		method: "post",
		data: params,
	});
};
//  10-29新增
//  教师审批拒绝
export const refuse = (user_id, record_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("record_id", record_id);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/refuse",
		method: "post",
		data: params,
	});
};
//  10-29新增
//  教师一键拒绝所有未审批用户
export const refuseAll = (user_id, studio_scode, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("studio_scode", studio_scode);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/refuseAll",
		method: "post",
		data: params,
	});
};
// 12-9新增
//负责人移除用户
export const kick = (user_id, code, studio_scode) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("code", code);
	params.append("studio_scode", studio_scode);
	return axios.request({
		url: "/teacher_studio/kick",
		method: "post",
		data: params,
	});
};

// 12-22新增
// 工作室信息提示
export const getStudioMessage = (user_id, token) => {
	let params = new URLSearchParams();
	params.append("user_id", user_id);
	params.append("token", token);
	return axios.request({
		url: "/teacher_studio/getStudioMessage",
		method: "post",
		data: params,
	});
};

// 12-28新增  JSON格式
// 教师提交工作室注册申请表
export const studioSubmit = obj => {
	return axios.request({
		url: "/studio_register/submit",
		method: "post",
		data: obj,
	});
};
// 12-28新增  JSON格式
// 教师查看提交的工作室申请表详情
export const teacherGetRegisterLister = obj => {
	return axios.request({
		url: "/studio_register/get_list",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人撤销工作室申请表
export const teacherRsegisterCancel = obj => {
	return axios.request({
		url: "/studio_register/cancel",
		method: "post",
		data: obj,
	});
};
// 12-28新增  JSON格式
// 教师查看提交的工作室申请表详情
export const teacherGetRsegisterLook = obj => {
	return axios.request({
		url: "/studio_register/get_table",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人提交工作室课程置换方案申请表
export const courseReplaceSchemeApplySubmit = obj => {
	return axios.request({
		url: "/course_replace_scheme_apply/submit",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人查看提交的工作室课程置换方案申请表
export const courseSchemeGetList = obj => {
	return axios.request({
		url: "/course_replace_scheme_apply/get_list",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人查看提交的工作室课程置换方案申请表详情
export const courseSchemeGetTable = obj => {
	return axios.request({
		url: "/course_replace_scheme_apply/get_table",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人撤销工作室课程置换方案申请表
export const courseSchemeCancel = obj => {
	return axios.request({
		url: "/course_replace_scheme_apply/cancel",
		method: "post",
		data: obj,
	});
};
// 12-28新增  JSON格式
// 负责人提交工作室学分置换方案申请表
export const creditSchemeSubmit = obj => {
	return axios.request({
		url: "/credit_replace_scheme_apply/submit",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人查看提交的工作室学分置换方案申请表
export const creditSchemeGetList = obj => {
	return axios.request({
		url: "/credit_replace_scheme_apply/get_list",
		method: "post",
		data: obj,
	});
};

// 12-28新增  JSON格式
// 负责人查看提交的工作室学分置换方案申请表详情
export const creditSchemeGetTable = obj => {
	return axios.request({
		url: "/credit_replace_scheme_apply/get_table",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人撤销工作室学分置换方案申请表
export const creditSchemeCancel = obj => {
	return axios.request({
		url: "/credit_replace_scheme_apply/cancel",
		method: "post",
		data: obj,
	});
};

// 12-29新增  JSON格式
// 获取工作室承担实习毕业论文（设计）方案申请表所有承担内容类型
export const practiceSchemeGetTypeList = () => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/get_type_list",
		method: "get",
	});
};

// 12-29新增  JSON格式
// 获取学校单位列表
export const partyUnitGetList = () => {
	return axios.request({
		url: "/party_unit/get_list",
		method: "get",
	});
};
// 12-29新增  JSON格式
// 获取教师类型列表
export const teacher_type = () => {
	return axios.request({
		url: "/teacher_type/get_list",
		method: "get",
	});
};

// 12-29新增  JSON格式
// 负责人提交工作室承担实习毕业论文（设计）方案申请表
export const practiceSchemeGetSubmit = obj => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/submit",
		method: "post",
		data: obj,
	});
};

// 12-29新增  JSON格式
// 负责人查看提交的工作室承担实习毕业论文（设计）方案申请表列表
export const practiceSchemeGetList = obj => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/get_list",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看工作室承担实习毕业论文（设计）方案申请表详情
export const practiceSchemeGetTable = obj => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/get_table",
		method: "post",
		data: obj,
	});
};

// 12-29新增  JSON格式
// 负责人撤销工作室承担实习毕业论文（设计）方案申请表
export const practiceSchemeCancel = obj => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/cancel",
		method: "post",
		data: obj,
	});
};

// 12-29新增  JSON格式
// 负责人撤销工作室承担实习毕业论文（设计）方案申请表
export const courseReplaceApplySubmit = obj => {
	return axios.request({
		url: "/course_replace_apply/submit",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看提交的课程置换列表
export const courseReplaceApplyGetList = obj => {
	return axios.request({
		url: "/course_replace_apply/get_list",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看课程置换申请表详情
export const courseReplaceApplyGetTable = obj => {
	return axios.request({
		url: "/course_replace_apply/get_table",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人撤销课程置换申请表
export const courseReplaceApplyCancel = obj => {
	return axios.request({
		url: "/course_replace_apply/cancel",
		method: "post",
		data: obj,
	});
};

// 12-29新增  JSON格式
// 负责人提交工作室学分置换申请表
export const creditReplaceApplySubmit = obj => {
	return axios.request({
		url: "/credit_replace_apply/submit",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人提交工作室学分置换申请表
export const creditReplaceApplyGetList = obj => {
	return axios.request({
		url: "/credit_replace_apply/get_list",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看工作室学分置换申请表详情
export const creditReplaceApplyGetTable = obj => {
	return axios.request({
		url: "/credit_replace_apply/get_table",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人撤销工作室学分置换申请表
export const creditReplaceApplyCancel = obj => {
	return axios.request({
		url: "/credit_replace_apply/cancel",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人提交工作室承担实习申请表
export const assumePracticeApplySubmit = obj => {
	return axios.request({
		url: "/assume_practice_apply/submit",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人提交工作室承担实习申请表
export const assumePracticeApplyGetList = obj => {
	return axios.request({
		url: "/assume_practice_apply/get_list",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看工作室承担实习申请表详情
export const assumePracticeApplyTable = obj => {
	return axios.request({
		url: "/assume_practice_apply/get_table",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人撤销工作室承担实习申请表
export const assumePracticeApplyCancel = obj => {
	return axios.request({
		url: "/assume_practice_apply/cancel",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人提交工作室承担毕业论文（设计）申请表
export const assumeThesisApplySubmit = obj => {
	return axios.request({
		url: "/assume_thesis_apply/submit",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看提交的工作室承担毕业论文（设计）申请表
export const assumeThesisApplyGetList = obj => {
	return axios.request({
		url: "/assume_thesis_apply/get_list",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人查看工作室承担毕业论文（设计）申请详情表
export const assumeThesisApplyGetTable = obj => {
	return axios.request({
		url: "/assume_thesis_apply/get_table",
		method: "post",
		data: obj,
	});
};
// 12-29新增  JSON格式
// 负责人撤销工作室承担毕业论文（设计）申请表
export const assumeThesisApplyCancel = obj => {
	return axios.request({
		url: "/assume_thesis_apply/cancel",
		method: "post",
		data: obj,
	});
};

// 1-1
// 获取工作室学分置换方案申请表置换编号列表
export const getCreditProjectCode = obj => {
	return axios.request({
		url: "/credit_replace_scheme_apply/get_project_code",
		method: "post",
		data: obj,
	});
};
// 1-1
// 获取工作室承担实习毕业论文（设计）方案申请表置换编号列表
export const getPracticeProjectCode = obj => {
	return axios.request({
		url: "/practice_thesis_scheme_apply/get_project_code",
		method: "post",
		data: obj,
	});
};
// 1-1
// 获取工作室学分置换方案申请表置换编号列表
export const getCourseProjectCode = obj => {
	return axios.request({
		url: "/course_replace_scheme_apply/get_project_code",
		method: "post",
		data: obj,
	});
};
// 1-1
// 获取工作室类型
export const getStudioTypeList = obj => {
	return axios.request({
		url: "/type_studio/get_list",
		method: "get",
		params: obj,
	});
};
