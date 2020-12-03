export default {
	'post|/api/teacherstudio/teacher_studio/getApplyList': () => {
		return {
			code: 1,
			msg: '',
			data: [
				{
					studio_scode: 10001,
					studio_name: '信息化工作室',
					data: [
						{ record_id: 1, user_id: 1927309133, user_name: '学生姓名', sexuality: '男', major_name: '专业名称', grade: 2019, introduce: '我是某某某', type: 0 },
						{ record_id: 2, user_id: 1927309134, user_name: '学生姓名2', sexuality: '女', major_name: '专业名称', grade: 2019, introduce: '', type: 0 },
						{ record_id: 3, user_id: 1501, user_name: '教师姓名1', type: 1 },
					],
				},
				{
					studio_scode: 10002,
					studio_name: '大数据工作室',
					data: [
						{ record_id: 4, user_id: 1927309133, user_name: '王雷', sexuality: '男', major_name: '专业名称', grade: 2019, introduce: '学生自荐', type: 0 },
						{ record_id: 5, user_id: 1927309134, user_name: '朱振义', sexuality: '女', major_name: '专业名称', grade: 2019, introduce: '学生自荐', type: 0 },
						{ record_id: 6, user_id: 1501, user_name: '教师姓名1', type: 1 },
					],
				},
			],
		};
	},
};
